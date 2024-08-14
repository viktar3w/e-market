import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/redux/store";
import { DEFAULT_CATEGORY_SCROLLED } from "@/lib/constants";

type CategoryState = {
  scrolledActiveCategory: number;
};
const initialState: CategoryState = {
  scrolledActiveCategory: DEFAULT_CATEGORY_SCROLLED,
};

const categorySlicer = createSlice({
  name: "category",
  initialState,
  reducers: {
    scrollCategory(state, action: PayloadAction<number>) {
      state.scrolledActiveCategory = action.payload;
    },
  },
});

export const selectCategory = (state: RootState) => state.category;

export const { actions, reducer } = categorySlicer;
