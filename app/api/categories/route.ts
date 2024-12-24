import { NextRequest, NextResponse } from "next/server";

import qs from "qs";

import { db } from "@/db";
import { CategoryParent } from "@/lib/types/product";
import {
  preparedCategoryProductVariantsByPrice,
  preparePrismaCategoryFilter,
} from "@/lib/utils";

export const GET = async (reg: NextRequest) => {
  const components = qs.parse(reg.nextUrl.search.replaceAll("?", ""), {
    comma: false,
    parseArrays: true,
  });
  let options = preparePrismaCategoryFilter(components);
  let categories = await db.category.findMany(options) as CategoryParent[];
  const minPrice = !!components?.minPrice
    ? Number(components?.minPrice)
    : undefined;
  const maxPrice = !!components?.maxPrice
    ? Number(components?.maxPrice)
    : undefined;
  if (!!minPrice || !!maxPrice) {
    categories = preparedCategoryProductVariantsByPrice(
      categories,
      minPrice,
      maxPrice,
    );
  }
  return NextResponse.json(categories);
};
