import { db } from "@/db";
import { UserJSON } from "@clerk/backend";
import { CartStatus, UserType } from "@prisma/client";
import { cookies } from "next/headers";
import { CART_COOKIE_KEY } from "@/lib/constants";
import { areArraysEqual } from "@/lib/utils";
import { CartState } from "@/lib/types/cart";

export const userCreateWebhook = async (
  userData: UserJSON,
  cartId?: string,
) => {
  const user = await db.user.create({
    data: {
      id: userData.id,
      firstname: userData.first_name || "User",
      lastname: userData.last_name || "e-Market",
      email: userData.email_addresses[0]?.email_address,
      verified: !!userData.email_addresses[0]?.verification?.id
        ? new Date().toLocaleString()
        : null,
      phone: userData?.phone_numbers[0]?.phone_number,
      image: (userData.has_image && userData.image_url) || undefined,
    },
  });
  if (!!cartId) {
    await db.cart.update({
      where: {
        id: cartId,
      },
      data: {
        userId: user.id,
      },
    });
  }
  return user;
};

export const userDeleteWebhook = async (
  userId: string,
  cartUserId?: string,
) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!!user) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        status: UserType.DISABLED,
      },
    });
    await db.cart.update({
      where: {
        userId: userId,
      },
      data: {
        status: CartStatus.NOT_ACTIVE,
      },
    });
    if (cartUserId === userId) {
      cookies().delete(CART_COOKIE_KEY);
    }
  }
};

export const sessionCreateWebhook = async (
  userId: string,
  cart?: CartState,
) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      carts: {
        where: {
          status: CartStatus.ACTIVE,
        },
        include: {
          cartItems: {
            include: {
              productItem: {
                include: {
                  variant: {
                    include: {
                      product: true,
                    },
                  },
                  components: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!!cart && !!user && cart?.userId !== user.id) {
    if (cart.cartItems.length > 0) {
      const disableCartIds: string[] = [];
      for (const userCart of user?.carts || []) {
        for (const userCartItem of userCart?.cartItems || []) {
          const oldCartItem = cart.cartItems.find(
            (cartItem) =>
              cartItem.productItem.variantId ===
                userCartItem.productItem.variantId &&
              areArraysEqual(
                cartItem.productItem.components.map((c) => c.id),
                userCartItem.productItem.components.map((c) => c.id),
              ),
          );
          if (!oldCartItem) {
            db.cartItem.create({
              data: {
                cartId: cart.id,
                name: userCartItem.name,
                productItemId: userCartItem.productItemId,
                qty: userCartItem.qty,
                totalAmount: userCartItem.totalAmount,
              },
            });
          }
        }
        disableCartIds.push(userCart.id);
      }
      if (disableCartIds.length > 0) {
        db.cart.updateMany({
          where: {
            id: {
              in: disableCartIds,
            },
          },
          data: {
            status: CartStatus.NOT_ACTIVE,
          },
        });
      }
      db.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          userId: user.id,
        },
      });
    } else if (user.carts.length > 0) {
      cookies().delete(CART_COOKIE_KEY);
      cookies().set(CART_COOKIE_KEY, user.carts.find((cart) => !!cart.id)!.id, {
        path: "/",
        httpOnly: true,
      });
    }
  }
};

export const deleteCartIdWebhook = () => {
  cookies().delete(CART_COOKIE_KEY);
}