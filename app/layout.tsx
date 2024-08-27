import type { Metadata } from "next";
import { Reddit_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ReactNode } from "react";
import DefaultHeader from "@/components/shared/header/DefaultHeader";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/lib/providers";

const fontSans = Reddit_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <DefaultHeader />
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
