import { Cart, CartItem, Component, ProductItem } from "@prisma/client";
import { VariantItem } from "@/lib/types/product";
export type CartState = Cart & {
  cartItems: CartItemState[];
};

export type CartItemState = {
  productItem: ProductItemState;
} & CartItem;
export type ProductItemState = {
  variant: VariantItem;
  components: Component[];
} & ProductItem;
