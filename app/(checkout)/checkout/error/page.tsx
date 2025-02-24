import { redirect } from "next/navigation";
import { db } from "@/db";
import CheckoutError from "@/components/shared/checkout/CheckoutError";
import { OrderState } from "@/lib/types/checkout";

const Page = async (
  props: {
    searchParams?: Promise<{ token?: string }>;
  }
) => {
  const searchParams = await props.searchParams;
  const token = searchParams?.token;
  if (!token) {
    redirect("/");
  }
  const order = await db.order.findFirst({
    where: {
      token,
    },
    include: {
      cart: {
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
                },
              },
            },
          },
        },
      },
      shippingAddress: true,
    },
  });
  if (!order) {
    redirect("/");
  }

  return <CheckoutError order={order as OrderState} />;
};

export default Page;
