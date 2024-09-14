import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VariantItem } from "@/lib/types/product";
import { CartState } from "@/lib/types/cart";

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
      {
        amount: number;
        variant: VariantItem;
        componentIds: Set<string>;
        qty: number;
      }
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
