import { cn, formatPrice } from "@/lib/utils";

type CartItemDetailPriceProps = {
  className?: string;
  price: number;
};
const CartItemDetailPrice = ({
  className,
  price,
}: CartItemDetailPriceProps) => {
  return <h2 className={cn("font-bold", className)}>{formatPrice(price)}</h2>;
};

export default CartItemDetailPrice;
