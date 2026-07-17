import Image from "next/image";
import Link from "next/link";
import { GlassMeter } from "@/components/meters/glass-meter";

export function Hero() {
  return (
    <section className="hero page-frame">
      <div className="hero__copy">
        <p className="eyebrow">Solana object archive</p>
        <h1>NTH/<br />OBJECT</h1>
        <p>Finite digital sculptures with inspectable identity, material, and public state.</p>
        <div className="hero__actions">
          <Link className="primary-action" href="/collection">Enter collection</Link>
          <Link className="secondary-action" href="/mint">Preview mint</Link>
        </div>
      </div>
      <div className="hero__visual">
        <Image
          alt="A folded black carbon, ceramic, and smoked glass sculpture"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          src="/images/nth-object-hero.png"
        />
        <div className="hero__meter">
          <GlassMeter display="3,333" label="Finite supply" tone="signal" value={68} />
        </div>
      </div>
    </section>
  );
}
