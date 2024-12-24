"use client";
import { useEffect, useState } from "react";

import { API } from "@/lib/services/api-client";
import { CategoryParent } from "@/lib/types/product";

export const useCategories = (query: string = "") => {
  const [categories, setCategories] = useState<CategoryParent[]>([]);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    try {
      API.categories
        .search(query)
        .then((categories) => {
          setCategories(categories.map((c) => ({
            products: [],
            ...c,
          })));
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          console.log("[ERROR] useCategories: ", "something was wrong");
          setLoading(false);
        });
    } catch (e) {
      setError(e);
      console.log("[ERROR] useCategories: ", "something was wrong");
      setLoading(false);
    }
  }, [query]);
  return {
    categories,
    error,
    loading,
  };
};
