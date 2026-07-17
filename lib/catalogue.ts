import type {
  NftObject,
  RarityClass,
  SlashCount,
  SlashSeries,
  SlashTheme,
} from "@/types/project";

export interface CatalogueFilters {
  search?: string;
  rarities?: RarityClass[];
  slashCounts?: SlashCount[];
  themes?: SlashTheme[];
  series?: SlashSeries[];
}

export type CatalogueSort = "token-asc" | "token-desc" | "rarity" | "price-asc";

const RARITY_ORDER: Record<RarityClass, number> = {
  Common: 0,
  Rare: 1,
  Legendary: 2,
};

function includesValue<T>(selected: readonly T[] | undefined, value: T): boolean {
  return !selected?.length || selected.includes(value);
}

export function filterObjects(objects: readonly NftObject[], filters: CatalogueFilters): NftObject[] {
  const search = filters.search?.trim().toLowerCase() ?? "";
  return objects.filter((object) => {
    const searchable = `${object.name} ${object.id} ${object.rarity} ${object.slashCount} ${object.theme} ${object.series}`.toLowerCase();
    return (!search || searchable.includes(search))
      && includesValue(filters.rarities, object.rarity)
      && includesValue(filters.slashCounts, object.slashCount)
      && includesValue(filters.themes, object.theme)
      && includesValue(filters.series, object.series);
  });
}

export function sortObjects(objects: readonly NftObject[], sort: CatalogueSort): NftObject[] {
  return [...objects].sort((left, right) => {
    if (sort === "token-desc") return right.id - left.id;
    if (sort === "rarity") return RARITY_ORDER[right.rarity] - RARITY_ORDER[left.rarity];
    if (sort === "price-asc") return (left.priceSol ?? Number.POSITIVE_INFINITY) - (right.priceSol ?? Number.POSITIVE_INFINITY);
    return left.id - right.id;
  });
}
