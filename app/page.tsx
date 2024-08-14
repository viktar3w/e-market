import Title from "@/components/shared/common/Title";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import TopBar from "@/components/shared/common/TopBar";
import DefaultFilter from "@/components/shared/filters/DefaultFilter";
import ProductGroupList from "@/components/shared/products/ProductGroupList";
import { PRODUCTS } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <BoxWrapper className="mt-10">
        <Title text="All Food" size="lg" className="font-extrabold" />
      </BoxWrapper>
      <TopBar />
      <BoxWrapper className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <DefaultFilter />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductGroupList
                title="Food"
                categoryId={1}
                products={PRODUCTS}
              />
              <ProductGroupList
                title="Cars"
                categoryId={2}
                products={PRODUCTS}
              />
            </div>
          </div>
        </div>
      </BoxWrapper>
    </>
  );
}
