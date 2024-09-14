"use client";
import { VariantItem } from "@/lib/types/product";
import { Component } from "@prisma/client";
import { useMemo } from "react";
import { getProductDetails } from "@/lib/utils";

const useCalculateProduct = (
  activeVariant: VariantItem | null,
  componentIds: Set<string>,
  components: Component[],
) => {
  const price = useMemo<number>(() => {
    if (!activeVariant?.price) {
      return 0;
    }
    return (
      activeVariant.price +
      Array.from(componentIds).reduce((sum, id) => {
        const component = components.find((component) => id === component.id);
        return !component ? sum : component.price + sum;
      }, 0)
    );
  }, [activeVariant, componentIds, components]);
  const description = useMemo(() => {
    return getProductDetails(activeVariant, componentIds, components);
  }, [activeVariant, componentIds, components]);
  const addProduct = () => {
    console.log(1111, componentIds);
    console.log(2222, activeVariant);
  };
  return {
    price,
    description,
    addProduct,
  };
};

export default useCalculateProduct;
