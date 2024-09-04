import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "e-Market",
  description: "Generated e-Market",
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="min-h-screen">{children}</main>
      <Toaster />
    </>
  );
};
export default DashboardLayout;
