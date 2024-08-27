import { db } from "@/db";
import { NextResponse } from "next/server";
import { DEFAULT_COMPONENT_SIZE } from "@/lib/constants";

export const GET = async () => {
  const components = await db.component.findMany({
    take: DEFAULT_COMPONENT_SIZE,
    where: {
      products: {
        some: {},
      },
    },
    include: {
      products: true,
    },
  });
  return NextResponse.json(components);
};
