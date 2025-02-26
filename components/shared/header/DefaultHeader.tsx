"use client";

import { memo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import Image from "next/image";
import Auth from "@/components/auth/Clerk";
import HeaderSearch from "@/components/shared/filters/HeaderSearch";
import CartButton from "@/components/shared/cart/CartButton";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchLocale,
  selectCommon,
  setLocale as setStoreLocale,
} from "@/lib/redux/slices/commonSlicer";

type DefaultHeaderProps = {
  className?: string;
};

const DefaultHeader = ({ className }: DefaultHeaderProps) => {
  const { locale: storeLocale } = useAppSelector(selectCommon);
  const dispatch = useAppDispatch();
  const [locale, setLocale] = useState<string>("");
  useEffect(() => {
    setLocale(storeLocale);
  }, [storeLocale]);
  useEffect(() => {
    dispatch(fetchLocale());
  }, [dispatch]);
  return (
    <header className={cn("border border-b", className)}>
      <BoxWrapper className="flex flex-col md:flex-row items-center justify-between py-4 md:py-8">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">
          <div className="flex items-center gap-2 md:gap-4">
            <Image
              src="/logo.svg"
              alt="logo"
              width={30}
              height={30}
              className="w-auto h-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-black">eMarket</h1>
              <p className="text-xs md:text-sm text-gray-600 leading-3">
                you can find everything
              </p>
            </div>
          </div>
        </a>
        <div className="w-full mt-4 md:mt-0 md:mx-10 md:flex-1">
          <HeaderSearch />
        </div>
        <div className="flex items-center gap-2 md:gap-3 mt-4 md:mt-0">
          <Auth />
          <CartButton />
        </div>
      </BoxWrapper>
    </header>
  );
};

export default memo(DefaultHeader);
