import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import { Dialog } from "@/features/common/components/dialog";
import { QueryProvider } from "@/features/common/providers/query-provider";
import SessionProvider from "@/features/common/providers/session-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "promasys",
  description: "A project management system for indie hackers and small teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        />
      </head>
      <body className="antialiased">
        <SessionProvider>
          <QueryProvider>
            <Dialog />
            <Toaster />
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
