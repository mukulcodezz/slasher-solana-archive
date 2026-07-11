export type Tag = "Single" | "Double" | "Common" | "Rare" | "Legendary" | "Dark" | "Light";
export interface INFTItem {
    name: string;
    image: string;
    price: number;
    tags: Tag[];
}

export const ALL_TAGS: Tag[] = ["Single", "Double", "Light", "Dark", "Common", "Rare", "Legendary"];