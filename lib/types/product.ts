import { Category, Component, Product, Variant } from "@prisma/client";

export type ProductItemType = {
  id: string;
  name: string;
  variants?: ProductVariantItem[];
  image?: string;
  price: number;
};
export type ProductVariantItem = {
  price: number;
  id: string;
};

export type CategoryParent = {
  products: CategoryProductParent[];
} & Category;

export type CategoryProductParent = {
  variants: Variant[];
  components: Component[];
} & Product;
