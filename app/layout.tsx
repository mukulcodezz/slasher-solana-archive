import type { Metadata } from "next";
import { SecurityLabel } from "@/components/layout/security-label";
import { SiteFooter } from "@/components/layout/site-footer";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://null-form.example"),
  title: {
    default: "NULL/FORM | Objects recorded on Solana",
    template: "%s | NULL/FORM",
  },
  description: "A finite archive of designed digital objects with a transaction-free Solana wallet preview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <SiteFooter />
          <SecurityLabel />
        </Providers>
      </body>
    </html>
  );
}
