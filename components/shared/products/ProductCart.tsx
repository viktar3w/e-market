import Link from "next/link";

import { Plus } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Title from "@/components/shared/common/Title";
import { Button } from "@/components/ui/button";
import { ProductItemType } from "@/lib/types/product";
import { formatPrice } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

type ProductCartProps = {
  className?: string;
  priority?: boolean | undefined;
  loading?: "eager" | "lazy" | undefined;
} & ProductItemType;
const ProductCart = ({
  className,
  id,
  name,
  price,
  image,
  variants,
}: ProductCartProps) => {
  const $t = useTranslation();
  return (
    <div className={className}>
      <Link href={`/products/${id}`} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <LazyLoadImage
            alt={name}
            effect="opacity"
            wrapperProps={{
              style: { transitionDelay: "1s" },
            }}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
            src={image || "/default_product_img.png"}
          />
        </div>
        <Title text={name} className="mt-4 text-sm text-gray-700" size="sm" />
        {!!variants && (
          <div className="text-sm text-gray-600">
            {variants?.map((variant) => (
              <div key={variant.id}>
                {Object.keys(variant?.data || {})
                  .map(
                    // @ts-ignore
                    (key) => `${key}: ${variant?.data?.[key] || ""}`,
                  )
                  .join(", ")}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <span className="mt-1 text-lg font-medium text-gray-900">
            {" "}
            {$t("from")} <strong>{formatPrice(price)}</strong>
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            {$t("Add")}
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCart;
