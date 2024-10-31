import { stripe } from "@/lib/stripe/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { OrderStatus, Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    const webToken = 'we_1QG2uCKk9GHoSMDd3iANUbQw';
    console.log(
      "[verifyHeader] ",
      stripe.webhooks.signature.verifyHeader(body, sig, webToken),
    );
    const event = stripe.webhooks.constructEvent(body, sig, webToken);
    const session = event?.data?.object as Stripe.Checkout.Session;
    const token = session?.metadata?.token;
    if (!token) {
      console.log("Invalid metadata");
      return new NextResponse("Invalid metadata");
    }
    const order = await db.order.findFirst({
      where: {
        token,
      },
      include: {
        billingAddress: true,
        shippingAddress: true,
      },
    });
    if (!order) {
      console.log("Invalid order");
      return new NextResponse("Invalid order");
    }
    const data: Prisma.OrderUpdateInput = {
      status: order.status,
    };
    const billingAddress: Stripe.Checkout.Session.ShippingDetails | undefined =
      // @ts-ignore
      session?.billing_details;
    switch (event.type) {
      case "checkout.session.async_payment_failed":
        data.status = OrderStatus.CANCELLED;
        break;
      case "checkout.session.async_payment_succeeded":
        data.status = OrderStatus.SUCCEEDED;
        data.items = {
          stripeId: session.id,
          status: session?.status || "",
          customerDetails: session?.customer_details || {},
        } as Prisma.InputJsonObject;
        if (!order.billingAddress && !!billingAddress) {
          const name = billingAddress?.name?.split(" ") || [
            order.shippingAddress.firstname,
            order.shippingAddress.lastname,
          ];
          data.billingAddress = {
            create: {
              city: billingAddress.address?.city || order.shippingAddress.city,
              country:
                billingAddress.address?.country ||
                order.shippingAddress.country,
              street: [
                billingAddress.address?.line1 || "",
                billingAddress.address?.line2 || "",
              ].join(" "),
              postcode:
                billingAddress.address?.postal_code ||
                order.shippingAddress.postcode,
              state:
                billingAddress.address?.state || order.shippingAddress.state,
              firstname: name[0],
              lastname: name[1] || order.shippingAddress.lastname,
              phone: billingAddress.phone || order.shippingAddress.phone,
              // @ts-ignore
              email: billingAddress?.email || order.shippingAddress.email,
            },
          };
        }
        break;
    }
    await db.order.update({
      data: data,
      where: {
        id: order.id,
      },
    });
  } catch (err: any) {
    console.log("[ERROR] ", err);
    return NextResponse.json({ error: "Something was wrong" }, { status: 400 });
  }
  console.log("Order was updated");
  return new NextResponse("Order was updated");
}
