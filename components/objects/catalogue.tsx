"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { NftObject } from "@/types/project";
import { filterObjects, sortObjects, type CatalogueSort } from "@/lib/catalogue";
import { FilterDrawer, type FilterSelection } from "./filter-drawer";
import { ObjectCard } from "./object-card";

const EMPTY_FILTERS: FilterSelection = {
  rarities: [],
  slashCounts: [],
  themes: [],
  series: [],
};

export function Catalogue({ objects }: { objects: NftObject[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<CatalogueSort>((searchParams.get("sort") as CatalogueSort) || "token-asc");
  const [view, setView] = useState<"grid" | "list">(searchParams.get("view") === "list" ? "list" : "grid");
  const [filters, setFilters] = useState<FilterSelection>(EMPTY_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const deferredSearch = useDeferredValue(search);

  const visibleObjects = useMemo(
    () => sortObjects(filterObjects(objects, { search: deferredSearch, ...filters }), sort),
    [deferredSearch, filters, objects, sort],
  );

  function syncQuery(next: { q?: string; sort?: CatalogueSort; view?: "grid" | "list" }) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => value ? params.set(key, value) : params.delete(key));
    router.replace(`/collection?${params.toString()}`, { scroll: false });
  }

  function toggleFilter(group: keyof FilterSelection, value: string) {
    setFilters((current) => {
      const values = current[group] as string[];
      const next = values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
      return { ...current, [group]: next } as FilterSelection;
    });
  }

  const activeFilters = Object.values(filters).flat();

  return (
    <div className="catalogue-layout">
      <FilterDrawer
        {...filters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onToggle={toggleFilter}
      />

      <div className="catalogue-main">
        <div className="catalogue-controls">
          <label>
            <span>Search collection</span>
            <input
              onChange={(event) => {
                setSearch(event.target.value);
                syncQuery({ q: event.target.value });
              }}
              placeholder="Name, token, series"
              type="search"
              value={search}
            />
          </label>
          <label>
            <span>Sort</span>
            <select
              onChange={(event) => {
                const next = event.target.value as CatalogueSort;
                setSort(next);
                syncQuery({ sort: next });
              }}
              value={sort}
            >
              <option value="token-asc">Token, low first</option>
              <option value="token-desc">Token, high first</option>
              <option value="rarity">Rarity class</option>
              <option value="price-asc">SOL value</option>
            </select>
          </label>
          <button className="filter-trigger" onClick={() => setIsFilterOpen(true)} type="button">Filters</button>
          <div className="view-switch" aria-label="Catalogue view">
            {(["grid", "list"] as const).map((mode) => (
              <button
                aria-pressed={view === mode}
                key={mode}
                onClick={() => {
                  setView(mode);
                  syncQuery({ view: mode });
                }}
                type="button"
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="active-filters">
          <span>{visibleObjects.length} slashes</span>
          {activeFilters.map((filter) => <span key={filter}>{filter}</span>)}
          {activeFilters.length ? (
            <button onClick={() => setFilters(EMPTY_FILTERS)} type="button">Clear all</button>
          ) : null}
        </div>

        {visibleObjects.length ? (
          <div className={`object-grid object-grid--${view}`}>
            {visibleObjects.map((object) => <ObjectCard key={object.id} mode={view} object={object} />)}
          </div>
        ) : (
          <div className="catalogue-empty">
            <strong>No slash matches this inspection.</strong>
            <p>Remove filters or search for another series, theme, or token.</p>
            <button onClick={() => { setFilters(EMPTY_FILTERS); setSearch(""); syncQuery({ q: "" }); }} type="button">
              Reset inspection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
