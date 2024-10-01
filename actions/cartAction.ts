import { db } from "@/db";
import { Cart } from "@prisma/client";
import { CART_COOKIE_KEY } from "@/lib/constants";
import { cookies } from "next/headers";

export const cartAction = async (cart: Cart) => {
  const items = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
  });
  const data: { totalAmount: number; qty: number } = items.reduce(
    (result, item) => {
      result.qty += item.qty;
      result.totalAmount += item.qty * item.totalAmount;
      return result;
    },
    { totalAmount: 0, qty: 0 } as { totalAmount: number; qty: number },
  );
  await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      ...data,
    },
  });
};

export const getCart = async () => {
  const id = cookies().get(CART_COOKIE_KEY)?.value;
  if (!id) {
    throw new Error("Something was wrong! Please try again");
  }
  const cart = await db.cart.findUnique({
    where: { id },
  });
  if (!cart) {
    cookies().delete(CART_COOKIE_KEY);
    throw new Error("We can't find cart");
  }
  return cart;
};

export const getCartToken = async (): Promise<string> => {
  try {
    const cart = await db.cart.create({
      data: {},
    });
    return cart.id;
  } catch (e: any) {
    console.log("[ERROR] can't create cart: ", e.message);
  }
  return "";
};
