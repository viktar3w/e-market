import { Category } from "@prisma/client";
import qs from "qs";

import { ApiRoutes } from "@/lib/enums/product";
import { instance } from "@/lib/services/axios/instance";

export const search = async (query: string) => {
  const components = qs.parse(query.replace("?", ""), {
    comma: false,
    parseArrays: true,
  });
  const { data: categories } = await instance.get<Category[]>(
    ApiRoutes.SEARCH_CATEGORIES,
    {
      params: { ...components },
    },
  );
  return categories;
};
