import Image from "next/image";
import Link from "next/link";

import { memo } from "react";

import Auth from "@/components/auth/Clerk";
import CartButton from "@/components/shared/cart/CartButton";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import HeaderSearch from "@/components/shared/filters/HeaderSearch";
import { cn } from "@/lib/utils";

type DefaultHeaderProps = {
  className?: string;
};

const DefaultHeader = ({ className }: DefaultHeaderProps) => {
  return (
    <header className={cn("border border-b", className)}>
      <BoxWrapper className="flex flex-col md:flex-row items-center justify-between py-4 md:py-8">
        <Link href="/">
          <div className="flex items-center gap-2 md:gap-4">
            <Image
              src="/logo.svg"
              alt="logo"
              width={30}
              height={30}
              className="w-auto h-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl uppercase font-black">
                eMarket
              </h1>
              <p className="text-xs md:text-sm text-gray-400 leading-3">
                you can find everything
              </p>
            </div>
          </div>
        </Link>
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
