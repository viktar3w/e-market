"use client";
import { VariantItem } from "@/lib/types/product";
import { Component } from "@prisma/client";
import { cn, getProductDetails } from "@/lib/utils";
import { useMemo } from "react";

type CartItemInfoProps = {
  className?: string;
  name: string;
  variant: VariantItem;
  components?: Component[];
};
const CartItemInfo = ({
  className,
  name,
  variant,
  components,
}: CartItemInfoProps) => {
  const details = useMemo(() => {
    const componentIds =
      components?.reduce((componentIds, component) => {
        componentIds.add(component.id);
        return componentIds;
      }, new Set<string>([])) || new Set<string>([]);
    return getProductDetails(variant, componentIds, components || []);
  }, [variant, components]);
  return (
    <div className={cn("", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details.length > 0 && <p className="text-sm text-gray-400">{details}</p>}
    </div>
  );
};

export default CartItemInfo;
