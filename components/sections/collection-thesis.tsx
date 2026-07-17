const PRINCIPLES = [
  { number: "01", title: "Finite", text: "A fixed supply with no silent expansion." },
  { number: "02", title: "Verifiable", text: "Ownership, metadata, and provenance can be inspected on Solana." },
  { number: "03", title: "Evolving", text: "Selected objects may unlock optional future visual states." },
];

export function CollectionThesis() {
  return (
    <section className="thesis page-frame reveal">
      <div className="thesis__statement">
        <h2>Designed objects, not profile pictures.</h2>
        <p>NTH/OBJECT treats every asset as a manufactured form. Structures, materials, surfaces, and anomalies belong to one controlled visual system.</p>
      </div>
      <div className="thesis__principles">
        {PRINCIPLES.map((principle) => (
          <article key={principle.number}>
            <span>{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
