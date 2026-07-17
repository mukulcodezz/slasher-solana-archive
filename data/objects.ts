import type { NftObject } from "@/types/project";

const objectDefinitions: Array<Omit<NftObject, "traits">> = [
  { id: 42, slug: "folded-mass-0042", name: "Folded Mass", image: "/nft/slash_001.png", rarity: "Standard", structure: "Fold", material: "Paper", surface: "Matte", state: "Owned", background: "Off-white", priceSol: 1.4, description: "A compressed plane held at the limit of structural memory.", composition: "contained" },
  { id: 118, slug: "black-vessel-0118", name: "Black Vessel", image: "/nft/slash_002.png", rarity: "Distorted", structure: "Vessel", material: "Carbon", surface: "Polished", state: "Listed", background: "Black", priceSol: 2.8, description: "A carbon vessel interrupted by a displaced inner wall.", composition: "cropped" },
  { id: 294, slug: "soft-machine-0294", name: "Soft Machine", image: "/nft/slash_003.png", rarity: "Prototype", structure: "Orbital", material: "Glass", surface: "Translucent", state: "Evolving", background: "Neutral", priceSol: 4.6, description: "A flexible mechanism captured between two stable states.", composition: "offset" },
  { id: 771, slug: "interrupted-column-0771", name: "Interrupted Column", image: "/nft/slash_004.png", rarity: "Distorted", structure: "Monolith", material: "Ceramic", surface: "Weathered", state: "Owned", background: "Off-white", description: "A load-bearing form with its central continuity removed.", composition: "contained" },
  { id: 1208, slug: "memory-block-1208", name: "Memory Block", image: "/nft/slash_005.png", rarity: "Prototype", structure: "Fragment", material: "Glass", surface: "Reflective", state: "Locked", background: "Void", description: "A transparent volume containing evidence of a previous geometry.", composition: "mirrored" },
  { id: 3333, slug: "null-object-3333", name: "Null Object", image: "/nft/slash_006.png", rarity: "Null", structure: "Fragment", material: "Unknown", surface: "Burned", state: "Locked", background: "Void", description: "An exception recorded outside the collection's normal material rules.", composition: "cropped" },
  { id: 87, slug: "ceramic-joint-0087", name: "Ceramic Joint", image: "/nft/slash_007.png", rarity: "Standard", structure: "Frame", material: "Ceramic", surface: "Matte", state: "Unminted", background: "Neutral", description: "Two ceramic members joined without visible hardware.", composition: "offset" },
  { id: 163, slug: "void-hinge-0163", name: "Void Hinge", image: "/nft/slash_008.png", rarity: "Distorted", structure: "Frame", material: "Carbon", surface: "Burned", state: "Listed", background: "Black", priceSol: 2.2, description: "A frame calibrated around an absent moving part.", composition: "contained" },
  { id: 206, slug: "paper-chassis-0206", name: "Paper Chassis", image: "/nft/slash_009.png", rarity: "Standard", structure: "Fold", material: "Paper", surface: "Weathered", state: "Owned", background: "Off-white", description: "A paper system folded into a temporary load-bearing chassis.", composition: "cropped" },
  { id: 351, slug: "orbital-residue-0351", name: "Orbital Residue", image: "/nft/slash_010.png", rarity: "Prototype", structure: "Orbital", material: "Chrome", surface: "Reflective", state: "Evolving", background: "Void", priceSol: 5.2, description: "A polished trace left by a rotating manufactured body.", composition: "offset" },
  { id: 408, slug: "compressed-frame-0408", name: "Compressed Frame", image: "/nft/slash_011.png", rarity: "Standard", structure: "Frame", material: "Carbon", surface: "Matte", state: "Unminted", background: "Black", description: "A rigid perimeter reduced until its interior becomes structural.", composition: "mirrored" },
  { id: 519, slug: "chrome-witness-0519", name: "Chrome Witness", image: "/nft/slash_012.png", rarity: "Distorted", structure: "Monolith", material: "Chrome", surface: "Polished", state: "Listed", background: "Neutral", priceSol: 3.3, description: "A reflective marker carrying surface evidence from nearby objects.", composition: "cropped" },
  { id: 622, slug: "quiet-fragment-0622", name: "Quiet Fragment", image: "/nft/slash_013.png", rarity: "Standard", structure: "Fragment", material: "Ceramic", surface: "Weathered", state: "Owned", background: "Off-white", description: "A detached ceramic section preserved without reconstruction.", composition: "contained" },
  { id: 706, slug: "translucent-brace-0706", name: "Translucent Brace", image: "/nft/slash_014.png", rarity: "Prototype", structure: "Frame", material: "Glass", surface: "Translucent", state: "Locked", background: "Neutral", description: "A transparent brace that reveals its own load path.", composition: "offset" },
  { id: 844, slug: "carbon-orbit-0844", name: "Carbon Orbit", image: "/nft/slash_015.png", rarity: "Distorted", structure: "Orbital", material: "Carbon", surface: "Matte", state: "Listed", background: "Black", priceSol: 2.6, description: "A black orbital system with an intentionally unstable center.", composition: "mirrored" },
  { id: 931, slug: "white-monolith-0931", name: "White Monolith", image: "/nft/slash_016.png", rarity: "Standard", structure: "Monolith", material: "Ceramic", surface: "Polished", state: "Unminted", background: "Off-white", description: "A stable ceramic body with one registered surface deviation.", composition: "contained" },
  { id: 1044, slug: "burned-fold-1044", name: "Burned Fold", image: "/nft/slash_017.png", rarity: "Distorted", structure: "Fold", material: "Paper", surface: "Burned", state: "Evolving", background: "Void", description: "A folded sheet whose edge state was changed through heat.", composition: "cropped" },
  { id: 1310, slug: "unknown-vessel-1310", name: "Unknown Vessel", image: "/nft/slash_018.png", rarity: "Prototype", structure: "Vessel", material: "Unknown", surface: "Translucent", state: "Locked", background: "Black", description: "A vessel assembled from an unclassified semi-transparent system.", composition: "offset" },
  { id: 1472, slug: "mirror-section-1472", name: "Mirror Section", image: "/nft/slash_020.png", rarity: "Standard", structure: "Fragment", material: "Chrome", surface: "Reflective", state: "Owned", background: "Neutral", description: "A polished section that records its environment as a temporary trait.", composition: "mirrored" },
  { id: 1688, slug: "vessel-study-1688", name: "Vessel Study", image: "/nft/slash_021.png", rarity: "Standard", structure: "Vessel", material: "Ceramic", surface: "Matte", state: "Unminted", background: "Off-white", description: "A restrained vessel used to calibrate the foundational class.", composition: "contained" },
  { id: 1904, slug: "broken-orbit-1904", name: "Broken Orbit", image: "/nft/slash_022.png", rarity: "Distorted", structure: "Orbital", material: "Chrome", surface: "Weathered", state: "Listed", background: "Void", priceSol: 3.7, description: "An orbital path stopped before its final connection.", composition: "cropped" },
  { id: 2147, slug: "glass-chassis-2147", name: "Glass Chassis", image: "/nft/slash_023.png", rarity: "Prototype", structure: "Frame", material: "Glass", surface: "Polished", state: "Evolving", background: "Neutral", priceSol: 4.9, description: "A visible structural system with no decorative enclosure.", composition: "offset" },
  { id: 2519, slug: "paper-signal-2519", name: "Paper Signal", image: "/nft/slash_024.png", rarity: "Standard", structure: "Fold", material: "Paper", surface: "Matte", state: "Owned", background: "Off-white", description: "A folded marker designed to remain legible from one angle.", composition: "mirrored" },
  { id: 3199, slug: "null-aperture-3199", name: "Null Aperture", image: "/nft/slash_025.png", rarity: "Null", structure: "Frame", material: "Unknown", surface: "Reflective", state: "Locked", background: "Void", description: "A scarce frame whose opening does not agree with its exterior.", composition: "cropped" },
];

export const objects: NftObject[] = objectDefinitions.map((object) => ({
  ...object,
  traits: [
    { type: "Structure", value: object.structure },
    { type: "Material", value: object.material },
    { type: "Surface", value: object.surface },
    { type: "Background", value: object.background },
  ],
}));

export const featuredObjects = objects.slice(0, 6);

export function getObjectBySlug(slug: string): NftObject | undefined {
  return objects.find((object) => object.slug === slug);
}
