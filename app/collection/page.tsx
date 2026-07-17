import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { Catalogue } from "@/components/objects/catalogue";
import { objects } from "@/data/objects";

export default function CollectionPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="collection-intro page-frame">
        <p className="eyebrow">Complete 42-piece register</p>
        <h1>Inspect the collection.</h1>
        <p>Every supplied Slasher artwork is here. Filter by rarity, slash count, theme, or visual series.</p>
      </section>
      <Suspense fallback={<CatalogueSkeleton />}>
        <Catalogue objects={objects} />
      </Suspense>
    </main>
  );
}

function CatalogueSkeleton() {
  return (
    <div className="catalogue-skeleton page-frame" aria-label="Loading collection">
      {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
    </div>
  );
}
