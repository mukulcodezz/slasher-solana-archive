import { describe, expect, it } from "vitest";
import type { NftObject } from "../types/project";
import { filterObjects, sortObjects } from "./catalogue";

const sample: NftObject[] = [
  {
    id: 3,
    slug: "blueprint-slash-003",
    name: "Blueprint Slash",
    image: "/nft/slash_003.png",
    rarity: "Rare",
    slashCount: "Single",
    theme: "Dark",
    series: "Blueprint",
    traits: [],
    priceSol: 0.1,
    description: "A single dark Blueprint edition.",
    composition: "contained",
  },
  {
    id: 1,
    slug: "arthouse-slash-001",
    name: "Arthouse Slash",
    image: "/nft/slash_001.png",
    rarity: "Legendary",
    slashCount: "Single",
    theme: "Dark",
    series: "Arthouse",
    traits: [],
    priceSol: 0.15,
    description: "The holographic Arthouse edition.",
    composition: "cropped",
  },
  {
    id: 50,
    slug: "light-double-slash-050",
    name: "Light Double Slash 1",
    image: "/nft/slash_050.png",
    rarity: "Common",
    slashCount: "Double",
    theme: "Light",
    series: "Core",
    traits: [],
    priceSol: 0.05,
    description: "A double light Core edition.",
    composition: "offset",
  },
];

describe("filterObjects", () => {
  it("combines search and rarity filters", () => {
    expect(filterObjects(sample, { search: "blueprint", rarities: ["Rare"] })).toHaveLength(1);
  });

  it("matches slash count and theme", () => {
    expect(filterObjects(sample, { slashCounts: ["Double"], themes: ["Light"] })[0].id).toBe(50);
  });
});

describe("sortObjects", () => {
  it("sorts by token id without mutating input", () => {
    const original = [...sample];
    expect(sortObjects(sample, "token-desc")[0].id).toBe(50);
    expect(sample).toEqual(original);
  });

  it("sorts Legendary before Rare and Common", () => {
    expect(sortObjects(sample, "rarity").map((object) => object.rarity)).toEqual(["Legendary", "Rare", "Common"]);
  });
});
