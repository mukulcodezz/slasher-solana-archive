# SLASHER Experience Design

## Product definition

SLASHER is a finite Solana-native collection of 42 original diagonal-mark artworks, presented as a working design archive rather than an NFT sales template. This release rebuilds the existing project into a premium, responsive experience with a real Wallet Standard connect/disconnect flow and an explicitly simulated mint instrument. It never creates, signs, submits, or confirms a transaction.

The product name is **SLASHER**. Its tagline is **One mark. Forty-two states.** The voice is concise, technical, and art-directed: gesture, registration, surface, state, provenance, signal, and archive.

## Scope

This release includes:

- a redesigned flagship homepage;
- a collection catalogue using the existing local NFT images as raw material, enhanced by original procedural treatments and newly generated campaign artwork;
- an object detail route for every catalogue object;
- a dedicated demo mint page;
- redesigned roadmap and archive/documentation pages;
- a studio/about page;
- a reusable header, navigation, footer, wallet control, Glass Meter, object card, and disclosure system;
- real Wallet Standard discovery, connection, account display, copy, Explorer link, and disconnect;
- configuration and typed data boundaries that support later integration work;
- responsive behavior, reduced-motion behavior, metadata, sitemap, robots rules, and an Open Graph image.

This release excludes:

- mint program integration;
- transaction creation, signing, simulation, submission, or confirmation;
- automatic wallet connection or automatic transaction prompts;
- production balance, ownership, marketplace, allowlist, RPC, AI, holder-gating, analytics, or admin integrations;
- claims of marketplace verification, legal approval, contract review, or financial return.

## Creative direction

The visual concept is **Instrumental Archive**: a digital design institution documenting manufactured objects. It combines an asymmetric Swiss editorial grid with industrial inspection graphics and restrained translucent instruments.

The palette is warm off-white (`#f0eee7`), carbon black (`#10100f`), graphite (`#5d5d57`), fogged glass, and a very limited signal green used only for live/connected states. There are no neon gradients, purple Web3 motifs, generic rounded dashboards, or decorative partner logos.

Typography uses the project’s local JetBrains Mono family for technical labels and a bundled or system grotesk stack for display copy. Display type is large, tightly tracked, and responsive. Labels remain compact, uppercase, and monospaced.

The **Glass Meter** is the signature component. It is a translucent calibrated vessel with a visible fill, ticks, a numeric or textual readout, and a semantic label. Variants represent supply, rarity, roadmap progress, object integrity, network state, and mint configuration. Glass treatment remains subtle: thin borders, controlled blur, low-opacity highlights, and no floating-glass-card grid.

Artwork consists of monochrome conceptual industrial sculptures—folded masses, interrupted columns, vessels, frames, and anomalous objects—on off-white or black stages. New campaign images are generated as local bitmap assets. Catalogue diversity also uses deterministic CSS/SVG masks, crops, overlays, and object-specific compositions so cards do not repeat one treatment.

## Information architecture

### Global shell

The sticky header contains the SLASHER wordmark, primary navigation, a network label, and wallet control. Mobile navigation opens as a full-height editorial index. A persistent, unobtrusive security line states: “SLASHER will never request your seed phrase.”

The footer includes official-channel placeholders clearly marked as unconfigured, a demo collection address, legal-document links, status, network, and the warning: “Always verify the official collection address before signing a transaction.”

### Homepage

1. **Hero / Registration field** — large animated SLASHER typography, the generated collection banner, rotating technical microcopy, and primary actions for the collection and wallet connection.
2. **Mint instrument** — supply, price, quantity, wallet status, and lifecycle preview. The main action displays “Preview mint” and ends with “Preview mode — mint program not connected.”
3. **Collection thesis** — asymmetric editorial copy and the principles Finite, Verifiable, and Evolving.
4. **Object classes** — Standard, Distorted, Prototype, and Null represented through distinct meters and silhouettes.
5. **Featured objects** — six varied cards with traits, state, class, and inspection interactions.
6. **Solana anatomy** — an animated diagram from wallet signature through ownership, clearly labeled as the intended future transaction structure rather than current functionality.
7. **Utility board** — Object Lab, Private Archive, Form Claims, Evolution Events, Creative License, Solana Allowlist, and Community Proposals presented as one interactive control surface.
8. **Operational roadmap** — stages 00–04 with truthful statuses and expandable notes.
9. **Signal Channel** — announcement and development-log samples plus a disabled archive assistant marked “Archive intelligence module — integration pending.”
10. **FAQ and final registration CTA** — security-aware answers and a final oversized Glass Meter composition.

### Collection catalogue

The collection page provides responsive grid/list modes, text search, class/material/structure/state filters, active chips, clear-all, token/rarity/price sorting, URL-synchronized state, skeletons, and a useful empty state. At least 24 typed objects are stored locally. Filtering remains client-side for this dataset.

### Object detail

`/collection/[slug]` includes a large zoomable viewer, token identity, class, traits, demo owner/mint values explicitly labeled as sample data, provenance notes, Explorer-copy affordances disabled when an address is not configured, related objects, and previous/next navigation. Object Integrity is labeled as a project interface metric, not an on-chain security score.

### Demo mint

`/mint` includes artwork preview, quantity, price calculation, estimated fee label, supply, terms acknowledgement, and a visual lifecycle. It supports preview states for ready, wallet disconnected, wallet rejected, insufficient demo balance, paused, sold out, cancelled, failure, and completed preview. It never calls a transaction or reports an on-chain success.

### Studio, roadmap, and archive

The Studio explains philosophy, process, Solana rationale, role-based contributors, and a transparency panel whose values are Confirmed, Pending, or Not applicable. The roadmap uses the operational stages from the brief. The archive groups project, minting, Solana, holder, and legal documentation and displays: “Placeholder policy — obtain qualified legal review before launch.”

## Wallet architecture

Wallet integration uses the current Solana React stack (`@solana/client`, `@solana/react-hooks`, and `@solana/kit`) with Wallet Standard auto-discovery. A single client provider owns the devnet endpoint and discovered connectors. The UI consumes wallet state through a project-local adapter so future library changes do not leak into presentation components.

The wallet flow is:

1. The user deliberately opens the wallet menu.
2. Installed Wallet Standard-compatible wallets are listed.
3. Selecting a wallet requests connection only.
4. On success, the UI shows the wallet name, shortened address, devnet label, copy action, Explorer action, and disconnect.
5. On rejection, absence, unsupported environment, or provider failure, the control shows a human-readable recovery message without retry loops.

Auto-connect is disabled. No balance is fabricated. If balance reading is not implemented in this release, the menu says “Balance not queried.” Wallet address data stays in client memory and is not sent to a project server.

## Component and module boundaries

- `app/providers.tsx` configures the Solana provider and client-only application providers.
- `config/project.ts` is the single source for identity, supply, pricing, network, social/legal links, and feature flags.
- `data/objects.ts` holds typed catalogue data.
- `types/project.ts` defines object, trait, rarity, roadmap, utility, wallet-view, and demo-mint types.
- `solana/wallet.ts` normalizes discovered wallets and connection errors behind project-owned types.
- `components/wallet/` owns the wallet trigger, menu, status, and recovery UI.
- `components/meters/` owns the Glass Meter primitives and semantic variants.
- `components/objects/` owns cards, viewer, filters, and related-object navigation.
- `components/mint/` owns the pure demo state machine and instrument UI.
- `components/sections/` contains focused homepage sections.
- `components/layout/` owns the header, mobile navigation, footer, and security label.

No blockchain call lives inside a presentational component. The demo mint state machine has no Solana client dependency.

## Motion and interaction

Motion establishes hierarchy rather than delaying access:

- hero type and artwork enter through masked vertical reveals;
- Glass Meters calibrate once when entering the viewport;
- section labels and rules reveal in short staggered sequences;
- cards respond to pointer position with restrained lighting and depth;
- the Solana anatomy trace advances step by step;
- route and menu transitions use opacity, clipping, and small transforms;
- hover effects never hide essential information.

Motion uses CSS and the Web Animations/Intersection Observer APIs where possible. There is no autoplay audio and no uncontrolled WebGL. `prefers-reduced-motion` removes parallax, stagger, and continuous motion while retaining state changes.

## Content and trust rules

All addresses remain visibly marked as unconfigured sample values until environment variables contain valid addresses. Explorer buttons are disabled for unconfigured values. The interface never presents preview supply movement, demo ownership, or preview completion as blockchain truth.

Mint-related screens repeat the message: “Preview mode — mint program not connected.” Legal templates are educational placeholders and never described as reviewed advice. Official social links remain disabled until configured.

## Responsive and accessibility behavior

Desktop uses a 12-column editorial grid. Tablet compresses to six columns. Mobile uses one primary content column with occasional two-column instruments. Navigation, filters, wallet menus, and viewers are keyboard accessible; dialogs trap focus and restore it on close. Interactive targets are at least 44 pixels. Images have descriptive alt text, decorative graphics are hidden from assistive technology, visible focus styles meet contrast requirements, and text remains usable at 200% zoom.

## Performance

Server components are the default. Client components are limited to wallet state, interactive filters, viewers, menus, and motion observers. Images use Next.js optimization, stable aspect ratios, and lazy loading below the fold. Generated campaign files are compressed and stored locally. Fonts use `font-display: swap`. The experience avoids large general-purpose animation and 3D libraries unless measurement proves a specific need.

## Error handling

Wallet errors are normalized into unavailable, rejected, unsupported, cluster, provider, and unknown categories. Each state provides one next action. Demo mint state changes are deterministic and recoverable through reset. Invalid collection filters fall back to valid defaults while preserving recognized query parameters. Missing object slugs render the framework 404. Missing artwork renders a branded object silhouette rather than a broken-image icon.

## Verification strategy

Automated checks cover the demo mint reducer, catalogue filtering/sorting/query serialization, address formatting, Explorer URL generation, and wallet error normalization. Component tests cover wallet menu states and keyboard behavior where the chosen test stack supports browser APIs.

Completion requires:

- ESLint exits successfully;
- TypeScript and the Next.js production build exit successfully;
- all automated tests pass;
- core routes render without console errors;
- wallet connection is manually checked with an installed Wallet Standard wallet and the unavailable-wallet state is checked without one;
- no mint action creates a transaction or requests a signature;
- desktop and mobile layouts are visually inspected;
- reduced-motion and keyboard navigation are manually inspected.

## Success criteria

The project feels like a collectible digital-design institution rather than an NFT template. SLASHER has one recognizable instrument language, all 42 original artworks, deliberate editorial rhythm, safe wallet connection, honest demo minting, and a clean path for later production integrations. It runs with `npm install`, `npm run dev`, and `npm run build`.
