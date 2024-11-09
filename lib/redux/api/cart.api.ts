import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartState } from "@/lib/types/cart";
import { ResultResponse } from "@/lib/types/types";
import {
  CartIdRequest,
  CartRequest,
  CartUpdateRequest,
} from "@/lib/validations/cart";
import {
  CheckoutDeliverySchema,
  CheckoutPersonalDataSchema,
} from "@/lib/validations/checkout";

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
    addCartItem: builder.mutation<ResultResponse, CartRequest>({
      query: (body) => ({
        url: "cart",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updateCartItem: builder.mutation<ResultResponse, CartUpdateRequest>({
      query: (body) => ({
        url: "cart",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    deleteCartItem: builder.mutation<ResultResponse, CartIdRequest>({
      query(body) {
        return {
          url: "cart",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updatePersonalData: builder.mutation<
      ResultResponse,
      CheckoutPersonalDataSchema
    >({
      query(body) {
        return {
          url: "checkout",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    addShippingAddress: builder.mutation<
      ResultResponse,
      CheckoutDeliverySchema
    >({
      query(body) {
        return {
          url: "checkout",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const {
  useLazyGetCartQuery,
  useGetCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
  useAddCartItemMutation,
  useUpdatePersonalDataMutation,
  useAddShippingAddressMutation,
} = cartApi;
