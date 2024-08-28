import { instance } from "@/lib/services/axios/instance";
import { Category } from "@prisma/client";
import { ApiRoutes } from "@/lib/enums/product";
import qs from "qs";

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
