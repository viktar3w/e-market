"use client";
import ProductCart from "@/components/shared/products/ProductCart";
import { cn } from "@/lib/utils";
import Title from "@/components/shared/common/Title";
import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { useAppDispatch } from "@/hooks/redux";
import { actions } from "@/lib/redux/slices/categorySlicer";
import { CategoryProductParent } from "@/lib/types/product";

type ProductGroupListProps = {
  categoryId: string;
  products: CategoryProductParent[];
  title?: string;
  className?: string;
  listClassName?: string;
};

const ProductGroupList = ({
  categoryId,
  products,
  title,
  listClassName,
  className,
}: ProductGroupListProps) => {
  const intRef = useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(intRef, {
    threshold: 0.4,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (intersection?.isIntersecting) {
      const categoryId = intersection.target.getAttribute("data-category");
      if (categoryId) {
        dispatch(actions.scrollCategory(categoryId));
      }
    }
  }, [dispatch, intersection?.isIntersecting, intersection?.target]);
  return (
    <div
      className={cn("", className)}
      id={`group-${categoryId}`}
      data-category={categoryId}
      ref={intRef}
    >
      {!!title && (
        <Title text={title} size="lg" className="font-extrabold mb-5" />
      )}
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {products.map((product) => (
          <ProductCart
            key={product.id}
            id={product.id}
            name={product.name}
            price={product?.variants?.[0]?.price || 0}
            image={product.image || "/default_product_img.png"}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGroupList;
