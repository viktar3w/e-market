import Link from "next/link";
import Image from "next/image";
import { ProductItemType } from "@/lib/types/product";
import Title from "@/components/shared/common/Title";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type ProductCartProps = {
  className?: string;
} & ProductItemType;
const ProductCart = ({
  className,
  id,
  name,
  price,
  image,
}: ProductCartProps) => {
  return (
    <div className={className}>
      <Link href={`/products/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <Image
            src={image || "/default_product_img.png"}
            alt={name}
            width={53}
            height={53}
            className="h-[215px] w-[215px]"
          />
        </div>
        <Title text={name} className="mb-1 mt-3 font-bold" size="sm" />
        <p className="text-sm text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi,
          id?
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            {" "}
            from <strong>{formatPrice(price)}</strong>
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Add
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCart;
