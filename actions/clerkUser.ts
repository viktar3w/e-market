import { db } from "@/db";
import { UserJSON } from "@clerk/backend";
import { CartStatus, UserType } from "@prisma/client";
import { cookies } from "next/headers";
import { CART_COOKIE_KEY } from "@/lib/constants";
import { areArraysEqual } from "@/lib/utils";
import { CartState } from "@/lib/types/cart";
import { cartAction } from "@/actions/cartAction";

export const userCreateWebhook = async (userData: UserJSON) => {
  return db.user.create({
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
};

export const userDeleteWebhook = async (userId: string) => {
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
    await db.cart.updateMany({
      where: {
        userId: userId,
      },
      data: {
        status: CartStatus.NOT_ACTIVE,
      },
    });
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
                  variant: true,
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
    const cartItems = cart?.cartItems || [];
    if (cartItems.length > 0) {
      const disableCartIds: string[] = [];
      const addingCartItems: { id: string }[] = [];
      for (const userCart of user?.carts || []) {
        for (const userCartItem of userCart?.cartItems || []) {
          const oldCartItem = cartItems.find((cartItem) => {
            const userItemComponents =
              userCartItem.productItem?.components ?? [];
            const cartItemComponents = cartItem.productItem?.components ?? [];
            return (
              cartItem.productItem.variantId ===
                userCartItem.productItem.variantId &&
              areArraysEqual(
                userItemComponents.map((c) => c.id),
                cartItemComponents.map((c) => c.id),
              )
            );
          });
          if (!oldCartItem) {
            addingCartItems.push({ id: userCartItem.id });
          }
        }
        disableCartIds.push(userCart.id);
      }
      if (addingCartItems.length > 0) {
        addingCartItems.concat(cart.cartItems.map((item) => ({ id: item.id })));
        const data = {
          userId: user.id,
          cartItems: {
            connect: addingCartItems,
          },
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
        };
        await db.cart.update({
          where: {
            id: cart.id,
          },
          data,
        });
      } else {
        await db.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            userId: user.id,
          },
        });
      }
      if (disableCartIds.length > 0) {
        await db.cart.updateMany({
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
      await cartAction(cart);
    } else if (user.carts.length > 0) {
      cookies().delete(CART_COOKIE_KEY);
      cookies().set(CART_COOKIE_KEY, user.carts.find((cart) => !!cart.id)!.id, {
        path: "/",
        httpOnly: true,
      });
      await db.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          status: CartStatus.NOT_ACTIVE,
        },
      });
      await cartAction(cart);
    } else {
      db.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          userId: user.id,
        },
      });
    }
  }
};

export const deleteCartIdWebhook = () => {
  cookies().delete(CART_COOKIE_KEY);
};
