"use client";
import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";

import Title from "@/components/shared/common/Title";
import ProductCart from "@/components/shared/products/ProductCart";
import { useAppDispatch } from "@/hooks/redux";
import { DEFAULT_EMPTY_PRODUCT_IMAGE } from "@/lib/constants";
import { actions } from "@/lib/redux/slices/categorySlicer";
import { CategoryProductParent } from "@/lib/types/product";
import { cn, getMinimumPrice } from "@/lib/utils";

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
      <div className={cn("grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8", listClassName)}>
        {products.map((product) => (
          <ProductCart
            key={product.id}
            id={product.id}
            name={product.name}
            price={getMinimumPrice(product.variants)}
            image={product.image || DEFAULT_EMPTY_PRODUCT_IMAGE}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGroupList;
