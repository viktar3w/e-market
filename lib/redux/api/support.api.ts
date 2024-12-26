import { SupportPlan } from '@prisma/client';
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
  tagTypes: ['Support_Default', 'Support_Categories', 'Support_Events', 'Support_Project'],
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
    createCheckoutSession: builder.mutation<{ url: string }, void>({
      query: () => ({
        url: 'payment/createCheckoutSession',
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Support_Default', id: 'LIST' }],
    }),
    getUserPlan: builder.query<{ plan: SupportPlan }, void>({
      query: () => ({
        url: 'payment/getUserPlan',
      }),
      providesTags: [{ type: 'Support_Default', id: 'LIST' }],
    }),
    getUsage: builder.query<
      {
        categoriesUsed: number;
        categoriesLimit: number;
        eventsUsed: number;
        eventsLimit: number;
        resetDate: Date;
      },
      void
    >({
      query: () => ({
        url: 'project/getUsage',
        responseHandler: async (response): Promise<EventByNameResponse> => {
          const data = await response.json();
          return (
            data?.json || {
              categoriesUsed: 0,
              categoriesLimit: 0,
              eventsUsed: 0,
              eventsLimit: 0,
              resetDate: new Date(),
            }
          );
        },
      }),
      providesTags: [{ type: 'Support_Project', id: 'LIST' }],
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
  useCreateCheckoutSessionMutation,
  useGetEventsByCategoryNameQuery,
  useGetUserPlanQuery,
  useGetUsageQuery,
} = supportApi;
