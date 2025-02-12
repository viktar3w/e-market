'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useToast } from '@/components/ui/use-toast';
import { useAddShippingAddressMutation, useUpdateShippingAddressMutation } from '@/lib/redux/api/cart.api';
import { DeliveryForm } from '@/lib/types/user';
import { findValueInAddress } from '@/lib/utils';
import { CheckoutDeliverySchema, CheckoutDeliveryValidation } from '@/lib/validations/checkout';

type CheckoutDelivery = {
  isAddress?: boolean;
} & DeliveryForm;
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
  isAddress = false,
}: CheckoutDelivery) => {
  const { toast } = useToast();
  const [addressAutocomplete, setAddressAutocomplete] = useState<google.maps.places.PlaceResult | null>(null);
  const [addShippingAddress, { isLoading, isError, isSuccess }] = useAddShippingAddressMutation();
  const [updateShippingAddress, { isLoading: isLoadingUpdate, isError: isErrorUpdate, isSuccess: isSuccessUpdate }] =
    useUpdateShippingAddressMutation();
  const form = useForm<CheckoutDeliverySchema>({
    resolver: zodResolver(CheckoutDeliveryValidation),
    defaultValues: {
      firstname: firstname || '',
      lastname: lastname || '',
      email: email || '',
      phone: phone || '',
      country: country || '',
      city: city || '',
      state: state || '',
      street: street || '',
      postcode: postcode || '',
    },
  });
  useEffect(() => {
    if (addressAutocomplete && form.setValue) {
      form.setValue('postcode', findValueInAddress(addressAutocomplete, 'postal_code'));
      form.setValue('street', addressAutocomplete?.name || '');
      form.setValue('state', findValueInAddress(addressAutocomplete, 'sublocality'));
      form.setValue('city', findValueInAddress(addressAutocomplete, 'locality'));
      form.setValue('country', findValueInAddress(addressAutocomplete, 'country'));
    }
  }, [addressAutocomplete, form, form.setValue]);
  useEffect(() => {
    if (isError) {
      toast?.({
        description: "We can't add Shipping Address",
        variant: 'destructive',
      });
    }
  }, [isError, toast]);
  useEffect(() => {
    if (isSuccess) {
      toast?.({
        description: 'Shipping Address was added',
        variant: 'success',
      });
    }
  }, [isSuccess, toast]);
  useEffect(() => {
    if (isErrorUpdate) {
      toast?.({
        description: "We can't update Shipping Address",
        variant: 'destructive',
      });
    }
  }, [isErrorUpdate, toast]);
  useEffect(() => {
    if (isSuccessUpdate) {
      toast?.({
        description: 'Shipping Address was updated',
        variant: 'success',
      });
    }
  }, [isSuccessUpdate, toast]);
  const onSubmit = useCallback(
    (values: CheckoutDeliverySchema) => {
      if (isAddress) {
        updateShippingAddress?.(values);
      } else {
        addShippingAddress?.(values);
      }
    },
    [addShippingAddress, isAddress, updateShippingAddress],
  );
  return {
    form,
    onSubmit,
    setAddressAutocomplete,
    loading: isLoading || isLoadingUpdate,
    error: isError || isErrorUpdate,
    success: isSuccess || isSuccessUpdate,
  };
};
