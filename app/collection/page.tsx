import { Suspense } from "react";
import Header from "@/components/header";
import { Catalogue } from "@/components/objects/catalogue";
import { objects } from "@/data/objects";

export default function CollectionPage() {
  return (
    <main className="page-shell">
      <Header />
      <section className="collection-intro page-frame">
        <p className="eyebrow">Complete object register</p>
        <h1>Inspect the collection.</h1>
        <p>Filter by material, structure, class, or recorded state. All ownership and pricing values are sample interface data.</p>
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
