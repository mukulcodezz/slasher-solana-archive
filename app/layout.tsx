import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "The slasher",
  description: "Modern Solana NFT collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full`}
    >
      <body
          className="min-h-full flex flex-col bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/background-image.png')" }}
      ><Providers>{children}</Providers></body>
    </html>
  );
}
