import { ApolloClient, NormalizedCacheObject, QueryOptions, MutationOptions, DocumentNode } from '@apollo/client';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

export interface GraphQLRequest<TData = any, TVariables = any> {
  document: DocumentNode;
  options?: QueryOptions<TVariables, TData> | MutationOptions<TData, TVariables>;
  isMutation?: boolean;
}

export const apolloBaseQuery =
  (client: ApolloClient<NormalizedCacheObject>): BaseQueryFn<GraphQLRequest, unknown, unknown> =>
  async ({ document, options, isMutation }) => {
    try {
      const { mutate, query } = client;
      const result = isMutation
        ? await mutate({
            ...((options || {}) as MutationOptions<any, any>),
            mutation: document,
          })
        : await query({ ...((options || {}) as QueryOptions<any, any>), query: document });
      return { data: result.data, error: result.errors };
    } catch (error) {
      return { error };
    }
  };
