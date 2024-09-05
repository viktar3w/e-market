"use client";
import { VariantItem } from "@/lib/types/product";
import { Component } from "@prisma/client";
import { useMemo } from "react";

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
    let description: string = "";
    if (!!activeVariant?.data) {
      description = Object.keys(activeVariant.data)
        .reduce((text, key) => {
          text.push(`${key}: ${activeVariant.data[key]}`);
          return text;
        }, [] as string[])
        .join(",\n");
    }
    if (componentIds.size > 0) {
      description += description === "" ? "" : ". ";
      description +=
        "Components: \n" +
        Array.from(componentIds)
          .reduce((text, id) => {
            const component = components.find((c) => c.id === id);
            if (!component) {
              return text;
            }
            text.push(component.name);
            return text;
          }, [] as string[])
          .join(", ");
    }
    return description;
  }, [activeVariant?.data, componentIds, components]);
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
