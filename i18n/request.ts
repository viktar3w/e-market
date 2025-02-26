import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE_KEY } from "@/lib/constants";

export default getRequestConfig(async () => {
  const storeCookies = await cookies();
  const locale = storeCookies.get(LOCALE_COOKIE_KEY)?.value || DEFAULT_LOCALE;
  return {
    locale,
    messages: (await import(`../documents/translates/${locale}.json`)).default,
  };
});
