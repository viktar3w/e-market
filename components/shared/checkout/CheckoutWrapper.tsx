"use client";
import { useEffect, useMemo, useState } from "react";

import CartDrawerItemCheckout from "@/components/shared/checkout/CartDrawerItemCheckout";
import CheckoutSkeleton from "@/components/shared/checkout/CheckoutSkeleton";
import DeliveryForm from "@/components/shared/checkout/DeliveryForm";
import PersonalDataForm from "@/components/shared/checkout/PersonalDataForm";
import ProgressBar from "@/components/shared/checkout/ProgressBar";
import Summary from "@/components/shared/checkout/Summary";
import Accordion from "@/components/shared/common/Accordion";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import Title from "@/components/shared/common/Title";
import WhiteBlock from "@/components/shared/common/WhiteBlock";
import { CheckoutStep } from "@/lib/enums/checkout";
import { useGetCartQuery } from "@/lib/redux/api/cart.api";
import { DeliveryForm as DeliveryFormType } from "@/lib/types/user";
const CheckoutWrapper = () => {
  const { data, isLoading } = useGetCartQuery();
  const [isShippingDisabled, setIsShippingDisabled] = useState<boolean>(true);
  const [isPlaceOrderDisabled, setIsPlaceOrderDisabled] =
    useState<boolean>(true);
  useEffect(() => {
    const isShippingDisabled =
      !data?.phone || !data?.email || !data?.firstname || !data?.lastname;
    setIsShippingDisabled(isShippingDisabled);
    setIsPlaceOrderDisabled(isShippingDisabled || !data?.shippingAddress);
  }, [data]);
  const currentStep = useMemo(() => {
    return !isPlaceOrderDisabled
      ? CheckoutStep.THREE
      : !isShippingDisabled
        ? CheckoutStep.TWO
        : CheckoutStep.ONE;
  }, [isPlaceOrderDisabled, isShippingDisabled]);
  return (
    <BoxWrapper className="pt-5">
      <Title text="Order placement" size="xl" className="font-extrabold mb-8" />
      <ProgressBar currentStep={currentStep} />
      <div className="flex gap-10 max-md:flex-col">
        {isLoading ? (
          <CheckoutSkeleton />
        ) : (
          <>
            <div className="flex flex-col gap-10 flex-1">
              <WhiteBlock title="1. Cart Data">
                <div className="flex flex-col gap-5">
                  {data?.cartItems.map((item) => (
                    <CartDrawerItemCheckout
                      key={item.id}
                      item={item}
                      loading={isLoading}
                      className="mb-2"
                    />
                  ))}
                </div>
              </WhiteBlock>
              <Accordion
                title={`${CheckoutStep.ONE}. Personal Data`}
                isOpen={currentStep === CheckoutStep.ONE}
                isOpenByDefault={currentStep >= CheckoutStep.ONE}
              >
                <PersonalDataForm
                  firstname={data?.firstname}
                  lastname={data?.lastname}
                  email={data?.email}
                  phone={data?.phone}
                />
              </Accordion>
              <Accordion
                title={`${CheckoutStep.TWO}. Delivery Data`}
                isOpen={currentStep === CheckoutStep.TWO}
                isOpenByDefault={currentStep >= CheckoutStep.TWO}
              >
                {!!data?.shippingAddress ? (
                  <DeliveryForm
                    disabled={isShippingDisabled}
                    {...(data.shippingAddress as DeliveryFormType)}
                  />
                ) : (
                  <DeliveryForm
                    email={data?.email}
                    firstname={data?.firstname}
                    lastname={data?.lastname}
                    phone={data?.phone}
                    disabled={isShippingDisabled}
                  />
                )}
              </Accordion>
            </div>
            {!!data && (
              <div className="pb-20">
                <WhiteBlock title={`${CheckoutStep.THREE}. Summary Data`}>
                  <Summary cart={data} disabled={isPlaceOrderDisabled} />
                </WhiteBlock>
              </div>
            )}
          </>
        )}
      </div>
    </BoxWrapper>
  );
};

export default CheckoutWrapper;
