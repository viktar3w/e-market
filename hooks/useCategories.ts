'use client';
import { useSearchParams } from 'next/navigation';

import { useEffect, useMemo } from 'react';

import { useGetCategoriesLazyQuery } from '@/documents/generates/hooks/apollo';
import { prepareCategoryFilters } from '@/lib/utils';

export const useCategories = () => {
  const searchParams = useSearchParams();
  const [getCategories, { data, error, loading }] = useGetCategoriesLazyQuery();
  useEffect(() => {
    const variables = prepareCategoryFilters(searchParams);
    if (!loading) {
      getCategories?.({ variables });
    }
  }, [searchParams, getCategories, loading]);
  return useMemo(() => {
    return {
      error,
      loading,
      categories: (data?.categories?.items || []).filter((c) => !!c?.products?.items && c.products.items.length > 0),
    };
  }, [data]);
};
