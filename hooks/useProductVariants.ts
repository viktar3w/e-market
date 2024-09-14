"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_EMPTY_PRODUCT_IMAGE, GET_ID_KEY } from "@/lib/constants";
import { CategoryProductParent, VariantItem } from "@/lib/types/product";
import { reduceProductVariants } from "@/lib/utils";

export const useProductVariants = (product: CategoryProductParent) => {
  const {push} = useRouter()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [mainImage, setMainImage] = useState<string>(
    product?.image || DEFAULT_EMPTY_PRODUCT_IMAGE,
  );
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>(
    {},
  );
  const [groupedVariants, setGroupedVariants] = useState<
    Record<string, Record<string, VariantItem[]>>
  >({});
  const [activeVariant, setActiveVariant] = useState<VariantItem | null>(null);

  useEffect(() => {
    if (!activeVariant) {
      setMainImage(product?.image || DEFAULT_EMPTY_PRODUCT_IMAGE);
      return;
    }
    const id = searchParams.get(GET_ID_KEY);
    if (!id || id !== activeVariant.id) {
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set(GET_ID_KEY, activeVariant.id);
      push(`?${newSearchParams.toString()}`)
    }

    setMainImage(
      activeVariant?.image || product?.image || DEFAULT_EMPTY_PRODUCT_IMAGE,
    );
  }, [activeVariant, pathname, product?.image, push, searchParams]);

  useEffect(() => {
    if (product.variants.length === 0) {
      return;
    }
    if (product.variants.length === 1) {
      setActiveVariant(product.variants[0]);
      return;
    }
    const variants = product.variants.reduce(
      reduceProductVariants,
      {} as Record<string, Record<string, any>>,
    );
    const id = searchParams.get(GET_ID_KEY);
    if (!!id) {
      const activeVariant = product.variants.find((v) => v.id === id);
      if (!!activeVariant) {
        setSelectedOptions(() => {
          return Object.keys(activeVariant.data).reduce(
            (abject, key) => {
              abject[key] = activeVariant.data[key];
              return abject;
            },
            {} as Record<string, any>,
          );
        });
        setGroupedVariants(() => {
          const keys = Object.keys(activeVariant.data);
          return keys.reduce(
            (abject, key, currentIndex) => {
              if (currentIndex === 0) {
                abject[key] = variants[key];
              } else {
                const options =
                  abject[keys[currentIndex - 1]][
                    String(activeVariant.data[keys[currentIndex - 1]])
                  ];
                abject[key] = options.reduce(
                  (acc: Record<string, VariantItem[]>, item: VariantItem) => {
                    const value = String(item.data[key]);
                    !acc[value] && (acc[value] = []);
                    acc[value].push(item);
                    return acc;
                  },
                  {} as Record<string, VariantItem[]>,
                );
              }
              return abject;
            },
            {} as Record<string, Record<string, any>>,
          );
        });
        return;
      }
    }
    const groupedVariants = Object.keys(variants)
      .slice(0, 1)
      .reduce(
        (object, key, currentIndex) => {
          object[key] =
            currentIndex === 0 && !!variants[key] ? variants[key] : {};
          return object;
        },
        {} as Record<string, Record<string, any>>,
      );
    setGroupedVariants(groupedVariants);
  }, [searchParams, product.variants]);

  useEffect(() => {
    const selectedKeys = Object.keys(selectedOptions);
    const groupedKeys = Object.keys(groupedVariants);
    if (groupedKeys.length === 0) {
      return;
    }
    if (selectedKeys.length !== groupedKeys.length) {
      setActiveVariant(null);
      return;
    }
    const variants = selectedKeys.reduce(
      (_, key) => {
        return groupedVariants?.[key]?.[selectedOptions[key]];
      },
      {} as Record<string, Record<string, any>> | VariantItem[],
    );
    if (
      !Array.isArray(variants) ||
      variants.length !== 1 ||
      !variants?.[0]?.data
    ) {
      setActiveVariant(null);
      return;
    }
    const variantKeys = Object.keys(variants?.[0].data);
    if (variantKeys.length !== selectedKeys.length) {
      setActiveVariant(null);
      return;
    }
    setActiveVariant(
      variants.reduce(
        (_, variant) => {
          for (let key of selectedKeys) {
            if (selectedOptions[key] !== variant.data?.[key]) {
              return null;
            }
          }
          return variant;
        },
        null as null | VariantItem,
      ),
    );
  }, [selectedOptions, groupedVariants]);

  const handleSizeClick = useCallback(
    (key: string, value: any) => {
      if (!!selectedOptions[key] && selectedOptions[key] === value) {
        return;
      }
      const newVariants = groupedVariants[key][value].reduce(
        reduceProductVariants,
        {} as Record<string, Record<string, any>>,
      );
      setSelectedOptions((prev) => {
        if (!prev?.[key]) {
          return {
            ...prev,
            [key]: value,
          };
        }
        const keys = Object.keys(prev);
        const index = keys.indexOf(key);
        const selectedOption = keys.slice(0, index + 1).reduce(
          (acc, item) => {
            acc[item] = prev[item];
            return acc;
          },
          {} as Record<string, Record<string, any>>,
        );
        return {
          ...selectedOption,
          [key]: value,
        };
      });
      let activeKey: number | undefined;
      const variants: string[] = Object.keys(newVariants);
      for (let i = 0; i < variants.length; ++i) {
        if (variants[i] === key) {
          activeKey = i;
          break;
        }
      }
      if (activeKey === undefined) {
        return;
      }
      setGroupedVariants((prev) => {
        if (!variants?.[activeKey + 1]) {
          return prev;
        }
        return {
          ...prev,
          [variants[activeKey + 1]]: newVariants[variants[activeKey + 1]],
        };
      });
    },
    [groupedVariants, selectedOptions],
  );
  return {
    mainImage,
    activeVariant,
    selectedOptions,
    groupedVariants,
    handleSizeClick,
  };
};
