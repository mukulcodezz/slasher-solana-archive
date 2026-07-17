import { describe, expect, it } from "vitest";
import type { NftObject } from "../types/project";
import { filterObjects, sortObjects } from "./catalogue";

const sample: NftObject[] = [
  {
    id: 3,
    slug: "null-vessel",
    name: "Null Vessel",
    image: "/nft/slash_003.png",
    rarity: "Null",
    structure: "Vessel",
    material: "Glass",
    surface: "Translucent",
    state: "Listed",
    background: "Void",
    traits: [],
    priceSol: 8.4,
    description: "A vessel with an interrupted surface.",
    composition: "contained",
  },
  {
    id: 1,
    slug: "paper-frame",
    name: "Paper Frame",
    image: "/nft/slash_001.png",
    rarity: "Standard",
    structure: "Frame",
    material: "Paper",
    surface: "Matte",
    state: "Owned",
    background: "Off-white",
    traits: [],
    description: "A stable frame.",
    composition: "offset",
  },
  {
    id: 2,
    slug: "carbon-fold",
    name: "Carbon Fold",
    image: "/nft/slash_002.png",
    rarity: "Prototype",
    structure: "Fold",
    material: "Carbon",
    surface: "Burned",
    state: "Evolving",
    background: "Black",
    traits: [],
    priceSol: 3.1,
    description: "A folded carbon sheet.",
    composition: "cropped",
  },
];

describe("filterObjects", () => {
  it("combines search and rarity filters", () => {
    expect(filterObjects(sample, { search: "vessel", rarities: ["Null"] })).toHaveLength(1);
  });

  it("matches material and state", () => {
    expect(filterObjects(sample, { materials: ["Carbon"], states: ["Evolving"] })[0].id).toBe(2);
  });
});

describe("sortObjects", () => {
  it("sorts by token id without mutating input", () => {
    const original = [...sample];
    expect(sortObjects(sample, "token-desc")[0].id).toBe(3);
    expect(sample).toEqual(original);
  });

  it("places unlisted objects after listed objects for price sorting", () => {
    expect(sortObjects(sample, "price-asc").map((object) => object.id)).toEqual([2, 3, 1]);
  });
});
