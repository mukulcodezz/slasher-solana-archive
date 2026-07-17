const FAQS = [
  ["What is NTH/OBJECT?", "A fictional collection and product-design prototype for finite digital sculptures on Solana."],
  ["Which blockchain is used?", "The interface is designed around Solana and currently configured for devnet wallet connection."],
  ["What is the total supply?", "The proposed supply is 3,333 objects across four classes."],
  ["Which wallets are supported?", "Installed Wallet Standard wallets such as Phantom, Solflare, and Backpack can be discovered."],
  ["How much does minting cost?", "The interface displays a configurable preview price of 1.25 SOL. No real mint is connected."],
  ["Is every object unique?", "Each sample object has a unique token identity, composition, and trait combination."],
  ["Where can I verify the collection?", "Verification is unavailable until official collection and program addresses are configured."],
  ["What rights do holders receive?", "A final holder license requires qualified legal review before launch."],
  ["Does ownership guarantee financial returns?", "No. Ownership never guarantees price, liquidity, utility delivery, or financial return."],
  ["How do I avoid fake links?", "Use only configured official channels and verify the collection address before any signature request."],
  ["What happens if a transaction fails?", "No transaction exists in preview mode. A future integration must show failure and recovery honestly."],
  ["Will metadata change?", "Optional changes may be introduced only through clearly announced holder actions."],
  ["Where are official updates?", "Official social and community channels are currently unconfigured."],
];

export function FAQ() {
  return (
    <section className="faq page-frame reveal">
      <h2>Questions before registration.</h2>
      <div className="faq__list">
        {FAQS.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
