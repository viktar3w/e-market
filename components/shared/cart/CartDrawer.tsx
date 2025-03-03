"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { CartStatus } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { PropsWithChildren, useEffect } from "react";

import CartDrawerItem from "@/components/shared/cart/CartDrawerItem";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/hooks/redux";
import { CART_COOKIE_KEY } from "@/lib/constants";
import { selectCart } from "@/lib/redux/slices/cartSlicer";
import { removeCookie } from "@/lib/services/server";
import { cn, formatPrice } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

type CartDrawerProps = {
  className?: string;
} & PropsWithChildren;
const CartDrawer = ({ className, children }: CartDrawerProps) => {
  const $t = useTranslation();
  const { cart } = useAppSelector(selectCart);
  const { refresh } = useRouter();
  useEffect(() => {
    if (cart.status === CartStatus.NOT_ACTIVE) {
      removeCookie(CART_COOKIE_KEY).then(() => refresh());
    }
  }, [cart, refresh]);
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={cn(
          "flex flex-col justify-between pb-0 bg-[#f4f1ee]",
          className,
        )}
        aria-describedby=""
      >
        <SheetHeader>
          <SheetTitle className="font-bold">
            {$t("{1} item(s)", { ['1']: cart.qty })}
          </SheetTitle>
        </SheetHeader>
        <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
          {cart.cartItems.map((item) => (
            <CartDrawerItem
              key={item.id}
              item={item}
              loading={cart.loading}
              className="mb-2"
            />
          ))}
        </div>
        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                {$t('Sum')}
                <div className="flex-1 border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">
                {formatPrice(cart.totalAmount)}
              </span>
            </div>
            <Link href="/checkout/">
              <Button className="w-full h-12 text-base" disabled={cart.loading}>
                {$t('Checkout')} <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
