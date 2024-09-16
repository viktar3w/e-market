import { NextRequest, NextResponse } from "next/server";
import { CART_COOKIE_KEY } from "@/lib/constants";
import { db } from "@/db";
import { CartState } from "@/lib/types/cart";
import { cartAction } from "@/actions/cartAction";
import { CartRequest, CartRequestSchema } from "@/lib/validations/cart";

export const initialState = {
  totalAmount: 0,
  cartItems: [],
  qty: 0,
};
const GET = async (req: NextRequest) => {
  try {
    const id = req.cookies.get(CART_COOKIE_KEY)?.value;
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
      },
    });
    if (!cart) {
      throw new Error("We can't find cart");
    }
    return NextResponse.json<CartState>(cart as CartState);
  } catch (e: any) {
    console.log("[ERROR]: ", e);
  }
  return NextResponse.json(initialState);
};

const POST = async (req: NextRequest) => {
  const id = req.cookies.get(CART_COOKIE_KEY)?.value;
  if (!id) {
    throw new Error("Something was wrong! Please try again");
  }
  const cartRequest: CartRequest = CartRequestSchema.parse(await req.json());
  console.log(1111, cartRequest);

  return NextResponse.json({ success: false });
};

const PUT = async (req: NextRequest) => {
  try {
    const id = req.cookies.get(CART_COOKIE_KEY)?.value;
    if (!id) {
      throw new Error("Something was wrong! Please try again");
    }
    const cart = await db.cart.findUnique({
      where: {
        id,
      },
    });
    if (!cart) {
      throw new Error("We can't find cart");
    }
    const cartItemDetails: {
      id: string;
      qty: number;
    } = await req.json();
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
  } catch (e: any) {
    console.log("[ERROR] ", e);
  }
  return NextResponse.json({
    success: false,
  });
};

const DELETE = async (req: NextRequest) => {
  try {
    const id = req.cookies.get(CART_COOKIE_KEY)?.value;
    if (!id) {
      throw new Error("Something was wrong! Please try again");
    }
    const cart = await db.cart.findUnique({
      where: {
        id,
      },
    });
    if (!cart) {
      throw new Error("We can't find cart");
    }
    const cartItemDetails: {
      id: string;
    } = await req.json();
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
    await cartAction(cart);
    return NextResponse.json({
      success: true,
    });
  } catch (e: any) {
    console.log("[ERROR] ", e);
  }
  return NextResponse.json({
    success: false,
  });
};

export { GET, POST, PUT, DELETE };
