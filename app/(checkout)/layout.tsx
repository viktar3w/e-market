import { ReactNode } from "react";

import CheckoutHeader from "@/components/shared/header/CheckoutHeader";
import { Toaster } from "@/components/ui/toaster";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "e-Market | Checkout",
  description: "Checkout e-Market",
};

const CheckoutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CheckoutHeader />
      <main className="min-h-screen bg-[#F4F1EE]">{children}</main>
      <Toaster />
    </>
  );
};
export default CheckoutLayout;
