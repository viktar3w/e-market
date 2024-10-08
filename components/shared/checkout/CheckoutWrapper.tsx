"use client";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import Title from "@/components/shared/common/Title";
import WhiteBlock from "@/components/shared/common/WhiteBlock";
import PersonalDataForm from "@/components/shared/checkout/PersonalDataForm";
import DeliveryForm from "@/components/shared/checkout/DeliveryForm";
import Summary from "@/components/shared/checkout/Summary";
import { DeliveryForm as DeliveryFormType } from "@/lib/types/user";
import CartDrawerItemCheckout from "@/components/shared/checkout/CartDrawerItemCheckout";
import { useGetCartQuery } from "@/lib/redux/api/cart.api";
import { useEffect, useState } from "react";
import CheckoutSkeleton from "@/components/shared/checkout/CheckoutSkeleton";
const CheckoutWrapper = () => {
  const { data, isLoading } = useGetCartQuery();
  const [isShippingDisabled, setIsShippingDisabled] = useState<
    boolean | undefined
  >(true);
  const [isPlaceOrderDisabled, setIsPlaceOrderDisabled] = useState<
    boolean | undefined
  >(true);
  useEffect(() => {
    const isShippingDisabled =
      !data?.phone || !data?.email || !data?.firstname || !data?.lastname;
    setIsShippingDisabled(isShippingDisabled);
    setIsPlaceOrderDisabled(isShippingDisabled || !data?.shippingAddress);
  }, [data]);
  return (
    <BoxWrapper className="pt-5">
      <Title text="Order placement" size="xl" className="font-extrabold mb-8" />
      <div className="flex gap-10">
        {isLoading ? (
          <CheckoutSkeleton />
        ) : (
          <>
            <div className="flex flex-col gap-10 flex-1 mb-20">
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
              {!!data && (
                <>
                  <WhiteBlock title="2. Personal Data">
                    <PersonalDataForm
                      firstname={data?.firstname}
                      lastname={data?.lastname}
                      email={data?.email}
                      phone={data?.phone}
                    />
                  </WhiteBlock>
                  <WhiteBlock title="3. Delivery Data">
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
                  </WhiteBlock>
                </>
              )}
            </div>
            {!!data && (
              <div className="">
                <WhiteBlock title="Summary Data">
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
