import { memo } from "react";
import { cn } from "@/lib/utils";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import Image from "next/image";
import Auth from "@/components/auth/Clerk";
import Link from "next/link";
import HeaderSearch from "@/components/shared/filters/HeaderSearch";
import CartButton from "@/components/shared/cart/CartButton";

type DefaultHeaderProps = {
  className?: string;
};

const DefaultHeader = ({ className }: DefaultHeaderProps) => {
  return (
    <header className={cn("border border-b", className)}>
      <BoxWrapper className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.svg" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">eMarket</h1>
              <p className="text-sm text-gray-400 leading-3">
                you can find everything
              </p>
            </div>
          </div>
        </Link>
        <div className="mx-10 flex-1">
          <HeaderSearch />
        </div>
        <div className="flex items-center gap-3">
          <Auth />
          <CartButton />
        </div>
      </BoxWrapper>
    </header>
  );
};

export default memo(DefaultHeader);
