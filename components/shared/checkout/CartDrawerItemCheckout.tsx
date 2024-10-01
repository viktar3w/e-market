"use client";
import { cn } from "@/lib/utils";
import CartItemDetailImg from "@/components/shared/cart/CartItemDetailImg";
import CartItemInfo from "@/components/shared/cart/CartItemInfo";
import CountButton from "@/components/shared/common/CountButton";
import CartItemDetailPrice from "@/components/shared/cart/CartItemDetailPrice";
import { TrashIcon } from "lucide-react";
import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "@/lib/redux/api/cart.api";
import { CartItemState } from "@/lib/types/cart";
import { useCallback, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

type CartDrawerItemProps = {
  item: CartItemState;
  className?: string;
  loading?: boolean;
};
const CartDrawerItemCheckout = ({
  className,
  item,
  loading = false,
}: CartDrawerItemProps) => {
  const { toast } = useToast();
  const [updateCartItem, { isLoading, isError, isSuccess }] =
    useUpdateCartItemMutation();
  const [
    deleteCartItem,
    {
      isLoading: isLoadingDeleting,
      isError: isErrorDeleting,
      isSuccess: isSuccessDeleting,
    },
  ] = useDeleteCartItemMutation();
  useEffect(() => {
    if (isError) {
      toast?.({
        description: "We can't add qty now",
        variant: "destructive",
      });
    }
  }, [toast, isError]);
  useEffect(() => {
    if (isSuccess) {
      toast?.({
        description: "Qty was added",
        variant: "success",
      });
    }
  }, [toast, isSuccess]);
  useEffect(() => {
    if (isErrorDeleting) {
      toast?.({
        description: "We can't delete this item",
        variant: "destructive",
      });
    }
  }, [toast, isErrorDeleting]);
  useEffect(() => {
    if (isSuccessDeleting) {
      toast?.({
        description: "Item was deleted",
        variant: "success",
      });
    }
  }, [toast, isSuccessDeleting]);
  const handleButton = useCallback(
    (type: "plus" | "minus") => {
      const qty =
        type === "plus" ? item.qty + 1 : item.qty - 1 >= 1 ? item.qty - 1 : 1;
      updateCartItem({
        id: item.id,
        qty,
      });
    },
    [updateCartItem, item],
  );
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetailImg
          src={
            item.productItem.variant.image ||
            "/products/default_product_img.png"
          }
        />
        <CartItemInfo
          className="w-2/3"
          name={item.name}
          variant={item.productItem.variant}
          components={item.productItem.components}
        />
      </div>
      <CartItemDetailPrice price={item.totalAmount} />
      <div className="flex items-center gap-5 ml-20">
        <CountButton
          onClick={handleButton}
          value={item.qty}
          disabled={isLoading || loading}
        />
        <TrashIcon
          size={16}
          className={cn("text-gray-400 cursor-pointer hover:text-gray-600", {
            "cursor-wait": isLoadingDeleting || loading,
          })}
          onClick={() => {
            if (!isLoadingDeleting && !loading) {
              deleteCartItem({
                id: item.id,
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default CartDrawerItemCheckout;
