"use client";
import { CategoryProductParent } from "@/lib/types/product";
import { useSet } from "react-use";

const useProductComponents = (product: CategoryProductParent) => {
  const [componentIds, {toggle: addComponent}] = useSet(new Set<string>([]))
  return {
    componentIds,
    addComponent
  }
};

export default useProductComponents;
