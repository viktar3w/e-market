import { Reddit_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/lib/providers";
import SyncWithLocalStorage from "@/components/storage/SyncWithLocalStorage";
import { getMessages, getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const fontSans = Reddit_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});
export default async function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <Providers>
      <html lang={locale}>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <>
            <SyncWithLocalStorage />
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </>
        </body>
      </html>
    </Providers>
  );
}
