import { createSlice } from '@reduxjs/toolkit';

import { CART_LOCALSTORAGE } from '@/lib/constants';
import { cartApi } from '@/lib/redux/api/cart.api';
import { RootState } from '@/lib/redux/store';
import { CartItemState } from '@/lib/types/cart';

type CartSlicerType = {
  cart: {
    totalAmount: number;
    cartItems: CartItemState[];
    qty: number;
    loading: boolean;
  };
};

export const initialState: CartSlicerType = {
  cart: {
    totalAmount: 0,
    cartItems: [],
    qty: 0,
    loading: false,
  },
};
const cartSlicer = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(cartApi.endpoints.getCart.matchPending, (state) => {
        state.cart.loading = true;
      })
      .addMatcher(cartApi.endpoints.getCart.matchRejected, (state) => {
        state.cart = initialState.cart;
        localStorage.setItem(CART_LOCALSTORAGE, JSON.stringify(state.cart));
      })
      .addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, action) => {
        state.cart.cartItems = action?.payload?.cartItems || [];
        state.cart.totalAmount = action?.payload?.totalAmount || 0;
        state.cart.qty = action?.payload?.qty || 0;
        state.cart.loading = false;
        localStorage.setItem(CART_LOCALSTORAGE, JSON.stringify(state.cart));
      });
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { actions, reducer } = cartSlicer;
