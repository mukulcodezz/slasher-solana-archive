import type { ProjectConfig } from "@/types/project";

export const projectConfig: ProjectConfig = {
  name: "SLASHER",
  tagline: "One mark. Forty-two states.",
  description: "A finite archive of 42 diagonal mark studies designed for Solana.",
  supply: Number(process.env.NEXT_PUBLIC_TOTAL_SUPPLY ?? 42),
  priceSol: Number(process.env.NEXT_PUBLIC_MINT_PRICE_SOL ?? 0.05),
  maxMint: 3,
  cluster: process.env.NEXT_PUBLIC_SOLANA_NETWORK === "mainnet-beta" ? "mainnet-beta" : "devnet",
  rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
  roadmap: [
    {
      code: "CALIBRATION",
      title: "Finalize the slash system",
      status: "Active",
      progress: 72,
      items: ["Complete art direction", "Test wallet surfaces", "Document all 42 marks"],
    },
    {
      code: "REGISTRATION",
      title: "Prepare public registration",
      status: "Scheduled",
      progress: 34,
      items: ["Connect a reviewed mint program", "Publish provenance", "Activate holder archive"],
    },
    {
      code: "INSPECTION",
      title: "Open the complete archive",
      status: "Planned",
      progress: 18,
      items: ["Release trait explorer", "Activate object pages", "Begin experiment voting"],
    },
    {
      code: "MODIFICATION",
      title: "Test optional object states",
      status: "Research",
      progress: 8,
      items: ["Prototype evolution events", "Release a holder claim", "Study print production"],
    },
    {
      code: "OPEN SYSTEM",
      title: "Expand through selected experiments",
      status: "Future",
      progress: 2,
      items: ["Invite creative proposals", "Develop collaborations", "Maintain a public archive"],
    },
  ],
  utilities: [
    { name: "Slash Lab", summary: "Vote on surfaces, compositions, and controlled visual experiments.", availability: "Planned" },
    { name: "Private Archive", summary: "Access high-resolution art, studies, wallpapers, and process files.", availability: "Planned" },
    { name: "Form Claims", summary: "Receive optional digital posters, editions, and companion objects.", availability: "Concept" },
    { name: "Evolution Events", summary: "Choose announced metadata or visual upgrades for selected objects.", availability: "Research" },
    { name: "Creative License", summary: "Use owned work under a clear personal and limited commercial license.", availability: "Planned" },
    { name: "Community Proposals", summary: "Submit small creative experiments for verified holder feedback.", availability: "Concept" },
  ],
};
