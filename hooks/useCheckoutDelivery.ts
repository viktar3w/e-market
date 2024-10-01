"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import {
  CheckoutDeliverySchema,
  CheckoutDeliveryValidation,
} from "@/lib/validations/checkout";
import { DeliveryForm } from "@/lib/types/user";
import { useToast } from "@/components/ui/use-toast";
import { useAddShippingAddressMutation } from "@/lib/redux/api/cart.api";

type CheckoutDelivery = {} & DeliveryForm;
export const useCheckoutDelivery = ({
  firstname,
  lastname,
  email,
  country,
  city,
  state,
  street,
  postcode,
  phone,
}: CheckoutDelivery) => {
  const { toast } = useToast();
  const [addShippingAddress, { isLoading, isError, isSuccess }] =
    useAddShippingAddressMutation();
  const form = useForm<CheckoutDeliverySchema>({
    resolver: zodResolver(CheckoutDeliveryValidation),
    defaultValues: {
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
      phone: phone || "",
      country: country || "",
      city: city || "",
      state: state || "",
      street: street || "",
      postcode: postcode || "",
    },
  });
  useEffect(() => {
    if (isError) {
      toast?.({
        description: "We can't add Shipping Address",
        variant: "destructive",
      });
    }
  }, [isError, toast]);
  useEffect(() => {
    if (isSuccess) {
      toast?.({
        description: "Shipping Address was updated",
        variant: "success",
      });
    }
  }, [isSuccess, toast]);
  const onSubmit = useCallback(
    (values: CheckoutDeliverySchema) => {
      addShippingAddress?.(values);
    },
    [addShippingAddress],
  );
  return {
    form,
    onSubmit,
    loading: isLoading,
    error: isError,
    success: isSuccess,
  };
};
