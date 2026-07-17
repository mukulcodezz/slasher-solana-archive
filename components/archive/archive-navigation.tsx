const CATEGORIES = ["Project", "Minting", "Solana", "Holder", "Legal"];

export function ArchiveNavigation() {
  return (
    <nav className="archive-navigation" aria-label="Documentation categories">
      {CATEGORIES.map((category) => <a href={`#${category.toLowerCase()}`} key={category}>{category}</a>)}
    </nav>
  );
}
