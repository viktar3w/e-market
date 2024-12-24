"use client";
import { useSet } from "react-use";

import { CategoryProductParent } from "@/lib/types/product";

const useProductComponents = (product: CategoryProductParent) => {
  const [componentIds, {toggle: addComponent}] = useSet(new Set<string>([]))
  return {
    componentIds,
    addComponent
  }
};

export default useProductComponents;
