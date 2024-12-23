import { NextRequest, NextResponse } from "next/server";
import { CART_COOKIE_KEY } from "@/lib/constants";
import { db } from "@/db";
import { CartState, ProductItemState } from "@/lib/types/cart";
import { cartAction, getCart } from "@/actions/cartAction";
import {
  CartIdRequestSchema,
  CartRequestSchema,
  CartUpdateRequestSchema,
} from "@/lib/validations/cart";
import { initialState } from "@/lib/redux/slices/cartSlicer";
import { areArraysEqual } from "@/lib/utils";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";

const GET = async () => {
  try {
    const id = cookies().get(CART_COOKIE_KEY)?.value;
    const { userId } = auth();
    if (!id) {
      throw new Error("Something was wrong! Please try again");
    }
    const cart = await db.cart.findUnique({
      where: {
        id,
      },
      include: {
        cartItems: {
          orderBy: {
            createdAt: "desc",
          },
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
        shippingAddress: true,
      },
    });
    if (!cart || (!userId && !!cart?.userId)) {
      cookies().delete(CART_COOKIE_KEY);
      throw new Error("We can't find cart");
    }
    return NextResponse.json<CartState>(cart as CartState);
  } catch (e: any) {
    console.log("[ERROR]: getCart ", e);
  }
  return NextResponse.json(initialState);
};

const POST = async (req: NextRequest) => {
  const cart = await getCart();
  const cartRequest = CartRequestSchema.parse(await req.json());
  let productItem: ProductItemState | null;
  let productItems = (await db.productItem.findMany({
    where: {
      variantId: cartRequest.variantId,
    },
    include: {
      cartItems: true,
      variant: {
        include: {
          product: true,
        },
      },
      components: true,
    },
  })) as ProductItemState[];
  if (productItems.length === 0) {
    productItem = (await db.productItem.create({
      data: {
        variantId: cartRequest.variantId,
        components: {
          connect: (cartRequest.componentIds || []).map(
            (componentId: string) => ({
              id: componentId,
            }),
          ),
        },
        data: {},
      },
      include: {
        cartItems: true,
        variant: {
          include: {
            product: true,
          },
        },
        components: true,
      },
    })) as ProductItemState;
  } else {
    productItem =
      productItems.find((item) => {
        if (
          item.components.length !== (cartRequest.componentIds?.length || 0)
        ) {
          return false;
        }
        return areArraysEqual(
          item.components.map((component) => component.id),
          cartRequest.componentIds || [],
        );
      }) || null;
    if (!productItem) {
      productItem = (await db.productItem.create({
        data: {
          variantId: cartRequest.variantId,
          components: {
            connect: (cartRequest.componentIds || []).map(
              (componentId: string) => ({
                id: componentId,
              }),
            ),
          },
          data: {},
        },
        include: {
          cartItems: true,
          variant: {
            include: {
              product: true,
            },
          },
          components: true,
        },
      })) as ProductItemState;
    }
  }
  if (!productItem) {
    throw new Error("We can't create necessary ProductItem");
  }
  const cartItem = productItem.cartItems.find(
    (item) => item.cartId === cart.id,
  );
  if (!cartItem) {
    await db.cartItem.create({
      data: {
        cartId: cart.id,
        name: productItem.variant.product.name,
        productItemId: productItem.id,
        qty: cartRequest.qty,
        totalAmount: Number(cartRequest.amount.toFixed(2)),
      },
    });
  } else {
    await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        qty: cartItem.qty + cartRequest.qty,
      },
    });
  }
  await cartAction(cart);
  return NextResponse.json({ success: true });
};

const PUT = async (req: NextRequest) => {
  const cart = await getCart();
  const cartItemDetails = CartUpdateRequestSchema.parse(await req.json());
  const qty = Number(cartItemDetails.qty);
  if (!cartItemDetails.id || !qty) {
    throw new Error("Cart Item id and qty is requite fields!");
  }
  const cartItem = await db.cartItem.findUnique({
    where: {
      id: cartItemDetails.id,
    },
  });
  if (!cartItem) {
    throw new Error("We can't find Cart Item");
  }
  await db.cartItem.update({
    where: { id: cartItemDetails.id },
    data: { qty: qty > 0 ? qty : 1 },
  });
  await cartAction(cart);
  return NextResponse.json({
    success: true,
  });
};

const DELETE = async (req: NextRequest) => {
  const cart = await getCart();
  const cartItemDetails = CartIdRequestSchema.parse(await req.json());
  if (!cartItemDetails.id) {
    throw new Error("Cart Item id and qty is requite fields!");
  }
  const cartItem = await db.cartItem.findUnique({
    where: {
      id: cartItemDetails.id,
    },
  });
  if (!cartItem) {
    throw new Error("We can't find Cart Item");
  }
  await db.cartItem.delete({
    where: { id: cartItemDetails.id },
  });
  const productItem = await db.productItem.findUnique({
    where: {
      id: cartItem.productItemId,
    },
    include: {
      cartItems: true,
    },
  });
  if (!!productItem && productItem.cartItems.length === 0) {
    await db.productItem.delete({
      where: {
        id: cartItem.productItemId,
      },
    });
  }
  await cartAction(cart);
  return NextResponse.json({
    success: true,
  });
};

export { GET, POST, PUT, DELETE };
