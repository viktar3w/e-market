import { memo } from "react";
import { cn } from "@/lib/utils";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import Image from "next/image";
import Auth from "@/components/auth/Clerk";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

type DefaultHeaderProps = {
  className?: string;
};

const CheckoutHeader = ({ className }: DefaultHeaderProps) => {
  const $t = useTranslation();
  return (
    <header className={cn("border-b bg-[#F4F1EE]", className)}>
      <BoxWrapper className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.svg" alt={$t("logo")} width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">{$t("eMarket")}</h1>
              <p className="text-sm text-gray-400 leading-3">
                {$t("you can find everything")}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Auth />
        </div>
      </BoxWrapper>
    </header>
  );
};

export default memo(CheckoutHeader);
