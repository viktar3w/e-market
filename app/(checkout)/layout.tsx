import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import CheckoutHeader from "@/components/shared/header/CheckoutHeader";
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
