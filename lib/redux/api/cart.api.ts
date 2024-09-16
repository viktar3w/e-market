import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartState } from "@/lib/types/cart";
import { CartRequest } from "@/lib/validations/cart";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "same-origin",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartState, void>({
      query: () => ({
        url: "cart",
      }),
      providesTags: [{ type: "Cart", id: "LIST" }],
    }),
    addCartItem: builder.mutation<
      {
        success: boolean;
      },
      CartRequest
    >({
      query: (body) => ({
        url: "cart",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updateCartItem: builder.mutation<
      {
        success: boolean;
      },
      {
        id: string;
        qty: number;
      }
    >({
      query: (body) => ({
        url: "cart",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    deleteCartItem: builder.mutation<{ success: boolean }, { id: string }>({
      query(body) {
        return {
          url: "cart",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
  useAddCartItemMutation,
} = cartApi;
