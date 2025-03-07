import {
  Cart,
  CartItem,
  Component,
  Product,
  ProductItem,
  ShippingAddress,
  User
} from "@prisma/client";
import { VariantItem } from "@/lib/types/product";
export type CartState = Cart & {
  cartItems: CartItemState[];
  shippingAddress?: ShippingAddress | null;
  user?: User
};

export type CartItemState = {
  productItem: ProductItemState;
} & CartItem;
export type ProductItemState = {
  cartItems: CartItemState[];
  variant: VariantItemState;
  components: Component[];
} & ProductItem;

export type VariantItemState = {
  product: ProductState;
} & VariantItem;

export type ProductState = Product;
