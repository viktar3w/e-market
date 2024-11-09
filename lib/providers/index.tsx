"use client";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/lib/redux/store";
import { ClerkProvider } from "@clerk/nextjs";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider afterSignOutUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clerk/redirect`}>
      <Provider store={store}>{children}</Provider>
    </ClerkProvider>
  );
};
