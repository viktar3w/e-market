import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

import { QueryOptions } from "@apollo/client";

import ProductForm from "@/components/shared/products/ProductForm";
import {
  GetProductDocument,
  GetProductQuery,
  GetProductQueryVariables,
} from "@/documents/generates/hooks/apollo";
import { client } from "@/lib/apollo/client";
import { CategoryProductParent } from "@/lib/types/product";

type PageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export const generateMetadata = async (props: PageProps, parent: ResolvingMetadata): Promise<Metadata> => {
  const params = await props.params;
  const { data } = await client.query({
    ...({
      variables: {
        filter: {
          ids: [params.productId],
        },
      },
    } as QueryOptions<GetProductQueryVariables, GetProductQuery>),
    query: GetProductDocument,
  });
  const previousImages = (await parent).openGraph?.images || [];

  const product = (data?.products?.items?.[0] || {}) as CategoryProductParent;
  const productImages = product?.variants
    ?.filter((variant) => !!variant?.image)
    .map((variant) => variant.image!);

  return {
    title: `eMarket. ${product.name}`,
    openGraph: {
      title: `eMarket. ${product.name}`,
      images: [...productImages, ...previousImages],
    },
  };
};

const Page = async (props: PageProps) => {
  const params = await props.params;
  const { productId } = params;
  const { data, loading, error } = await client.query({
    ...({
      variables: {
        filter: {
          ids: [productId],
        },
      },
    } as QueryOptions<GetProductQueryVariables, GetProductQuery>),
    query: GetProductDocument,
  });
  if (loading) {
    return <></>;
  }
  if (!!error || !data?.products?.items?.[0]) {
    return notFound();
  }
  return <ProductForm product={data?.products?.items?.[0]} className="mt-20" />;
};

export default Page;
