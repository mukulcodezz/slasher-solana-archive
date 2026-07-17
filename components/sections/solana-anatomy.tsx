const STEPS = [
  "Wallet signature",
  "Mint instruction",
  "Solana confirmation",
  "Metadata registration",
  "Object ownership",
];

export function SolanaAnatomy() {
  return (
    <section className="solana-anatomy reveal">
      <div className="page-frame solana-anatomy__inner">
        <div className="solana-anatomy__copy">
          <h2>Built for immediate ownership.</h2>
          <p>Fast settlement, low transaction costs, public provenance, composable metadata, and wallet-native control.</p>
          <p className="technical-note">Future transaction anatomy. Timing is never guaranteed, and this preview does not submit instructions.</p>
        </div>
        <ol className="transaction-trace">
          {STEPS.map((step, index) => (
            <li key={step} style={{ "--step": index } as React.CSSProperties}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
        <dl className="chain-config">
          <div><dt>Collection address</dt><dd>Unconfigured</dd></div>
          <div><dt>Mint program</dt><dd>Unconfigured</dd></div>
          <div><dt>Treasury</dt><dd>Unconfigured</dd></div>
          <div><dt>Royalty</dt><dd>5% proposed</dd></div>
          <div><dt>Metadata standard</dt><dd>Pending selection</dd></div>
          <div><dt>RPC provider</dt><dd>Public devnet endpoint</dd></div>
        </dl>
      </div>
    </section>
  );
}
