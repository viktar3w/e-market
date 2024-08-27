import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_PRODUCT_NUMBER_PAGE, DEFAULT_PRODUCT_SIZE } from "@/lib/constants";


export const GET = async (reg: NextRequest) => {
  const limit = Number(reg.nextUrl.searchParams.get('limit') || DEFAULT_PRODUCT_SIZE)
  const query = reg.nextUrl.searchParams.get('query')
  const numberPage = Number(reg.nextUrl.searchParams.get('number_page') || DEFAULT_PRODUCT_NUMBER_PAGE)
  let options = {
    skip: (numberPage - 1) * limit, // Пропустить записи для предыдущих страниц
    take: limit,
    where: {}
  }
  if (!!query) {
    options.where = {
      name: {
        contains: query,
        mode: 'insensitive',
      }
    }
  }
  const products = await db.product.findMany(options);
  return NextResponse.json(products);
};
