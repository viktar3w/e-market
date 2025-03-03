"use server";

import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE_KEY } from "@/lib/constants";

export const setLocaleToCookie = async (locale: string) => {
  const storeCookies = await cookies();
  storeCookies.set(LOCALE_COOKIE_KEY, locale);
  return locale;
};
export const getLocaleFromCookie = async () => {
  const storeCookies = await cookies();
  return storeCookies.get(LOCALE_COOKIE_KEY)?.value || DEFAULT_LOCALE;
};
