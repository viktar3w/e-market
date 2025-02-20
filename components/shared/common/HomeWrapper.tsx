"use client";

import { Suspense, useMemo } from "react";

import BoxWrapper from "@/components/shared/common/BoxWrapper";
import Title from "@/components/shared/common/Title";
import TopBar from "@/components/shared/common/TopBar";
import DefaultFilter from "@/components/shared/filters/DefaultFilter";
import ProductCartSkeleton from "@/components/shared/products/ProductCartSkeleton";
import ProductGroupList from "@/components/shared/products/ProductGroupList";
import { useCategories } from "@/hooks/useCategories";
import { CategoryProductParent } from "@/lib/types/product";
import { ItemVariation } from "@/lib/types/types";

const HomeWrapper = () => {
  const { categories } = useCategories();
  const topBarItems = useMemo(() => {
    return categories.map(
      (c) => ({ text: c?.name, value: c?.id }) as ItemVariation<string>,
    );
  }, [categories]);
  return (
    <>
      <BoxWrapper className="mt-10">
        <Title text="All Categories" size="lg" className="font-extrabold" />
      </BoxWrapper>
      <Suspense>
        <TopBar items={topBarItems} />
      </Suspense>
      <BoxWrapper className="mt-10 pb-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="w-full lg:w-[25%]">
            <Suspense>
              <DefaultFilter />
            </Suspense>
          </div>
          <div className="flex-1">
            <Suspense>
              <div className="flex flex-col gap-16">
                {categories.length === 0 ? (
                  <ProductCartSkeleton />
                ) : (
                  categories.map(
                    (category) =>
                      !!category && (
                        <ProductGroupList
                          key={category.id}
                          title={category?.name ?? ""}
                          categoryId={category.id}
                          products={
                            (category?.products?.items ||
                              []) as CategoryProductParent[]
                          }
                        />
                      ),
                  )
                )}
              </div>
            </Suspense>
          </div>
        </div>
      </BoxWrapper>
    </>
  );
};

export default HomeWrapper;
