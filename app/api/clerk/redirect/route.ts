import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { CartState } from "@/lib/types/cart";
import { sessionCreateWebhook } from "@/actions/clerkUser";
import { cookies } from "next/headers";
import { CART_COOKIE_KEY, SIGN_OUT_KEY } from "@/lib/constants";

export const POST = (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const redirectPath = process.env.NEXT_PUBLIC_SERVER_URL!;
  if (
    searchParams.has(SIGN_OUT_KEY) &&
    Number(searchParams.get(SIGN_OUT_KEY)) === 1
  ) {
    cookies().delete(CART_COOKIE_KEY);
    return NextResponse.redirect(redirectPath);
  }
  return NextResponse.redirect(redirectPath);
};

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const redirectPath = process.env.NEXT_PUBLIC_SERVER_URL!;
  if (
    searchParams.has(SIGN_OUT_KEY) &&
    Number(searchParams.get(SIGN_OUT_KEY)) === 1
  ) {
    cookies().delete(CART_COOKIE_KEY);
    return NextResponse.redirect(redirectPath);
  }
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Customer isn't authorized");
    }
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error(`We can't find customer: ${userId}`);
    }
    const id = cookies().get(CART_COOKIE_KEY)?.value;
    if (!id) {
      throw new Error("Something was wrong! Please try again");
    }
    const cart = await db.cart.findUnique({
      where: { id },
      include: {
        cartItems: {
          include: {
            productItem: {
              include: {
                components: true
              }
            },
          },
        },
      },
    });
    if (!cart || cart?.userId === userId) {
      return NextResponse.redirect(redirectPath);
    }
    await sessionCreateWebhook(user.id, cart as CartState);
  } catch (err: any) {
    console.error("Error clerk redirect:", err);
    return NextResponse.redirect(redirectPath);
  }
  return NextResponse.redirect(redirectPath);
};
