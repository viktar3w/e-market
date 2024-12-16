import { NextRequest, NextResponse } from "next/server";
import { SupportPlan } from "@prisma/client";

import { db } from "@/db";
import { SUPPORT_FREE_LIMIT, SUPPORT_PRO_LIMIT } from "@/lib/constants";

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Invalid auth header format. Expected: `Bearer [API_KEY]`" },
      { status: 401 },
    );
  }
  const apiKey = authHeader.split(" ")[1];
  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json({ message: "Invalid API key" }, { status: 401 });
  }
  const support = await db.support.findUnique({
    where: {
      apiKey,
    },
    include: {
      user: true,
      socials: true,
    },
  });
  if (!support || !support?.socials || support.socials.length === 0) {
    return NextResponse.json(
      { message: "Please enter your social ids into your account settings" },
      { status: 403 },
    );
  }
  const currentData = new Date();
  const currentMonth = currentData.getMonth() + 1;
  const currentYear = currentData.getFullYear();

  const limitSupport = await db.limitSupport.findUnique({
    where: {
      supportId: support.id,
      month: currentMonth,
      year: currentYear,
    },
  });
  const limit =
    support.plan === SupportPlan.FREE
      ? SUPPORT_FREE_LIMIT.maxEventsPerMonth
      : SUPPORT_PRO_LIMIT.maxEventsPerMonth;
  if (!!limitSupport && limitSupport.count >= limit) {
    return NextResponse.json(
      {
        message: "Please update your Plan for more events.",
      },
      { status: 429 },
    );
  }
  return NextResponse.json(
    {
      message: "hi",
    },
    { status: 200 },
  );
};
