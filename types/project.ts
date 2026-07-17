export type RarityClass = "Common" | "Rare" | "Legendary";
export type SlashCount = "Single" | "Double";
export type SlashTheme = "Light" | "Dark";
export type SlashSeries = "Arthouse" | "Car" | "Cubanoid" | "Font" | "Plastic" | "Wood" | "Blueprint" | "Classwork" | "Mosaic" | "Core";
export type SolanaCluster = "devnet" | "mainnet-beta";
export type MintPreviewStatus =
  | "ready"
  | "wallet-required"
  | "terms-required"
  | "preparing"
  | "signature-preview"
  | "complete-preview"
  | "cancelled"
  | "failed"
  | "paused"
  | "sold-out";

export interface NftTrait {
  type: string;
  value: string;
}

export interface NftObject {
  id: number;
  slug: string;
  name: string;
  image: string;
  rarity: RarityClass;
  slashCount: SlashCount;
  theme: SlashTheme;
  series: SlashSeries;
  traits: NftTrait[];
  priceSol?: number;
  description: string;
  composition: "contained" | "cropped" | "offset" | "mirrored";
}

export interface RoadmapStage {
  code: string;
  title: string;
  status: "Active" | "Scheduled" | "Planned" | "Research" | "Future";
  progress: number;
  items: string[];
}

export interface UtilityModule {
  name: string;
  summary: string;
  availability: "Concept" | "Planned" | "Research";
}

export interface ProjectConfig {
  name: string;
  tagline: string;
  description: string;
  supply: number;
  priceSol: number;
  maxMint: number;
  cluster: SolanaCluster;
  rpcUrl: string;
  collectionAddress: string;
  mintProgramAddress: string;
  treasuryAddress: string;
  royaltyPercent: number;
  featureFlags: {
    demoMode: boolean;
    mintEnabled: boolean;
    allowlistEnabled: boolean;
    aiAssistantEnabled: boolean;
  };
  roadmap: RoadmapStage[];
  utilities: UtilityModule[];
}
