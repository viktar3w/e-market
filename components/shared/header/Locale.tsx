"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchLocale,
  selectCommon,
  setLocale as setStoreLocale,
} from "@/lib/redux/slices/commonSlicer";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type LocaleProps = {
  className?: string;
};

const Locale = ({ className }: LocaleProps) => {
  const { locale: storeLocale } = useAppSelector(selectCommon);
  const dispatch = useAppDispatch();
  const [locale, setLocale] = useState<string>("");
  useEffect(() => {
    setLocale(storeLocale);
  }, [storeLocale]);
  useEffect(() => {
    dispatch(fetchLocale());
  }, []);
  return (
    <div className={cn(className)}>
      {!!locale && (
        <Select
          onValueChange={(lang) => dispatch(setStoreLocale(lang))}
          defaultValue={locale}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a your locale" />
          </SelectTrigger>
          <SelectContent>
            {["en", "fr", "ru"].map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default Locale;
