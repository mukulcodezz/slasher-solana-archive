import { GlassMeter } from "@/components/meters/glass-meter";

const CLASSES = [
  { name: "Standard", count: 2400, value: 72, text: "Foundational forms with restrained materials and stable geometries." },
  { name: "Distorted", count: 700, value: 42, text: "Objects affected by unusual structural deformation." },
  { name: "Prototype", count: 200, value: 24, text: "Experimental forms containing rare manufacturing systems." },
  { name: "Null", count: 33, value: 7, text: "Scarce exceptions that break the collection's normal visual rules." },
];

export function ObjectClasses() {
  return (
    <section className="object-classes page-frame reveal">
      <h2 className="section-title">Four levels of structural deviation.</h2>
      <div className="object-classes__grid">
        {CLASSES.map((item, index) => (
          <article className={`object-class object-class--${index + 1}`} key={item.name}>
            <GlassMeter display={item.count.toLocaleString()} label={item.name} tone={item.name === "Null" ? "signal" : "ink"} value={item.value} />
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
