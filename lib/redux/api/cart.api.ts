import { createApi } from '@reduxjs/toolkit/query/react';

import {
  GetCartDocument,
  AddCartItemDocument,
  UpdateCartItemDocument,
  DeleteCartItemDocument,
  UpdatePersonalDataDocument,
  AddShippingAddressDocument,
  UpdateShippingAddressDocument,
} from '@/documents/generates/hooks/apollo';
import { client } from '@/lib/apollo/client';
import { apolloBaseQuery, GraphQLRequest } from '@/lib/redux/base-queries/apollo';
import { CartState } from '@/lib/types/cart';
import { ResultResponse } from '@/lib/types/types';
import { CartIdRequest, CartRequest, CartUpdateRequest } from '@/lib/validations/cart';
import { CheckoutDeliverySchema, CheckoutPersonalDataSchema } from '@/lib/validations/checkout';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: apolloBaseQuery(client),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<CartState, void>({
      query: () =>
        ({
          document: GetCartDocument,
          options: {
            fetchPolicy: 'no-cache',
          },
        }) as GraphQLRequest,
      transformResponse: (response: any) => {
        return response.cart;
      },
      providesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    addCartItem: builder.mutation<ResultResponse, CartRequest>({
      query: (body) =>
        ({
          document: AddCartItemDocument,
          options: {
            variables: {
              input: body,
            },
          },
          isMutation: true,
        }) as GraphQLRequest,
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    updateCartItem: builder.mutation<ResultResponse, CartUpdateRequest>({
      query: (body) =>
        ({
          document: UpdateCartItemDocument,
          options: {
            variables: {
              input: {
                itemId: body.id,
                qty: body.qty,
              },
            },
          },
          isMutation: true,
        }) as GraphQLRequest,
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    deleteCartItem: builder.mutation<ResultResponse, CartIdRequest>({
      query: (body) =>
        ({
          document: DeleteCartItemDocument,
          options: {
            variables: {
              input: {
                itemId: body.id,
              },
            },
          },
          isMutation: true,
        }) as GraphQLRequest,
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    updatePersonalData: builder.mutation<ResultResponse, CheckoutPersonalDataSchema>({
      query: (body) =>
        ({
          document: UpdatePersonalDataDocument,
          options: {
            variables: {
              input: body,
            },
          },
          isMutation: true,
        }) as GraphQLRequest,
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    addShippingAddress: builder.mutation<ResultResponse, CheckoutDeliverySchema>({
      query: (body) =>
        ({
          document: AddShippingAddressDocument,
          options: {
            variables: {
              input: body,
            },
          },
          isMutation: true,
        }) as GraphQLRequest,
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    updateShippingAddress: builder.mutation<ResultResponse, CheckoutDeliverySchema>({
      query: (body) =>
        ({
          document: UpdateShippingAddressDocument,
          options: {
            variables: {
              input: body,
            },
          },
          isMutation: true,
        }) as GraphQLRequest,
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
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
  useUpdateShippingAddressMutation,
} = cartApi;
