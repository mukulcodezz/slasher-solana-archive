import Link from "next/link";
import { GlassMeter } from "@/components/meters/glass-meter";

export function FinalCta() {
  return (
    <section className="final-cta page-frame reveal">
      <div className="final-cta__meter">
        <GlassMeter display="READY" label="Interface state" tone="signal" value={82} />
      </div>
      <div className="final-cta__copy">
        <h2>Register an object on Solana.</h2>
        <p>Explore the collection or test the transaction-free mint interface.</p>
        <div>
          <Link className="primary-action" href="/mint">Open preview</Link>
          <Link className="secondary-action" href="/collection">Enter collection</Link>
        </div>
      </div>
    </section>
  );
}
