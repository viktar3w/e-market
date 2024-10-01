import { CustomerForm } from "@/lib/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckoutPersonalDataSchema,
  CheckoutPersonalDataValidation,
} from "@/lib/validations/checkout";
import { useCallback, useEffect } from "react";
import { useUpdatePersonalDataMutation } from "@/lib/redux/api/cart.api";
import { useToast } from "@/components/ui/use-toast";

type CheckoutPersonalData = {} & CustomerForm;
export const useCheckoutPersonalData = ({
  firstname,
  lastname,
  email,
  phone,
}: CheckoutPersonalData) => {
  const { toast } = useToast();
  const [updatePersonalData, { isLoading, isError, isSuccess }] =
    useUpdatePersonalDataMutation();
  const form = useForm<CheckoutPersonalDataSchema>({
    resolver: zodResolver(CheckoutPersonalDataValidation),
    defaultValues: {
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
      phone: phone || "",
    },
  });
  useEffect(() => {
    if (isError) {
      toast?.({
        description: "We can't update Personal Data",
        variant: "destructive",
      });
    }
  }, [isError, toast]);
  useEffect(() => {
    if (isSuccess) {
      toast?.({
        description: "Personal Data was updated",
        variant: "success",
      });
    }
  }, [isSuccess, toast]);
  const onSubmit = useCallback(
    (values: CheckoutPersonalDataSchema) => {
      updatePersonalData?.(values);
    },
    [updatePersonalData],
  );
  return {
    form,
    onSubmit,
    loading: isLoading,
    error: isError,
    success: isSuccess,
  };
};
