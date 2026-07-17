import type { RarityClass, SlashCount, SlashSeries, SlashTheme } from "@/types/project";

export interface FilterSelection {
  rarities: RarityClass[];
  slashCounts: SlashCount[];
  themes: SlashTheme[];
  series: SlashSeries[];
}

interface FilterDrawerProps extends FilterSelection {
  isOpen: boolean;
  onClose(): void;
  onToggle(group: keyof FilterSelection, value: string): void;
}

const FILTERS = {
  rarities: ["Legendary", "Rare", "Common"],
  slashCounts: ["Single", "Double"],
  themes: ["Light", "Dark"],
  series: ["Arthouse", "Car", "Cubanoid", "Font", "Plastic", "Wood", "Blueprint", "Classwork", "Mosaic", "Core"],
} as const;

export function FilterDrawer({ isOpen, onClose, onToggle, ...selection }: FilterDrawerProps) {
  return (
    <aside className={`filter-drawer ${isOpen ? "filter-drawer--open" : ""}`} aria-label="Collection filters">
      <div className="filter-drawer__heading">
        <strong>Slash filters</strong>
        <button onClick={onClose} type="button">Close</button>
      </div>
      {(Object.keys(FILTERS) as Array<keyof FilterSelection>).map((group) => (
        <fieldset key={group}>
          <legend>{group}</legend>
          {FILTERS[group].map((value) => (
            <label key={value}>
              <input
                checked={(selection[group] as string[]).includes(value)}
                onChange={() => onToggle(group, value)}
                type="checkbox"
              />
              <span>{value}</span>
            </label>
          ))}
        </fieldset>
      ))}
    </aside>
  );
}
