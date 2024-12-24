import { ReactNode } from "react";

import DefaultHeader from "@/components/shared/header/DefaultHeader";
import { Toaster } from "@/components/ui/toaster";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "e-Market",
  description: "Generated e-Market",
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DefaultHeader />
      <main className="min-h-screen">{children}</main>
      <Toaster />
    </>
  );
};
export default DashboardLayout;
