import cookies from "js-cookie";
import { DEFAULT_LOCALE, LOCALE_COOKIE_KEY } from "@/lib/constants";

export const setLocaleToCookie = async (locale: string) => {
  cookies.set(LOCALE_COOKIE_KEY, locale);
  return locale;
};
export const getLocaleFromCookie = async () => {
  if (!!cookies.get(LOCALE_COOKIE_KEY)) {
    return cookies.get(LOCALE_COOKIE_KEY)!;
  }
  return DEFAULT_LOCALE;
};
