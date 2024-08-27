import { instance } from "@/lib/services/axios/instance";
import { Product } from "@prisma/client";
import { ApiRoutes } from "@/lib/enums/product";

export const search = async (query: string) => {
  const { data: products } = await instance.get<Product[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    {
      params: { query },
    },
  );
  return products;
};
