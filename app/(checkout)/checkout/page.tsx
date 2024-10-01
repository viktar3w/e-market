import { cookies } from "next/headers";
import { CART_COOKIE_KEY } from "@/lib/constants";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { CartState } from "@/lib/types/cart";
import CheckoutWrapper from "@/components/shared/checkout/CheckoutWrapper";

const Page = async () => {
  const cartId = cookies().get(CART_COOKIE_KEY)?.value;
  if (!cartId) {
    return notFound();
  }
  const cart = (await db.cart.findUnique({
    where: {
      id: cartId,
    },
  })) as CartState | null;
  if (!cart) {
    return notFound();
  }
  return <CheckoutWrapper />;
};

export default Page;
