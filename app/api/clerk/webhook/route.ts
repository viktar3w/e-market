import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { userCreateWebhook, userDeleteWebhook } from "@/actions/clerkUser";

export const POST = async (req: Request) => {
  try {
    const secret = process.env.WEBHOOK_CLERK_SECRET;
    if (!secret) {
      throw new Error("Please add WEBHOOK_CLERK_SECRET");
    }
    const headerPayload = await headers();
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
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(secret);
    const evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
    evt.type === "user.created" && userCreateWebhook(evt.data);
    evt.type === "user.deleted" && userDeleteWebhook(evt?.data?.id || "");
  } catch (err: any) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json({ error: "Something was wrong" }, { status: 400 });
  }
  console.log("Cart was updated");
  return NextResponse.json({ error: "" });
};
