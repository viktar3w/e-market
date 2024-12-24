import { Reddit_Mono } from 'next/font/google';

import './globals.css';
import { ReactNode } from 'react';

import SyncWithLocalStorage from '@/components/storage/SyncWithLocalStorage';
import { Providers } from '@/lib/providers';
import { cn } from '@/lib/utils';

const fontSans = Reddit_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <link data-rh="true" rel="icon" href="/logo.svg" />
        </head>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <>
            <SyncWithLocalStorage />
            {children}
          </>
        </body>
      </html>
    </Providers>
  );
}
