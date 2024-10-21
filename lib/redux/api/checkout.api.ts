import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CheckoutPlaceOrderSchema } from "@/lib/validations/checkout";
import { PlaceOrderType } from "@/lib/types/checkout";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "same-origin",
  }),
  tagTypes: ["Checkout"],
  endpoints: (builder) => ({
    placeOrder: builder.mutation<PlaceOrderType, CheckoutPlaceOrderSchema>({
      query: (body) => ({
        url: "checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Checkout", id: "LIST" }],
    }),
  }),
});

export const { usePlaceOrderMutation } = checkoutApi;
