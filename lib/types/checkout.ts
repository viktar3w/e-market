import { CartState } from "@/lib/types/cart";
import { Order, ShippingAddress } from "@prisma/client";

export type PlaceOrderType = {
  url: string;
};
export type OrderState = {
  cart: CartState;
  shippingAddress: ShippingAddress;
} & Order;
