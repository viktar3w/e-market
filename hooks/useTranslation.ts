import { useTranslations } from "next-intl";

export const useTranslation = (namespace: string = "e-market") => {
  return useTranslations(namespace);
};
