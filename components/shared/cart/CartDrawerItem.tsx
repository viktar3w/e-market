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
const CartDrawerItem = ({
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
    <div className={cn("flex bg-white p-5 gap-6", className)}>
      <CartItemDetailImg
        src={
          item.productItem.variant.image || "/products/default_product_img.png"
        }
      />
      <div className="flex-1">
        <CartItemInfo
          name={item.name}
          variant={item.productItem.variant}
          components={item.productItem.components}
        />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton
            onClick={handleButton}
            value={item.qty}
            disabled={isLoading || loading}
          />
          <div className="flex items-center gap-3">
            <CartItemDetailPrice price={item.totalAmount} />
            <TrashIcon
              size={16}
              className={cn("text-gray-400 cursor-pointer hover:text-gray-600", {
                'cursor-wait': isLoadingDeleting || loading
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
      </div>
    </div>
  );
};

export default CartDrawerItem;
