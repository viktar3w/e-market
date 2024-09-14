import { db } from "@/db";
import { Cart } from "@prisma/client";

export const cartAction = async (cart: Cart) => {
  const items = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
  });
  const data: { totalAmount: number; qty: number } = items.reduce(
    (result, item) => {
      result.qty = item.qty;
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

export const getCartToken = async (): Promise<string> => {
  try {
    const cart = await db.cart.create({
      data:{}
    })
    return cart.id
  } catch (e: any) {
    console.log(2222, e.message)
    console.log("[ERROR] can't create cart")
  }
  return ""
}
