"use client";

import { ApolloProvider } from "@apollo/client";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Provider } from "react-redux";

import { client } from "@/lib/apollo/client";
import { store } from "@/lib/redux/store";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      afterSignOutUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clerk/redirect`}
    >
      <ApolloProvider client={client}>
        <Provider store={store}>{children}</Provider>
      </ApolloProvider>
    </ClerkProvider>
  );
};
