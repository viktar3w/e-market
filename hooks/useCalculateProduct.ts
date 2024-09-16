"use client";
import { VariantItem } from "@/lib/types/product";
import { Component } from "@prisma/client";
import { useCallback, useEffect, useMemo } from "react";
import { getProductDetails } from "@/lib/utils";
import { useAddCartItemMutation } from "@/lib/redux/api/cart.api";
import { useToast } from "@/components/ui/use-toast";

const useCalculateProduct = (
  activeVariant: VariantItem | null,
  componentIds: Set<string>,
  components: Component[],
) => {
  const { toast } = useToast();
  const [addToCart, { isLoading, isError, isSuccess }] =
    useAddCartItemMutation();
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
  const addProduct = useCallback(() => {
    if (price === 0 || !activeVariant) {
      return;
    }
    addToCart?.({
      amount: price,
      variantId: activeVariant.id,
      componentIds: Array.from(componentIds),
      qty: 1,
    });
  }, [price, activeVariant, componentIds, addToCart]);
  useEffect(() => {
    if (isError) {
      toast?.({
        description: "We can't add product to cart",
        variant: "destructive",
      });
    }
  }, [isError, toast]);
  useEffect(() => {
    if (isSuccess) {
      toast?.({
        description: "Product was added to cart",
        variant: "success"
      });
    }
  }, [isSuccess, toast]);
  return {
    isLoading,
    price,
    description,
    addProduct,
  };
};

export default useCalculateProduct;
