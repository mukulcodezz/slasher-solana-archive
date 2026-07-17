import type { Metadata } from "next";
import { SecurityLabel } from "@/components/layout/security-label";
import { SiteFooter } from "@/components/layout/site-footer";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://slasher.example"),
  title: {
    default: "SLASHER | One mark. Forty-two states.",
    template: "%s | SLASHER",
  },
  description: "A finite archive of 42 diagonal mark studies with a transaction-free Solana wallet preview.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "SLASHER | One mark. Forty-two states.",
    description: "A finite archive of 42 diagonal mark studies with a transaction-free Solana wallet preview.",
    type: "website",
    images: [{ url: "/images/slasher-banner.png", width: 1536, height: 1024, alt: "SLASHER campaign banner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SLASHER | One mark. Forty-two states.",
    description: "A finite archive of 42 diagonal mark studies on Solana.",
    images: ["/images/slasher-banner.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWorkSeries",
  name: "SLASHER",
  description: "A finite archive of 42 diagonal mark studies designed for Solana.",
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
          type="application/ld+json"
        />
        <Providers>
          {children}
          <SiteFooter />
          <SecurityLabel />
        </Providers>
      </body>
    </html>
  );
}
