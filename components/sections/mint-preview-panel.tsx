import Link from "next/link";
import { GlassMeter } from "@/components/meters/glass-meter";
import { projectConfig } from "@/config/project";

export function MintPreviewPanel() {
  return (
    <section className="mint-preview-panel page-frame reveal">
      <div className="mint-preview-panel__status">
        <span>Registration instrument</span>
        <strong>PREVIEW ONLY</strong>
      </div>
      <div className="mint-preview-panel__main">
        <div>
          <h2>Registration without the fiction.</h2>
          <p>The interface is complete. The mint program is intentionally disconnected, so no action can request a signature.</p>
          <Link className="primary-action" href="/mint">Open mint preview</Link>
        </div>
        <dl>
          <div><dt>Price</dt><dd>{projectConfig.priceSol} SOL</dd></div>
          <div><dt>Maximum</dt><dd>{projectConfig.maxMint} objects</dd></div>
          <div><dt>Network</dt><dd>Solana devnet</dd></div>
          <div><dt>Program</dt><dd>Not connected</dd></div>
        </dl>
        <GlassMeter display="0 / 42" label="Registered" orientation="horizontal" value={0} />
      </div>
      <p className="demo-disclosure">Preview mode - mint program not connected.</p>
    </section>
  );
}
