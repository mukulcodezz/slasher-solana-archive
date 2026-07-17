import Image from "next/image";

const CLASSES = [
  {
    name: "Legendary",
    count: 6,
    text: "Six singular material studies, each with its own visual construction.",
    image: "/nft/slash_001.png",
  },
  {
    name: "Rare",
    count: 12,
    text: "Blueprint, Classwork, and Mosaic systems across light and dark states.",
    image: "/nft/slash_010.png",
  },
  {
    name: "Common",
    count: 24,
    text: "The core grammar: single or double marks, cut in light or darkness.",
    image: "/nft/slash_050.png",
  },
  {
    name: "Total",
    count: 42,
    text: "A complete, finite visual index with every supplied artwork represented.",
    image: "/nft/slash_015.png",
  },
];

export function ObjectClasses() {
  return (
    <section className="object-classes page-frame reveal">
      <h2 className="section-title">Three rarities. One visual grammar.</h2>
      <div className="object-classes__grid">
        {CLASSES.map((item, index) => (
          <article className={`object-class object-class--${index + 1}`} key={item.name}>
            <div className="object-class__visual">
              <Image alt={`${item.name} representative SLASHER artwork`} fill sizes="(max-width: 768px) 100vw, 32vw" src={item.image} />
            </div>
            <div className="object-class__caption">
              <span>{item.name}</span>
              <strong>{item.count.toLocaleString()}</strong>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
