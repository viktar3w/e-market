"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import CartDrawer from "@/components/shared/cart/CartDrawer";
import { cn, formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CartItemState } from "@/lib/types/cart";
import { useAppSelector } from "@/hooks/redux";
import { selectCart } from "@/lib/redux/slices/cartSlicer";
import { useGetCartQuery } from "@/lib/redux/api/cart.api";

type CartButtonProps = {
  className?: string;
};
const CartButton = ({ className }: CartButtonProps) => {
  useGetCartQuery();
  const { cart } = useAppSelector(selectCart);
  const [items, setItems] = useState<CartItemState[]>([]);
  useEffect(() => {
    setItems(cart?.cartItems || []);
    return () => setItems([]);
  }, [cart]);
  return (
    <div className={cn("flex items-center gap-2 md:gap-3", className)}>
      <CartDrawer>
        <Button
          loading={cart.loading}
          variant="outline"
          className={cn("group relative px-2 py-1 md:px-4 md:py-2", {
            "w-[85px] md:w-[105px]": cart.loading,
          })}
          title="Cart"
        >
          {items.length > 0 ? (
            <>
              <strong className="text-xs md:text-base">
                {formatPrice(cart?.totalAmount || 0)}
              </strong>
              <span className="h-full bg-black/30 mx-2 md:mx-3 w-[1px]" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={14} className="relative" strokeWidth={2} />
                <strong className="text-xs md:text-base">{cart?.qty}</strong>
              </div>
              <ArrowRight
                size={18}
                className="absolute right-3 md:right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </>
          ) : (
            <ShoppingCart
              className="h-4 w-4 md:h-5 md:w-5 relative"
              strokeWidth={2}
            />
          )}
        </Button>
      </CartDrawer>
    </div>
  );
};

export default CartButton;
