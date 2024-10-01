import { cookies } from "next/headers";
import { CART_COOKIE_KEY } from "@/lib/constants";
import { db } from "@/db";
import CheckoutWrapper from "@/components/shared/checkout/CheckoutWrapper";

const Page = async () => {
  const cartId = cookies().get(CART_COOKIE_KEY)?.value;
  if (!cartId) {
    return <></>;
  }
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      _count: {
        select: { cartItems: true },
      },
    },
  });
  if (!cart || !cart?._count?.cartItems) {
    return <></>;
  }
  return <CheckoutWrapper />;
};

export default Page;
