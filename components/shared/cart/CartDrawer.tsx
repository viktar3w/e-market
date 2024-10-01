"use client";
import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { selectCart } from "@/lib/redux/slices/cartSlicer";
import CartDrawerItem from "@/components/shared/cart/CartDrawerItem";
import { useAppSelector } from "@/hooks/redux";
type CartDrawerProps = {
  className?: string;
} & PropsWithChildren;
const CartDrawer = ({ className, children }: CartDrawerProps) => {
  const { cart } = useAppSelector(selectCart);
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
          <SheetTitle className="font-bold">{cart.qty} item(s)</SheetTitle>
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
                Sum
                <div className="flex-1 border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">
                {formatPrice(cart.totalAmount)}
              </span>
            </div>
            <Link href="/checkout/">
              <Button className="w-full h-12 text-base" disabled={cart.loading}>
                Checkout <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
