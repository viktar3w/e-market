"use client";
import { CategoryProductParent } from "@/lib/types/product";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import ProductImage from "@/components/shared/products/ProductImage";
import Title from "@/components/shared/common/Title";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { useProductVariants } from "@/hooks/useProductVariants";
import ProductComponent from "@/components/shared/products/ProductComponent";
import useProductComponents from "@/hooks/useProductComponents";
import useCalculateProduct from "@/hooks/useCalculateProduct";

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
  const { componentIds, addComponent } = useProductComponents(product);
  const { price, description, addProduct, isLoading } = useCalculateProduct(
    activeVariant,
    componentIds,
    product.components,
  );
  const handleAddProduct = () => {
    onSubmit?.();
    addProduct();
  };
  return (
    <BoxWrapper className={cn("flex flex-col my-10", className)}>
      <div className="flex flex-1">
        <ProductImage
          alt={product.name}
          src={mainImage}
          size={
            !!selectedOptions?.size ? Number(selectedOptions?.size) : undefined
          }
          type={product.type}
        />
        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400 ">{description}</p>
          {Object.keys(groupedVariants).length > 0 && (
            <div className="p-4">
              {Object.keys(groupedVariants).map((option) => (
                <div
                  key={option}
                  className="flex justify-between bg-[#f3f3f7] rounded-3xl p-1 select-none mt-5"
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
          {product.components.length > 0 && (
            <div className="bg-gray-50 p-5 rounded-md h-max-[420px] overflow-auto scrollbar">
              <div className="grid grid-cols-3 gap-3">
                {product.components.map((component) => (
                  <ProductComponent
                    key={component.id}
                    component={component}
                    onClick={() => addComponent(component.id)}
                    active={componentIds.has(component.id)}
                  />
                ))}
              </div>
            </div>
          )}
          <Button
            disabled={!activeVariant || isLoading}
            loading={isLoading}
            onClick={handleAddProduct}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          >
            Add to cart {!!activeVariant?.price && formatPrice(price)}
          </Button>
        </div>
      </div>
    </BoxWrapper>
  );
};

export default ChooseProductForm;
