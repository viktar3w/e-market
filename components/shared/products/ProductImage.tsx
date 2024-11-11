import { ProductSize } from "@/lib/enums/product";
import { cn } from "@/lib/utils";
import { ProductType } from "@prisma/client";
import Image from "next/image";
import { DEFAULT_EMPTY_PRODUCT_IMAGE } from "@/lib/constants";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  size?: number;
  type?: ProductType;
};
const ProductImage = ({
  src,
  className,
  size = ProductSize.DEFAULT,
  alt,
  type = ProductType.SIMPLE,
}: ProductImageProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        loading="lazy"
        overrideSrc={DEFAULT_EMPTY_PRODUCT_IMAGE}
        quality={80}
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          {
            "w-[300px] h-[300px]":
              !size ||
              (!!size &&
                (size === ProductSize.SMALL || size === ProductSize.DEFAULT)),
            "w-[400px] h-[400px]": !!size && size === ProductSize.MEDIUM,
            "w-[500px] h-[500px]": !!size && size === ProductSize.BIG,
          },
        )}
      />
      {type === ProductType.PIZA && (
        <>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
        </>
      )}
    </div>
  );
};

export default ProductImage;
