import { cn } from "@/lib/utils";

type CartItemDetailImgProps = {
  className?: string;
  src: string;
  alt?: string;
};
const CartItemDetailImg = ({ className, src, alt }: CartItemDetailImgProps) => {
  return (
    <img src={src} alt={alt} className={cn("w-[60px] h-[60px]", className)} />
  );
};

export default CartItemDetailImg;
