import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { EventByNameRequest, EventByNameResponse } from '@/lib/types/support/event';
import { EventCategory } from '@/lib/types/support/event-category';
import { ResultResponse } from '@/lib/types/types';
import { SupportCategoryDeleteByNameRequest, SupportCreateEventCategoryRequest } from '@/lib/validations/support';

export const supportApi = createApi({
  reducerPath: 'supportApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/support/',
    credentials: 'same-origin',
  }),
  tagTypes: ['Support_Default', 'Support_Categories', 'Support_Events'],
  endpoints: (builder) => ({
    getDatabaseSyncStatus: builder.query<{ isSynced: boolean }, void>({
      query: () => ({
        url: 'auth/getDatabaseSyncStatus',
      }),
    }),
    getEventCategories: builder.query<{ categories: EventCategory[] }, void>({
      query: () => ({
        url: 'categories/getEventCategories',
        responseHandler: async (response) => {
          const data = await response.json();
          return data?.json || { categories: [] };
        },
      }),
      providesTags: [{ type: 'Support_Categories', id: 'LIST' }],
    }),
    pollCategory: builder.query<ResultResponse, SupportCategoryDeleteByNameRequest>({
      query: (body) => ({
        url: `categories/pollCategory?name=${body?.name}`,
      }),
      providesTags: [{ type: 'Support_Categories', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation<ResultResponse, SupportCategoryDeleteByNameRequest>({
      query: (body) => ({
        url: 'categories/deleteCategory',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Support_Categories', id: 'LIST' }],
    }),
    createEventCategory: builder.mutation<EventCategory, SupportCreateEventCategoryRequest>({
      query: (body) => ({
        url: 'categories/createEventCategory',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Support_Categories', id: 'LIST' }],
    }),
    insertQuickstartCategories: builder.mutation<{ count: number } & ResultResponse, void>({
      query: (body) => ({
        url: 'categories/insertQuickstartCategories',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Support_Categories', id: 'LIST' }],
    }),
    getEventsByCategoryName: builder.query<EventByNameResponse, EventByNameRequest>({
      query: (body) => {
        return {
          url: `categories/getEventsByCategoryName?${Object.keys(body)
            .map((key) => `${key}=${body[key]}`)
            .join('&')}`,
          responseHandler: async (response): Promise<EventByNameResponse> => {
            const data = await response.json();
            return data?.json || { events: [], eventsCount: 0, uniqueFieldCount: 0 };
          },
        };
      },
      providesTags: [{ type: 'Support_Events', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetDatabaseSyncStatusQuery,
  useGetEventCategoriesQuery,
  usePollCategoryQuery,
  useDeleteCategoryMutation,
  useCreateEventCategoryMutation,
  useInsertQuickstartCategoriesMutation,
  useGetEventsByCategoryNameQuery,
} = supportApi;
