import Image from "next/image";

const CLASSES = [
  {
    name: "Legendary",
    count: 6,
    text: "Six singular material studies, each with its own visual construction.",
    hero: "/images/slasher-class-legendary.png",
    images: ["/nft/slash_001.png", "/nft/slash_014.png", "/nft/slash_015.png"],
  },
  {
    name: "Rare",
    count: 12,
    text: "Blueprint, Classwork, and Mosaic systems across light and dark states.",
    hero: "/images/slasher-class-rare.png",
    images: ["/nft/slash_002.png", "/nft/slash_006.png", "/nft/slash_010.png", "/nft/slash_013.png"],
  },
  {
    name: "Common",
    count: 24,
    text: "The core grammar: single or double marks, cut in light or darkness.",
    images: ["/nft/slash_020.png", "/nft/slash_025.png", "/nft/slash_030.png", "/nft/slash_035.png", "/nft/slash_040.png", "/nft/slash_045.png"],
  },
  {
    name: "Total",
    count: 42,
    text: "A complete, finite visual index with every supplied artwork represented.",
    images: [
      "/nft/slash_001.png",
      "/nft/slash_002.png",
      "/nft/slash_006.png",
      "/nft/slash_010.png",
      "/nft/slash_014.png",
      "/nft/slash_015.png",
      "/nft/slash_020.png",
      "/nft/slash_030.png",
      "/nft/slash_040.png",
    ],
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
              {item.hero ? (
                <Image alt={`${item.name} class editorial slash composition`} fill sizes="(max-width: 768px) 100vw, 38vw" src={item.hero} />
              ) : null}
              <div className="object-class__nfts">
                {item.images.map((image, imageIndex) => (
                  <Image
                    alt={`${item.name} SLASHER artwork ${imageIndex + 1}`}
                    fill
                    key={image}
                    sizes="(max-width: 768px) 30vw, 12vw"
                    src={image}
                  />
                ))}
              </div>
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
