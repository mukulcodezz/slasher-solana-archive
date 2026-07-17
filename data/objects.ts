import nftSource from "@/components/nfts.json";
import type { NftObject, RarityClass, SlashCount, SlashSeries, SlashTheme } from "@/types/project";

const compositions: NftObject["composition"][] = ["contained", "cropped", "offset", "mirrored"];

function getId(image: string): number {
  return Number(image.match(/slash_(\d+)\.png$/)?.[1] ?? 0);
}

function getSeries(name: string, rarity: RarityClass): SlashSeries {
  if (rarity === "Common") return "Core";
  return name.split(" ")[0] as SlashSeries;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const objects: NftObject[] = nftSource.map((source, index) => {
  const id = getId(source.image);
  const [rarity, slashCount, theme] = source.tags as [RarityClass, SlashCount, SlashTheme];
  const series = getSeries(source.name, rarity);

  return {
    id,
    slug: `${slugify(source.name)}-${String(id).padStart(3, "0")}`,
    name: source.name,
    image: source.image,
    rarity,
    slashCount,
    theme,
    series,
    priceSol: source.price,
    description: `${theme} ${slashCount.toLowerCase()} mark from the ${series} series, preserved as one of 42 original Slasher studies.`,
    composition: compositions[index % compositions.length],
    traits: [
      { type: "Rarity", value: rarity },
      { type: "Slash count", value: slashCount },
      { type: "Theme", value: theme },
      { type: "Series", value: series },
    ],
  };
});

const featuredIds = new Set([1, 14, 15, 2, 6, 10]);
export const featuredObjects = objects.filter((object) => featuredIds.has(object.id));

export function getObjectBySlug(slug: string): NftObject | undefined {
  return objects.find((object) => object.slug === slug);
}
