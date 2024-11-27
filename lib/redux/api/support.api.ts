import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const supportApi = createApi({
  reducerPath: "supportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "same-origin",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getDatabaseSyncStatus: builder.query<{ isSynced: boolean }, void>({
      query: () => ({
        url: "auth/getDatabaseSyncStatus",
      }),

    }),
  }),
});

export const { useGetDatabaseSyncStatusQuery } = supportApi;
