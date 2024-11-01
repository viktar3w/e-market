"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Title from "@/components/shared/common/Title";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import TopBar from "@/components/shared/common/TopBar";
import DefaultFilter from "@/components/shared/filters/DefaultFilter";
import ProductGroupList from "@/components/shared/products/ProductGroupList";
import { useCategories } from "@/hooks/useCategories";
import ProductCartSkeleton from "@/components/shared/products/ProductCartSkeleton";
export default function Home() {
  const searchParams = useSearchParams();
  const { categories } = useCategories(searchParams.toString());
  return (
    <>
      <BoxWrapper className="mt-10">
        <Title text="All Food" size="lg" className="font-extrabold" />
      </BoxWrapper>
      <Suspense>
        <TopBar
          items={categories
            .filter((c) => c.products.length > 0)
            .map((c) => ({ text: c.name, value: c.id }))}
        />
      </Suspense>
      <BoxWrapper className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
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
                      category.products.length > 0 && (
                        <ProductGroupList
                          key={category.id}
                          title={category.name}
                          categoryId={category.id}
                          products={category.products}
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
}
