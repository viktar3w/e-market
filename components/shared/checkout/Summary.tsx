"use client";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { memo } from "react";

import SummaryItem from "@/components/shared/checkout/SummaryItem";
import { Button } from "@/components/ui/button";
import { useCheckoutSummary } from "@/hooks/useCheckoutSummary";
import { CartState } from "@/lib/types/cart";
import { cn, formatPrice } from "@/lib/utils";

type SummaryProps = {
  className?: string;
  cart: CartState;
  disabled?: boolean;
};
const Summary = ({ className, cart, disabled = true }: SummaryProps) => {
  const { fullTotal, taxes, loading, shipping, onSubmit } =
    useCheckoutSummary(cart);
  return (
    <div className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total Amount:</span>
        <span className="text-3xl font-extrabold">
          {formatPrice(fullTotal)}
        </span>
      </div>
      <SummaryItem
        title={
          <div className="flex items-center gap-2">
            <Package size="18" className="text-gray-300" />
            Items Amount:
          </div>
        }
        amount={cart.totalAmount}
      />
      <SummaryItem
        title={
          <div className="flex items-center gap-2">
            <Percent size="18" className="text-gray-300" />
            Taxes Amount:
          </div>
        }
        amount={taxes}
      />
      <SummaryItem
        title={
          <div className="flex items-center gap-2">
            <Truck size="18" className="text-gray-300" />
            Shipping Amount:
          </div>
        }
        amount={shipping}
      />
      <Button
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        loading={loading}
        disabled={disabled || loading}
        onClick={() => onSubmit()}
      >
        Order Pay
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};

export default memo(Summary);
