"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import CartDrawer from "@/components/shared/cart/CartDrawer";
import { cn } from "@/lib/utils";
import { useGetCartQuery } from "@/lib/redux/api/cart.api";
import { useEffect, useState } from "react";
import { CartItemState } from "@/lib/types/cart";
import { useAppSelector } from "@/hooks/redux";
import { selectCart } from "@/lib/redux/slices/cartSlicer";

type CartButtonProps = {
  className?: string;
};
const CartButton = ({ className }: CartButtonProps) => {
  const { cart } = useAppSelector(selectCart);
  const { data, isLoading } = useGetCartQuery();
  const [items, setItems] = useState<CartItemState[]>([]);
  useEffect(() => {
    setItems(data?.cartItems || []);
    return () => setItems([]);
  }, [data?.cartItems]);
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <CartDrawer>
        <Button
          loading={isLoading || cart.loading}
          variant="outline"
          className={cn("group relative", {
            "w-[105px]": isLoading,
          })}
        >
          {items.length > 0 ? (
            <>
              <strong>{data?.totalAmount}</strong>
              <span className="h-full bg-black/30 mx-3 w-[1px]" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className="relative" strokeWidth={2} />
                <strong>{data?.qty}</strong>
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
      </CartDrawer>
    </div>
  );
};

export default CartButton;
