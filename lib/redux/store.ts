import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as categorySlicer } from "@/lib/redux/slices/categorySlicer";
import { reducer as cartSlicer } from "@/lib/redux/slices/cartSlicer";
import { cartApi } from "@/lib/redux/api/cart.api";
import { checkoutApi } from "@/lib/redux/api/checkout.api";
import { supportApi } from "@/lib/redux/api/support.api";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  category: categorySlicer,
  cart: cartSlicer,
  [cartApi.reducerPath]: cartApi.reducer,
  [checkoutApi.reducerPath]: checkoutApi.reducer,
  [supportApi.reducerPath]: supportApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartApi.middleware,
      checkoutApi.middleware,
      supportApi.middleware,
    ),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
