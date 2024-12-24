import { redirect } from "next/navigation";

import CheckoutSuccess from "@/components/shared/checkout/CheckoutSuccess";
import { db } from "@/db";
import { OrderState } from "@/lib/types/checkout";

const Page = async ({
  searchParams,
}: {
  searchParams?: { token?: string };
}) => {
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

  return <CheckoutSuccess order={order as OrderState} />;
};

export default Page;
