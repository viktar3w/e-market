import { instance } from "@/lib/services/axios/instance";
import { Component } from "@prisma/client";
import { ApiRoutes } from "@/lib/enums/product";

export const search = async (query: string) => {
  const { data: component } = await instance.get<Component[]>(
    ApiRoutes.SEARCH_COMPONENTS,
    {
      params: { query },
    },
  );
  return component;
};
