import { cn } from "@/lib/utils";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import Link from "next/link";
import Image from "next/image";
import Auth from "@/components/auth/Clerk";
import { buttonVariants } from "@/components/ui/button";

type SupportHeaderProps = {
  className?: string;
};

const SupportHeader = ({ className }: SupportHeaderProps) => {
  return (
    <header className={cn("border-b bg-[#F4F1EE]", className)}>
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
        <div className="flex items-center gap-3">
          <Link
            href="/support/pricing"
            className={buttonVariants({
              size: "sm",
              className: "flex items-center gap-1",
              variant: "link",
            })}
          >
            Pricing
          </Link>
          <Auth />
        </div>
      </BoxWrapper>
    </header>
  );
};

export default SupportHeader;
