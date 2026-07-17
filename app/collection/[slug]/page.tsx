import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import { GlassMeter } from "@/components/meters/glass-meter";
import { ObjectCard } from "@/components/objects/object-card";
import { ObjectViewer } from "@/components/objects/object-viewer";
import { getObjectBySlug, objects } from "@/data/objects";

export function generateStaticParams() {
  return objects.map((object) => ({ slug: object.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const object = getObjectBySlug((await params).slug);
  return object ? {
    title: `${object.name} / ${String(object.id).padStart(4, "0")}`,
    description: object.description,
  } : { title: "Object not found" };
}

export default async function ObjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const object = getObjectBySlug((await params).slug);
  if (!object) notFound();

  const index = objects.findIndex((item) => item.id === object.id);
  const previous = objects[(index - 1 + objects.length) % objects.length];
  const next = objects[(index + 1) % objects.length];
  const related = objects.filter((item) => item.id !== object.id && item.material === object.material).slice(0, 2);

  return (
    <main className="page-shell">
      <Header />
      <div className="object-detail page-frame">
        <ObjectViewer image={object.image} name={object.name} />
        <aside className="object-detail__data">
          <p className="mono-label">Object / {String(object.id).padStart(4, "0")}</p>
          <h1>{object.name}</h1>
          <p className="object-detail__description">{object.description}</p>
          <dl className="trait-table">
            {object.traits.map((trait) => (
              <div key={trait.type}><dt>{trait.type}</dt><dd>{trait.value}</dd></div>
            ))}
            <div><dt>Class</dt><dd>{object.rarity}</dd></div>
            <div><dt>State</dt><dd>{object.state}</dd></div>
            <div><dt>Owner</dt><dd>Sample data not configured</dd></div>
            <div><dt>Mint address</dt><dd>Unconfigured</dd></div>
            <div><dt>Metadata URI</dt><dd>Unconfigured</dd></div>
            <div><dt>Creator royalty</dt><dd>5% proposed</dd></div>
          </dl>
          <GlassMeter display="76%" label="Object integrity" tone="signal" value={76} />
          <p className="integrity-note">Project interface metric for metadata completeness. Not an on-chain security score.</p>
          <div className="object-detail__actions">
            <button disabled type="button">Explorer unavailable</button>
            <button onClick={undefined} type="button">Copy page link</button>
          </div>
        </aside>
      </div>

      <nav className="object-pagination page-frame" aria-label="Object navigation">
        <Link href={`/collection/${previous.slug}`}>Previous: {previous.name}</Link>
        <Link href={`/collection/${next.slug}`}>Next: {next.name}</Link>
      </nav>

      {related.length ? (
        <section className="related-objects page-frame">
          <h2>Related material studies</h2>
          <div className="object-grid">
            {related.map((item) => <ObjectCard key={item.id} object={item} />)}
          </div>
        </section>
      ) : null}
    </main>
  );
}
