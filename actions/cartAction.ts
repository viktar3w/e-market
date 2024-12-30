import { cookies } from 'next/headers';

import { auth } from '@clerk/nextjs/server';
import { Cart, CartStatus } from '@prisma/client';

import { db } from '@/db';
import { CART_COOKIE_KEY } from '@/lib/constants';

export const cartAction = async (cart: Cart) => {
  const items = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
  });
  const data: { totalAmount: number; qty: number } = items.reduce(
    (result, item) => {
      result.qty += item.qty;
      result.totalAmount += Number((item.qty * item.totalAmount).toFixed(2));
      return result;
    },
    { totalAmount: 0, qty: 0 } as { totalAmount: number; qty: number },
  );
  return db.cart.update({
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
    throw new Error('Something was wrong! Please try again');
  }
  const cart = await db.cart.findUnique({
    where: { id, status: CartStatus.ACTIVE },
  });
  if (!cart) {
    cookies().delete(CART_COOKIE_KEY);
    throw new Error("We can't find cart");
  }
  const { userId } = auth();
  if ((!userId && !!cart?.userId) || (!!userId && !!cart?.userId && userId !== cart.userId)) {
    cookies().delete(CART_COOKIE_KEY);
    throw new Error('Customer was logout');
  }
  return cart;
};

export const getCartToken = async (userId?: string): Promise<string> => {
  try {
    let user;
    if (!!userId) {
      user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
    }
    const cart = await db.cart.create({
      data: {
        userId: user?.id,
      },
    });
    return cart.id;
  } catch (e: any) {
    console.log("[ERROR] can't create cart: ", e.message);
  }
  return '';
};
