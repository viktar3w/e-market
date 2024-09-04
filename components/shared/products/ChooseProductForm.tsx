"use client";
import { CategoryProductParent } from "@/lib/types/product";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import ProductImage from "@/components/shared/products/ProductImage";
import Title from "@/components/shared/common/Title";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { useProductVariants } from "@/hooks/useProductVariants";

type ChoosePizzaFormProps = {
  className?: string;
  product: CategoryProductParent;
  onSubmit?: () => void;
};
const ChooseProductForm = ({
  className,
  product,
  onSubmit,
}: ChoosePizzaFormProps) => {
  const {
    mainImage,
    groupedVariants,
    handleSizeClick,
    selectedOptions,
    activeVariant,
  } = useProductVariants(product);
  const textDetails =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam\n" +
    "            aut distinctio est expedita illo incidunt quibusdam sapiente sequi\n" +
    "            ullam?";
  return (
    <BoxWrapper className={cn("flex flex-col my-10", className)}>
      <div className="flex flex-1">
        <ProductImage
          alt={product.name}
          src={mainImage}
          size={
            !!selectedOptions?.size
              ? Number(selectedOptions?.size)
              : undefined
          }
          type={product.type}
        />
        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400 ">{textDetails}</p>
          {Object.keys(groupedVariants).length > 0 && (
            <div className="p-4">
              {Object.keys(groupedVariants).map((option) => (
                <div
                  key={option}
                  className="flex justify-between bg-[#f3f3f7] rounded-3xl p-1 select-none"
                >
                  {!!groupedVariants[option] &&
                    Object.keys(groupedVariants[option]).map((variant) => (
                      <button
                        key={variant}
                        onClick={() => handleSizeClick(option, variant)}
                        className={cn(
                          "flex items-center justify-center cursor-pointer h-[30px] px-1 flex-1 rounded-3xl transition-all duration-400 text-sm",
                          {
                            "bg-white shadow":
                              selectedOptions?.[option] === variant,
                          },
                        )}
                      >
                        {variant}
                      </button>
                    ))}
                </div>
              ))}
            </div>
          )}
          <Button
            disabled={!!!activeVariant}
            loading={false}
            onClick={() => onSubmit?.()}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          >
            Add to cart{" "}
            {!!activeVariant?.price && formatPrice(activeVariant.price)}
          </Button>
        </div>
      </div>
    </BoxWrapper>
  );
};

export default ChooseProductForm;
