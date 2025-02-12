'use client';

import { useMemo } from 'react';
import { useSet } from 'react-use';

import { useGetComponentsQuery } from '@/documents/generates/hooks/apollo';

export const useComponents = (ids: string[]) => {
  const { data, loading, error } = useGetComponentsQuery({
    variables: {},
  });
  const [selectedIds, { toggle }] = useSet(new Set<string>(ids));
  return useMemo(() => {
    return {
      addId: toggle,
      selectedIds,
      error,
      loading,
      components: data?.components?.filter((component) => !!component) || [],
    };
  }, [toggle, selectedIds, error, loading, data]);
};
