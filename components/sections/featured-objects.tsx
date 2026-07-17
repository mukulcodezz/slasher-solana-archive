import Link from "next/link";
import { ObjectCard } from "@/components/objects/object-card";
import { featuredObjects } from "@/data/objects";

export function FeaturedObjects() {
  return (
    <section className="featured page-frame reveal">
      <div className="featured__heading">
        <h2>Selected slashes</h2>
        <Link className="text-action" href="/collection">View complete catalogue</Link>
      </div>
      <div className="featured__grid">
        {featuredObjects.map((object) => <ObjectCard key={object.id} object={object} />)}
      </div>
    </section>
  );
}
