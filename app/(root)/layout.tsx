import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script'

import DefaultHeader from "@/components/shared/header/DefaultHeader";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import DefaultFooter from "@/components/shared/footer/DefaultFooter";
import ServerWorker from "@/components/shared/common/ServerWorker";

export const metadata: Metadata = {
  title: "eMarket. This is Your best Market",
  description: "eMarket. This is Your best Market",
  keywords: ["ecommerce", "shop", "market", "products"],
  openGraph: {
    title: "eMarket. This is Your best Market",
    description: "eMarket. This is Your best Market",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <ServerWorker />
      <DefaultHeader />
      <main className="min-h-screen">{children}</main>
      <DefaultFooter />
      <Analytics />
      <Toaster />
      <Script async src="https://r1.ddlnk.net/DM-2038754442-01/ddgtag.js" strategy="lazyOnload" />
    </>
  );
}
