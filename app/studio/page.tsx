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
          <h1>A mark becomes a system.</h1>
          <p>Angle, count, grid, surface, and contrast are calibrated before a slash enters the collection.</p>
        </div>
        <div className="studio-hero__image">
          <Image alt="SLASHER campaign banner with layered diagonal marks" fill priority sizes="(max-width: 768px) 100vw, 60vw" src="/images/slasher-banner.png" />
        </div>
      </section>

      <section className="studio-process page-frame reveal">
        <h2>From one gesture to 42 states.</h2>
        <div>
          <article><strong>Gesture</strong><p>Every piece begins with the same uncompromising diagonal cut.</p></article>
          <article><strong>System</strong><p>Single and double marks establish the collection&apos;s core rhythm.</p></article>
          <article><strong>Surface</strong><p>Grid, mosaic, blueprint, type, plastic, and wood treatments create deviation.</p></article>
          <article><strong>Registration</strong><p>A final slash receives its own index, traits, and future provenance on Solana.</p></article>
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
