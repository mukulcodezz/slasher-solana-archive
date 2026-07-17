import Image from "next/image";
import Link from "next/link";
import { GlassMeter } from "@/components/meters/glass-meter";

export function Hero() {
  return (
    <section className="hero page-frame">
      <div className="hero__copy">
        <p className="eyebrow">42 marks on Solana</p>
        <h1>SLASHER</h1>
        <p>One diagonal gesture, cut into 42 distinct states of light, grid, texture, and distortion.</p>
        <div className="hero__actions">
          <Link className="primary-action" href="/collection">Enter collection</Link>
          <Link className="secondary-action" href="/mint">Preview mint</Link>
        </div>
      </div>
      <div className="hero__visual">
        <Image
          alt="SLASHER campaign banner featuring layered diagonal marks"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          src="/images/slasher-banner.png"
        />
        <div className="hero__meter">
          <GlassMeter display="42" label="Finite supply" tone="signal" value={82} />
        </div>
      </div>
    </section>
  );
}
