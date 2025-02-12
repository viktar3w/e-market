import { createApi } from '@reduxjs/toolkit/query/react';

import { PlaceOrderDocument } from '@/documents/generates/hooks/apollo';
import { client } from '@/lib/apollo/client';
import { apolloBaseQuery, GraphQLRequest } from '@/lib/redux/base-queries/apollo';
import { PlaceOrderType } from '@/lib/types/checkout';
import { CheckoutPlaceOrderSchema } from '@/lib/validations/checkout';

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: apolloBaseQuery(client),
  tagTypes: ['Checkout'],
  endpoints: (builder) => ({
    placeOrder: builder.mutation<PlaceOrderType, CheckoutPlaceOrderSchema>({
      query: (body) =>
        ({
          document: PlaceOrderDocument,
          options: {
            variables: {
              input: body,
            },
          },
          isMutation: true,
        }) as GraphQLRequest,
      transformResponse: (response: any) => {
        return response?.cart?.placeOrder || { url: undefined };
      },
      invalidatesTags: [{ type: 'Checkout', id: 'LIST' }],
    }),
  }),
});

export const { usePlaceOrderMutation } = checkoutApi;
