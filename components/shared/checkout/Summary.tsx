"use client";
import { CartState } from "@/lib/types/cart";
import { cn, formatPrice } from "@/lib/utils";
import { memo, useEffect, useMemo, useState } from "react";
import SummaryItem from "@/components/shared/checkout/SummaryItem";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

type SummaryProps = {
  className?: string;
  cart: CartState;
  disabled?: boolean;
};
const Summary = ({ className, cart, disabled = true }: SummaryProps) => {
  const [taxes, setTaxes] = useState<number>(0);
  useEffect(() => {
    setTaxes(cart.totalAmount * 0.2);
  }, [cart.totalAmount]);
  const shipping = 100;
  const fullTotal = useMemo(() => {
    return cart.totalAmount + taxes + shipping
  }, [cart.totalAmount, taxes, shipping])
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
        disabled={disabled}
      >
        Order Pay
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};

export default memo(Summary);
