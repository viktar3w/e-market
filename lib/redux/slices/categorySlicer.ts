import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/redux/store";

type CategoryState = {
  scrolledActiveCategory?: string;
};
const initialState: CategoryState = {
  scrolledActiveCategory: undefined,
};

const categorySlicer = createSlice({
  name: "category",
  initialState,
  reducers: {
    scrollCategory(state, action: PayloadAction<string>) {
      state.scrolledActiveCategory = action.payload;
    },
  },
});

export const selectCategory = (state: RootState) => state.category;

export const { actions, reducer } = categorySlicer;
