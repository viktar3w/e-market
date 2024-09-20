import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/lib/redux/store";
import { cartApi } from "@/lib/redux/api/cart.api";
import { CartItemState } from "@/lib/types/cart";
import { CART_LOCALSTORAGE } from "@/lib/constants";

type CartSlicerType = {
  cart: {
    totalAmount: number;
    cartItems: CartItemState[];
    qty: number;
  };
};

const initialState: CartSlicerType = {
  cart: {
    totalAmount: 0,
    cartItems: [],
    qty: 0,
  },
};
const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(cartApi.endpoints.getCart.matchPending, (state, action) => {
        console.log("cart matchPending: state", state);
        console.log("cart matchPending: action", action);
      })
      .addMatcher(cartApi.endpoints.getCart.matchRejected, (state) => {
        console.log("cart matchRejected: state", state);
      })
      .addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, action) => {
        state.cart.cartItems = action.payload.cartItems;
        state.cart.totalAmount = action.payload.totalAmount;
        state.cart.qty = action.payload.qty;
        localStorage.setItem(CART_LOCALSTORAGE, JSON.stringify(action.payload));
      });
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { actions, reducer } = cartSlicer;
