"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useComponents } from "@/hooks/useComponents";
import { PriceProps } from "@/components/shared/filters/PriceFilter";
import { MAX_PRICE, MIN_PRICE } from "@/lib/constants";
import { useDebounce } from "@/hooks/useDebounce";
import qs from "qs";

export const useHomeFilters = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [isAvailable, setIsAvailable] = useState<boolean>(
    !!(
      searchParams.get("available") &&
      searchParams.get("available")?.toLowerCase() === "true"
    ),
  );
  const [isNew, setIsNew] = useState<boolean>(
    !!(
      searchParams.get("new") &&
      searchParams.get("new")?.toLowerCase() === "true"
    ),
  );
  const { components, loading, addId, selectedIds } = useComponents(
    searchParams.get("components")
      ? searchParams.get("components")?.split(",") || []
      : [],
  );
  const [price, setPrice] = useState<PriceProps>({
    maxPrice: Number(searchParams.get("maxPrice") || MAX_PRICE),
    minPrice: Number(searchParams.get("minPrice") || MIN_PRICE),
  });
  const maxPrice = useDebounce<number>(price.maxPrice, 300);
  const minPrice = useDebounce<number>(price.minPrice, 300);
  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const filters = useMemo(() => {
    return {
      available: isAvailable,
      new: isNew,
      components: Array.from(selectedIds),
      minPrice,
      maxPrice,
    };
  }, [isAvailable, isNew, selectedIds, maxPrice, minPrice]);
  useEffect(() => {
    const query = qs.stringify(filters, {
      arrayFormat: "comma",
    });
    push &&
      push(`?${query}`, {
        scroll: false,
      });
  }, [filters, push]);

  return {
    price,
    updatePrice,
    addId,
    loading,
    selectedIds,
    components,
    isNew,
    setIsNew,
    isAvailable,
    setIsAvailable,
  };
};
