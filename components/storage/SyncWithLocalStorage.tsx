"use client";
import { useEffect } from "react";
import { CART_LOCALSTORAGE } from "@/lib/constants";
import { cartApi } from "@/lib/redux/api/cart.api";
import { useAppDispatch } from "@/hooks/redux";
const SyncWithLocalStorage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CART_LOCALSTORAGE) {
        dispatch(cartApi.endpoints.getCart.initiate(undefined, {forceRefetch: true}));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);
  return null;
};

export default SyncWithLocalStorage;
