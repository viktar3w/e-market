"use client";
import Image from "next/image";
import { Component } from "@prisma/client";
import { cn, formatPrice, getImage } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { DEFAULT_EMPTY_PRODUCT_IMAGE } from "@/lib/constants";

type ProductComponentProps = {
  className?: string;
  component: Component;
  active?: boolean;
  onClick?: () => void;
};
const ProductComponent = ({
  className,
  component,
  active = false,
  onClick,
}: ProductComponentProps) => {
  return (
    <div
      className={cn(
        "flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white",
        {
          "border border-primary": active,
        },
        className,
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <Image
        src={getImage(component.image)}
        width={110}
        height={110}
        loading="lazy"
        quality={80}
        alt={component.name}
        overrideSrc={DEFAULT_EMPTY_PRODUCT_IMAGE}
        className="w-auto h-auto"
      />
      <span className="text-xs mb-1">{component.name}</span>
      <span className="font-bold">{formatPrice(component.price)}</span>
    </div>
  );
};

export default ProductComponent;
