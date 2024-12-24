import { Product } from "@prisma/client";

import { ApiRoutes } from "@/lib/enums/product";
import { instance } from "@/lib/services/axios/instance";

export const search = async (query: string) => {
  const { data: products } = await instance.get<Product[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    {
      params: { query },
    },
  );
  return products;
};
