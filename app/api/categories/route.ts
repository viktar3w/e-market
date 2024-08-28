import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_PRODUCT_NUMBER_PAGE,
  DEFAULT_PRODUCT_SIZE,
} from "@/lib/constants";
import { Prisma } from "@prisma/client";
import ProductWhereInput = Prisma.ProductWhereInput;
import CategoryWhereInput = Prisma.CategoryWhereInput;
import qs from "qs";

export const GET = async (reg: NextRequest) => {
  const components = qs.parse(reg.nextUrl.search.replace("?", ""), {
    comma: false,
    parseArrays: true,
  });
  const limit = Number(components?.limit || DEFAULT_PRODUCT_SIZE);
  const numberPage = Number(
    components?.number_page || DEFAULT_PRODUCT_NUMBER_PAGE,
  );
  let options = {
    skip: (numberPage - 1) * limit, // Пропустить записи для предыдущих страниц
    take: limit,
    include: {
      products: {
        include: {
          components: true,
          variants: true,
        },
        where: {} as ProductWhereInput,
      },
    },
    where: {} as CategoryWhereInput,
  };
  if (!!components?.query) {
    options.where = {
      name: {
        contains: String(components?.query),
        mode: "insensitive",
      },
    };
  }
  if (Object.keys(components).length > 0) {
    if (!!components?.available) {
      options.include.products.where.available =
        String(components?.available).toLowerCase() === "true";
    }
    if (!!components?.new) {
      options.include.products.where.new =
        String(components?.new).toLowerCase() === "true";
    }
    if (!!components?.components) {
      if (typeof components?.components === "string") {
        options.include.products.where.components = {
          some: {
            id: { in: String(components?.components).split(",") },
          },
        };
      }
    }
    if (!!components?.minPrice || !!components?.maxPrice) {
      options.include.products.where.variants = {
        some: {
          AND: [
            !!components?.minPrice
              ? { price: { gte: Number(components?.minPrice) } }
              : {},
            !!components?.maxPrice
              ? { price: { lte: Number(components?.maxPrice) } }
              : {},
          ],
        },
      };
    }
  }
  const categories = await db.category.findMany(options);
  return NextResponse.json(categories);
};
