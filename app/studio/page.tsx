import Image from "next/image";
import Header from "@/components/header";
import { DisclosurePanel } from "@/components/archive/disclosure-panel";

const ROLES = ["Creative Director", "3D Artist", "Solana Engineer", "Product Designer", "Community Lead"];

export default function StudioPage() {
  return (
    <main className="page-shell">
      <Header />
      <section className="studio-hero page-frame">
        <div>
          <p className="eyebrow">The Studio</p>
          <h1>Objects begin as systems.</h1>
          <p>Form, material, surface, and anomaly are calibrated before an object enters the collection.</p>
        </div>
        <div className="studio-hero__image">
          <Image alt="A collection of industrial sculpture studies on a dark stage" fill priority sizes="(max-width: 768px) 100vw, 60vw" src="/images/nth-object-signal.png" />
        </div>
      </section>

      <section className="studio-process page-frame reveal">
        <h2>From controlled rules to individual state.</h2>
        <div>
          <article><strong>Structure</strong><p>Each object starts with a load, frame, void, fold, vessel, or orbit.</p></article>
          <article><strong>Material</strong><p>Ceramic, carbon, glass, chrome, paper, and unknown systems define physical logic.</p></article>
          <article><strong>Deviation</strong><p>Controlled anomalies move an object beyond the foundational class.</p></article>
          <article><strong>Registration</strong><p>A final object receives identity, metadata, and public provenance on Solana.</p></article>
        </div>
      </section>

      <section className="studio-roles page-frame reveal">
        <h2>Contributor structure</h2>
        <div>{ROLES.map((role) => <span key={role}>{role}<small>Role unassigned</small></span>)}</div>
      </section>

      <section className="transparency page-frame reveal">
        <h2>Transparency record</h2>
        <div className="transparency__grid">
          <DisclosurePanel label="Identity status" status="Pending">Contributor identities have not been published.</DisclosurePanel>
          <DisclosurePanel label="Contract review" status="Not applicable">No production mint program is connected.</DisclosurePanel>
          <DisclosurePanel label="Treasury policy" status="Pending">A treasury address and use policy require publication before launch.</DisclosurePanel>
          <DisclosurePanel label="Royalty structure" status="Pending">The interface proposes 5%, subject to final configuration and legal review.</DisclosurePanel>
          <DisclosurePanel label="Metadata mutability" status="Pending">Optional evolution rules require a public technical policy.</DisclosurePanel>
          <DisclosurePanel label="Storage provider" status="Pending">Production media and metadata storage are not selected.</DisclosurePanel>
          <DisclosurePanel label="Legal entity" status="Pending">No legal entity is represented by this prototype.</DisclosurePanel>
        </div>
      </section>
    </main>
  );
}
