import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { CART_COOKIE_KEY } from "@/lib/constants";
import { CartState } from "@/lib/types/cart";
import {
  deleteCartIdWebhook,
  sessionCreateWebhook,
  userCreateWebhook,
  userDeleteWebhook,
} from "@/actions/clerkUser";

export const POST = async (req: Request) => {
  try {
    const secret = process.env.WEBHOOK_CLERK_SECRET;
    if (!secret) {
      throw new Error("Please add WEBHOOK_CLERK_SECRET");
    }
    const headerPayload = headers();
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");
    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("Verifying svixId, svixTimestamp and svixSignature");
      return NextResponse.json(
        { error: "Something was wrong" },
        { status: 400 },
      );
    }
    const cartId = cookies().get(CART_COOKIE_KEY)?.value;
    console.log("cartId: ", cartId)
    let cart: CartState | undefined;
    if (!!cartId) {
      cart = (await db.cart.findUnique({
        where: {
          id: cartId,
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
      })) as CartState;
      console.log("cart was got: ", cartId)
    }
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(secret);
    const evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
    evt.type === "user.created" && userCreateWebhook(evt.data, cart?.id);
    evt.type === "user.deleted" &&
      userDeleteWebhook(evt?.data?.id || "", cart?.userId || undefined);
    evt.type === "session.created" &&
      sessionCreateWebhook(evt?.data?.id || "", cart);
    (evt.type === "session.removed" ||
      evt.type === "session.ended" ||
      evt.type === "session.revoked") &&
      !!cart?.id &&
      deleteCartIdWebhook();
  } catch (err: any) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json({ error: "Something was wrong" }, { status: 400 });
  }
  console.log("Cart was updated");
  return NextResponse.json({ error: "" });
};
