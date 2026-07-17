"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WalletControl } from "@/components/wallet/wallet-control";

const NAV_ITEMS = [
  { href: "/collection", label: "Collection" },
  { href: "/mint", label: "Mint preview" },
  { href: "/studio", label: "Studio" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/doc", label: "Archive" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="NTH/OBJECT home">
          NTH<span>/</span>OBJECT
        </Link>

        <nav aria-label="Primary navigation" className="site-header__nav">
          {NAV_ITEMS.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <span className="network-label">SOL DEVNET</span>
          <WalletControl />
          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            className="menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav aria-label="Mobile navigation" className="mobile-navigation">
          {NAV_ITEMS.map((item) => (
            <Link href={item.href} key={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <div className="mobile-navigation__meta">
            <span>Finite objects. Public state.</span>
            <span>Preview environment</span>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
