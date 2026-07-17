import type { ObjectMaterial, ObjectState, ObjectStructure, RarityClass } from "@/types/project";

export interface FilterSelection {
  rarities: RarityClass[];
  materials: ObjectMaterial[];
  structures: ObjectStructure[];
  states: ObjectState[];
}

interface FilterDrawerProps extends FilterSelection {
  isOpen: boolean;
  onClose(): void;
  onToggle(group: keyof FilterSelection, value: string): void;
}

const FILTERS = {
  rarities: ["Standard", "Distorted", "Prototype", "Null"],
  structures: ["Monolith", "Vessel", "Frame", "Fold", "Orbital", "Fragment"],
  materials: ["Ceramic", "Carbon", "Glass", "Chrome", "Paper", "Unknown"],
  states: ["Unminted", "Owned", "Listed", "Evolving", "Locked"],
} as const;

export function FilterDrawer({ isOpen, onClose, onToggle, ...selection }: FilterDrawerProps) {
  return (
    <aside className={`filter-drawer ${isOpen ? "filter-drawer--open" : ""}`} aria-label="Collection filters">
      <div className="filter-drawer__heading">
        <strong>Object filters</strong>
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
