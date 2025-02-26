import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { DEFAULT_LOCALE } from "@/lib/constants";
import { RootState } from "@/lib/redux/store";
import { getLocaleFromCookie, setLocaleToCookie } from "@/actions/commonAction";

type commonSlicerType = {
  locale: string;
};
export const initialState: commonSlicerType = {
  locale: DEFAULT_LOCALE,
};

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const commonSlicer = createAppSlice({
  name: "common",
  initialState,
  reducers: (create) => ({
    fetchLocale: create.asyncThunk(
      async () => {
        return await getLocaleFromCookie();
      },
      {
        fulfilled: (state, action) => {
          state.locale = action.payload;
        },
      },
    ),
    setLocale: create.asyncThunk(
      async (locale: string) => {
        return await setLocaleToCookie(locale);
      },
      {
        fulfilled: (state, action) => {
          state.locale = action.payload;
        },
      },
    ),
  }),
});

export const selectCommon = (state: RootState) => state.common;

export const { actions, reducer } = commonSlicer;

export const { setLocale, fetchLocale } = actions;
