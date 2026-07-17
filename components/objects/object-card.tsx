import Image from "next/image";
import Link from "next/link";
import type { NftObject } from "@/types/project";

export function ObjectCard({ object, mode = "grid" }: { object: NftObject; mode?: "grid" | "list" }) {
  return (
    <Link className={`object-card object-card--${mode} object-card--${object.composition}`} href={`/collection/${object.slug}`}>
      <div className="object-card__media">
        <Image
          alt={`${object.name}, a ${object.theme.toLowerCase()} ${object.slashCount.toLowerCase()} mark from SLASHER`}
          fill
          sizes={mode === "list" ? "240px" : "(max-width: 768px) 100vw, 33vw"}
          src={object.image}
        />
      </div>
      <div className="object-card__body">
        <div>
          <h2>{object.name}</h2>
          <span>/{String(object.id).padStart(4, "0")}</span>
        </div>
        <p>{object.description}</p>
        <dl>
          <div><dt>Rarity</dt><dd>{object.rarity}</dd></div>
          <div><dt>Mark</dt><dd>{object.slashCount}</dd></div>
          <div><dt>Theme</dt><dd>{object.theme}</dd></div>
          <div><dt>Value</dt><dd>{object.priceSol ? `${object.priceSol} SOL` : "Not listed"}</dd></div>
        </dl>
      </div>
    </Link>
  );
}
