import Header from "@/components/header";
import { ArchiveNavigation } from "@/components/archive/archive-navigation";

const DOCUMENTS = [
  {
    id: "project",
    title: "Project",
    items: [
      ["Collection overview", "NTH/OBJECT is a proposed archive of 3,333 designed digital sculptures across four object classes."],
      ["Art system", "Objects are assembled from controlled structures, materials, surfaces, backgrounds, and deviations."],
      ["Trait framework", "Traits describe the visible object system. They do not imply market value."],
      ["Provenance", "Official collection provenance is unavailable until production addresses and metadata are published."],
    ],
  },
  {
    id: "minting",
    title: "Minting",
    items: [
      ["Wallet setup", "Use an installed Wallet Standard-compatible Solana wallet. Never share a seed phrase."],
      ["Mint process", "The current mint interface is a transaction-free preview. No program, signing, or payment is connected."],
      ["Fees", "Displayed SOL values and network fees are configurable examples, not live quotes."],
      ["Failed transactions", "A future integration must preserve clear rejected, cancelled, failed, paused, and sold-out states."],
    ],
  },
  {
    id: "solana",
    title: "Solana",
    items: [
      ["Collection address", "Unconfigured. Explorer actions remain disabled until a valid address is published."],
      ["Programs", "No mint program or transaction instruction is connected."],
      ["Metadata", "A production metadata standard and storage provider require final selection."],
      ["Marketplaces", "No marketplace verification or compatibility claim is active."],
    ],
  },
  {
    id: "holder",
    title: "Holder",
    items: [
      ["Utility", "Proposed utility focuses on creative archives, experiments, claims, and optional object changes."],
      ["License", "Personal and limited commercial terms require qualified legal drafting before launch."],
      ["Claims", "Any future claim must publish eligibility, timing, cost, and delivery limits in advance."],
      ["Voting", "Creative feedback does not represent formal DAO governance without deployed governance contracts."],
    ],
  },
  {
    id: "legal",
    title: "Legal",
    items: [
      ["Terms of use", "Educational placeholder only. This text is not final terms or legal advice."],
      ["Privacy", "Wallet connection remains client-side. No project server stores the connected address in this release."],
      ["Purchase terms", "No purchase or mint transaction is available."],
      ["Risk disclosure", "Digital assets can lose value and liquidity. Ownership does not guarantee financial return."],
    ],
  },
];

export default function ArchivePage() {
  return (
    <main className="page-shell">
      <Header />
      <section className="archive-hero page-frame">
        <p className="eyebrow">Public documentation</p>
        <h1>The project should be inspectable before the objects are.</h1>
        <p>Placeholder policy - obtain qualified legal review before launch.</p>
      </section>
      <div className="archive-layout page-frame">
        <ArchiveNavigation />
        <div className="archive-documents">
          {DOCUMENTS.map((category) => (
            <section id={category.id} key={category.id}>
              <h2>{category.title}</h2>
              {category.items.map(([title, content]) => (
                <details key={title}>
                  <summary>{title}</summary>
                  <p>{content}</p>
                </details>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
