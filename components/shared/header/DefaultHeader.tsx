import { memo } from "react";
import { cn } from "@/lib/utils";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Auth from "@/components/auth/Clerk";
import Link from "next/link";
import HeaderSearch from "@/components/shared/filters/HeaderSearch";

type DefaultHeaderProps = {
  className?: string;
};

const DefaultHeader = ({ className }: DefaultHeaderProps) => {
  const isCart = true;
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
          <div className="flex items-center gap-3">
            <Button variant="outline" className="group relative">
              {isCart ? (
                <>
                  <b>$ 232</b>
                  <span className="h-full bg-black/30 mx-3 w-[1px]" />
                  <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart
                      size={16}
                      className="relative"
                      strokeWidth={2}
                    />
                    <b>3</b>
                  </div>
                  <ArrowRight
                    size={20}
                    className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                  />
                </>
              ) : (
                <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
              )}
            </Button>
          </div>
        </div>
      </BoxWrapper>
    </header>
  );
};

export default memo(DefaultHeader);
