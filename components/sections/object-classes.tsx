import { GlassMeter } from "@/components/meters/glass-meter";

const CLASSES = [
  { name: "Legendary", count: 6, value: 100, text: "Six singular material studies, each with its own visual construction." },
  { name: "Rare", count: 12, value: 72, text: "Blueprint, Classwork, and Mosaic systems across light and dark states." },
  { name: "Common", count: 24, value: 42, text: "The core grammar: single or double marks, cut in light or darkness." },
  { name: "Total", count: 42, value: 82, text: "A complete, finite visual index with every supplied artwork represented." },
];

export function ObjectClasses() {
  return (
    <section className="object-classes page-frame reveal">
      <h2 className="section-title">Three rarities. One visual grammar.</h2>
      <div className="object-classes__grid">
        {CLASSES.map((item, index) => (
          <article className={`object-class object-class--${index + 1}`} key={item.name}>
            <GlassMeter display={item.count.toLocaleString()} label={item.name} tone={item.name === "Legendary" ? "signal" : "ink"} value={item.value} />
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
