"use client";
import { usePlaceOrderMutation } from "@/lib/redux/api/checkout.api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CartState } from "@/lib/types/cart";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const useCheckoutSummary = (cart: CartState) => {
  const [placeOrder, { isLoading, isError, isSuccess, data }] =
    usePlaceOrderMutation();
  const { toast } = useToast();
  const [taxes, setTaxes] = useState<number>(0);
  const { push } = useRouter();
  useEffect(() => {
    setTaxes(cart.totalAmount * 0.2);
  }, [cart.totalAmount]);
  const shipping = 100;
  const fullTotal = useMemo(() => {
    return cart.totalAmount + taxes + shipping;
  }, [cart.totalAmount, taxes, shipping]);
  const onSubmit = useCallback(() => {
    placeOrder({
      taxAmount: taxes,
      shippingAmount: shipping,
      summaryAmount: fullTotal,
    });
  }, [taxes, fullTotal, shipping, placeOrder]);

  useEffect(() => {
    if (isError) {
      toast?.({
        description: "We can't Place Order now. Please try again later",
        variant: "destructive",
      });
    }
  }, [isError, toast]);
  useEffect(() => {
    if (isSuccess) {
      toast?.({
        description: "Order was created",
        variant: "success",
      });
    }
    if (!!data?.url) {
      push(data.url);
    }
  }, [isSuccess, toast, data]);
  return {
    onSubmit,
    taxes,
    shipping,
    fullTotal,
    loading: isLoading,
    error: isError,
  };
};
