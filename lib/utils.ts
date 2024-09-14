import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { VariantItem } from "@/lib/types/product";
import { Component } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(price);
};

export const reduceProductVariants = (
  acc: Record<string, Record<string, any>>,
  item: VariantItem,
) => {
  Object.keys(item.data).map((key) => {
    acc[key] = acc[key] || {};
    const value = String(item.data[key]);
    !acc[key]?.[value] && (acc[key][value] = []);
    acc[key][value].push(item);
  });
  return acc;
};

export const getMinimumPrice = (variants: VariantItem[]) => {
  return variants?.sort((a, b) => a.price - b.price)?.[0]?.price || 0;
};

export const getProductDetails = (
  variant: VariantItem | null,
  componentIds: Set<string>,
  components: Component[],
): string => {
  let description: string = "";
  if (!!variant?.data) {
    description = Object.keys(variant.data)
      .reduce((text, key) => {
        text.push(`${key}: ${variant.data[key]}`);
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
};
