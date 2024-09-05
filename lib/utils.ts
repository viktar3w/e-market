import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { VariantItem } from "@/lib/types/product";

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
