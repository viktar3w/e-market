import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getCart } from "@/actions/cartAction";
import {
  CheckoutDeliveryValidation,
  CheckoutPersonalDataValidation,
  CheckoutPlaceOrderValidation,
} from "@/lib/validations/checkout";
import {
  OrderStatus,
  PaymentType,
  Prisma,
  ShippingAddress,
} from "@prisma/client";
import DOMPurify from "isomorphic-dompurify";
import crypto from "crypto";
import OrderCreateInput = Prisma.OrderCreateInput;
import { stripe } from "@/lib/stripe/stripe";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { CART_COOKIE_KEY } from "@/lib/constants";
import { sendEmail } from "@/lib/email";
import OrderEmail from "@/components/shared/emails/OrderEmail";
import { OrderState } from "@/lib/types/checkout";

const POST = async (req: NextRequest) => {
  const cart = await getCart();
  const totalInfo = CheckoutPlaceOrderValidation.parse(await req.json());
  const cartInfo = await db.cart.findUnique({
    where: {
      id: cart.id,
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
            },
          },
        },
      },
      shippingAddress: true,
    },
  });
  if (!cartInfo || !cartInfo.shippingAddress?.id) {
    throw new Error("something was wrong with getting cart data");
  }
  const token = crypto.randomBytes(24).toString("hex");
  const data: OrderCreateInput = {
    token: token,
    taxAmount: totalInfo.taxAmount,
    shippingAmount: totalInfo.shippingAmount,
    totalAmount: cartInfo.totalAmount,
    summaryAmount: totalInfo.summaryAmount,
    qty: cartInfo.qty,
    status: OrderStatus.PENDING,
    paymentType: PaymentType.STRIPE,
    paymentId: "",
    items: {},
    currency: "USD",
    cart: {
      connect: {
        id: cartInfo.id,
      },
    },
    shippingAddress: {
      connect: {
        id: cartInfo.shippingAddress.id,
      },
    },
  };
  if (cartInfo.userId) {
    data.user = {
      connect: {
        id: cartInfo.userId,
      },
    };
  }
  const order = await db.order.create({
    data,
  });
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const cartItem of cartInfo.cartItems) {
    const images: string[] = [];
    console.log(cartItem.productItem.variant.image);
    if (!!cartItem?.productItem?.variant?.image) {
      images.push(cartItem.productItem.variant.image);
    }
    const product = await stripe.products.create({
      name: cartItem.name,
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${cartItem.productItem.variant.product.id}`,
      default_price_data: {
        currency: order.currency,
        unit_amount_decimal: Number(cartItem.totalAmount * 100).toFixed(2),
      },
      images: images,
    });
    lineItems.push({
      price: product.default_price as string,
      quantity: cartItem.qty,
    });
  }
  if (!!order.taxAmount) {
    const tax = await stripe.products.create({
      name: "Common Taxes Amount",
      default_price_data: {
        currency: order.currency,
        unit_amount_decimal: Number(order.taxAmount * 100).toFixed(),
      },
    });
    lineItems.push({
      price: tax.default_price as string,
      quantity: 1,
    });
  }
  if (!!order.shippingAmount) {
    const tax = await stripe.products.create({
      name: "Common Shipping Amount",
      default_price_data: {
        currency: order.currency,
        unit_amount_decimal: Number(
          Number(order.shippingAmount.toFixed(2)) * 100,
        ).toFixed(2),
      },
    });
    lineItems.push({
      price: tax.default_price as string,
      quantity: 1,
    });
  }
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/success?token=${token}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/error?token=${token}`,
    payment_method_types: ["card"],
    mode: "payment",
    billing_address_collection: "required",
    metadata: {
      token: order.token,
    },
    line_items: lineItems,
  });
  cookies().delete(CART_COOKIE_KEY);
  try {
    sendEmail({
      to: cartInfo.shippingAddress.email,
      subject: "e-Market: Your order was created",
      from: "v.starovoitou@trial-3z0vklo17n7g7qrx.mlsender.net",
      template: OrderEmail({ order: order as OrderState, cart: cartInfo }),
    });
  } catch (e: any) {
    console.log("[ERROR] can't send order create email: ", e?.message);
  }
  return NextResponse.json({
    url: stripeSession.url,
  });
};

const PATCH = async (req: NextRequest) => {
  const cart = await getCart();
  const personalData = CheckoutPersonalDataValidation.parse(await req.json());
  await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      firstname: DOMPurify.sanitize(personalData.firstname),
      lastname: DOMPurify.sanitize(personalData.lastname),
      email: DOMPurify.sanitize(personalData.email),
      phone: DOMPurify.sanitize(personalData.phone),
    },
  });
  return NextResponse.json({
    success: true,
  });
};

const PUT = async (req: NextRequest) => {
  const cart = await getCart();
  const shippingAddressData = CheckoutDeliveryValidation.parse(
    await req.json(),
  );
  let shippingAddress: ShippingAddress;
  const preparedData = {
    firstname: DOMPurify.sanitize(shippingAddressData.firstname),
    lastname: DOMPurify.sanitize(shippingAddressData.lastname),
    email: DOMPurify.sanitize(shippingAddressData.email),
    phone: DOMPurify.sanitize(shippingAddressData.phone),
    state: DOMPurify.sanitize(shippingAddressData.state),
    street: DOMPurify.sanitize(shippingAddressData.street),
    country: DOMPurify.sanitize(shippingAddressData.country),
    city: DOMPurify.sanitize(shippingAddressData.city),
    postcode: DOMPurify.sanitize(shippingAddressData.postcode),
  };
  if (!cart?.shippingAddressId) {
    shippingAddress = await db.shippingAddress.create({
      data: {
        ...preparedData,
      },
    });
    await db.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        shippingAddress: {
          connect: {
            id: shippingAddress.id,
          },
        },
      },
    });
  } else {
    await db.shippingAddress.update({
      where: {
        id: cart.shippingAddressId,
      },
      data: {
        ...preparedData,
      },
    });
  }
  return NextResponse.json({
    success: true,
  });
};

export { POST, PATCH, PUT };
