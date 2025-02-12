import { notFound } from 'next/navigation';

import { QueryOptions } from '@apollo/client';

import ProductForm from '@/components/shared/products/ProductForm';
import {
  GetProductDocument,
  GetProductQuery,
  GetProductQueryVariables,
} from '@/documents/generates/hooks/apollo';
import { client } from '@/lib/apollo/client';

type PageProps = {
  params: {
    productId: string;
  };
};
const Page = async ({ params }: PageProps) => {
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
