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
  const [activeTab, setActiveTab] = useState<"filters" | "price" | "types">(
    "filters",
  );
  const { push } = useRouter();
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>(
    !searchParams.get("available")
      ? undefined
      : searchParams.get("available")?.toLowerCase() === "true",
  );
  const [isNew, setIsNew] = useState<boolean | undefined>(
    !searchParams.get("new")
      ? undefined
      : searchParams.get("new")?.toLowerCase() === "true",
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
    const filters: {
      available?: boolean;
      new?: boolean;
      components?: string[];
      minPrice?: number;
      maxPrice?: number;
    } = {};
    if (isAvailable !== undefined) {
      filters.available = isAvailable;
    }
    if (isNew !== undefined) {
      filters.new = isNew;
    }
    if (Array.from(selectedIds).length > 0) {
      filters.components = Array.from(selectedIds);
    }
    if (minPrice !== MIN_PRICE) {
      filters.minPrice = minPrice;
    }
    if (maxPrice !== MAX_PRICE) {
      filters.maxPrice = maxPrice;
    }
    return filters;
  }, [isAvailable, isNew, selectedIds, maxPrice, minPrice]);
  useEffect(() => {
    const query = qs.stringify(filters, {
      arrayFormat: "comma",
      charset: "utf-8",
      allowEmptyArrays: false,
    });
    if (!!query) {
      push &&
        push(`?${query}`, {
          scroll: false,
        });
    }
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
    activeTab,
    setActiveTab,
  };
};
