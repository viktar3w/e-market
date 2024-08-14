import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as categorySlicer } from "@/lib/redux/slices/categorySlicer";

const rootReducer = combineReducers({
  category: categorySlicer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
