import { ReactNode } from "react";
import DefaultHeader from "@/components/shared/header/DefaultHeader";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

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
      <DefaultHeader />
      <main className="min-h-screen">{children}</main>
      <Toaster />
    </>
  );
}
