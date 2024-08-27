"use client";
import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debounced, setDebounced] = useState<T>(value as T);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value as T), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};
