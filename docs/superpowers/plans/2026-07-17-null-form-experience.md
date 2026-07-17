# NULL/FORM Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Next.js NFT site as the premium NULL/FORM digital sculpture archive with real transaction-free Solana wallet connection and an honest demo mint experience.

**Architecture:** Keep content and configuration in typed server-safe modules, isolate browser behavior in focused client components, and place Solana APIs behind a project-owned wallet view model. Render the visual system primarily with React, CSS, local imagery, and SVG; use a pure reducer for demo minting so it cannot acquire transaction capabilities accidentally.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, CSS animations, Vitest, Testing Library, `@solana/client`, `@solana/react-hooks`, `@solana/kit`, Wallet Standard.

## Global Constraints

- Product name: `NULL/FORM`; tagline: `Objects recorded on Solana`.
- Palette: warm off-white `#f0eee7`, carbon black `#10100f`, graphite `#5d5d57`, fogged glass, and signal green only for live/connected states.
- Minting is always a simulation and must display `Preview mode — mint program not connected.`
- Never create, sign, simulate, submit, or confirm a transaction.
- Never auto-connect a wallet, prompt for a wallet on load, fabricate a balance, or store wallet addresses server-side.
- Generated and existing artwork must be local; no remote image runtime dependency.
- Prefer CSS and browser APIs over a general-purpose animation or WebGL dependency.
- Honor `prefers-reduced-motion`, keyboard access, visible focus, 44-pixel targets, and descriptive alternative text.

---

### Task 1: Typed project foundation and deterministic utilities

**Files:**
- Modify: `package.json`
- Create: `types/project.ts`
- Create: `config/project.ts`
- Create: `lib/format.ts`
- Create: `lib/format.test.ts`
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: `ProjectConfig`, `NftObject`, `RarityClass`, `MintPreviewState`, `projectConfig`, `shortAddress(address)`, and `explorerAddressUrl(address, cluster)`.

- [ ] **Step 1: Add test and Solana dependencies**

Run:

```powershell
npm install @solana/client@latest @solana/react-hooks@latest @solana/kit@latest
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```

Add scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: Write failing formatting tests**

```ts
import { describe, expect, it } from "vitest";
import { explorerAddressUrl, shortAddress } from "./format";

describe("wallet formatting", () => {
  it("shortens long addresses", () => {
    expect(shortAddress("1234567890abcdefghijklmnop")).toBe("1234…mnop");
  });

  it("creates a devnet explorer address URL", () => {
    expect(explorerAddressUrl("abc", "devnet")).toBe(
      "https://explorer.solana.com/address/abc?cluster=devnet",
    );
  });
});
```

- [ ] **Step 3: Run the focused test and verify RED**

Run: `npm test -- lib/format.test.ts`

Expected: FAIL because `lib/format.ts` does not exist.

- [ ] **Step 4: Add types, configuration, and utilities**

Define exact public types:

```ts
export type RarityClass = "Standard" | "Distorted" | "Prototype" | "Null";
export type ObjectState = "Unminted" | "Owned" | "Listed" | "Evolving" | "Locked";
export type SolanaCluster = "devnet" | "mainnet-beta";
export type MintPreviewState =
  | "ready" | "wallet-required" | "terms-required" | "preparing"
  | "signature-preview" | "complete-preview" | "cancelled" | "failed"
  | "paused" | "sold-out";

export interface NftTrait { type: string; value: string }
export interface NftObject {
  id: number;
  slug: string;
  name: string;
  image: string;
  rarity: RarityClass;
  structure: "Monolith" | "Vessel" | "Frame" | "Fold" | "Orbital" | "Fragment";
  material: "Ceramic" | "Carbon" | "Glass" | "Chrome" | "Paper" | "Unknown";
  surface: "Matte" | "Polished" | "Weathered" | "Translucent" | "Burned" | "Reflective";
  state: ObjectState;
  background: "Off-white" | "Black" | "Neutral" | "Void";
  traits: NftTrait[];
  priceSol?: number;
  description: string;
}
```

Create `projectConfig` with name, tagline, description, supply `3333`, price `1.25`, max quantity `3`, cluster `devnet`, feature flags, roadmap, utilities, and unconfigured address/social values. Implement:

```ts
export function shortAddress(address: string): string {
  return address.length <= 12 ? address : `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function explorerAddressUrl(address: string, cluster: "devnet" | "mainnet-beta"): string {
  const suffix = cluster === "mainnet-beta" ? "" : `?cluster=${cluster}`;
  return `https://explorer.solana.com/address/${encodeURIComponent(address)}${suffix}`;
}
```

- [ ] **Step 5: Verify GREEN and commit**

Run: `npm test -- lib/format.test.ts`

Expected: 2 tests pass.

```powershell
git add package.json package-lock.json types config lib vitest.config.ts
git commit -m "feat: establish null form domain foundation"
```

### Task 2: Wallet Standard connection boundary

**Files:**
- Create: `app/providers.tsx`
- Modify: `app/layout.tsx`
- Create: `solana/wallet.ts`
- Create: `solana/wallet.test.ts`
- Create: `components/wallet/wallet-control.tsx`
- Create: `components/wallet/wallet-control.test.tsx`

**Interfaces:**
- Consumes: `projectConfig`, `shortAddress()`, `explorerAddressUrl()`.
- Produces: `normalizeWalletError(error): WalletErrorView`, application `Providers`, and `WalletControl`.

- [ ] **Step 1: Write wallet error normalization tests**

```ts
import { describe, expect, it } from "vitest";
import { normalizeWalletError } from "./wallet";

describe("normalizeWalletError", () => {
  it("recognizes a rejected connection", () => {
    expect(normalizeWalletError(new Error("User rejected the request")).kind).toBe("rejected");
  });

  it("provides a safe unknown fallback", () => {
    expect(normalizeWalletError({ bad: true })).toEqual({
      kind: "unknown",
      message: "Wallet connection could not be completed.",
    });
  });
});
```

- [ ] **Step 2: Run normalization tests and verify RED**

Run: `npm test -- solana/wallet.test.ts`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the wallet boundary and provider**

Use the official provider shape:

```tsx
"use client";
import type { SolanaClientConfig } from "@solana/client";
import { SolanaProvider } from "@solana/react-hooks";

const config: SolanaClientConfig = {
  cluster: "devnet",
  rpc: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com",
  websocket: "wss://api.devnet.solana.com",
};

export function Providers({ children }: { children: React.ReactNode }) {
  return <SolanaProvider config={config}>{children}</SolanaProvider>;
}
```

Normalize errors into `unavailable | rejected | unsupported | cluster | provider | unknown`. Wrap the root body with `Providers`. Do not enable auto-connect.

- [ ] **Step 4: Implement the custom wallet control**

Use `useWallets`, `useConnectWallet`, `useDisconnectWallet`, and the connected account hook exposed by the installed `@solana/react-hooks` version. Render:

```tsx
<button type="button" aria-haspopup="dialog" aria-expanded={open}>
  {account ? shortAddress(account.address.toString()) : "Connect wallet"}
</button>
```

The dialog lists discovered wallets, connects only after selection, shows `Balance not queried`, offers copy/Explorer/disconnect, traps focus, closes on Escape, restores focus, and displays normalized errors.

- [ ] **Step 5: Add interaction tests**

Mock the project wallet hook and assert that opening the menu does not call connect, selecting a wallet calls connect once, Escape closes the dialog, and the connected state exposes disconnect.

- [ ] **Step 6: Verify wallet tests and commit**

Run: `npm test -- solana/wallet.test.ts components/wallet/wallet-control.test.tsx`

Expected: all focused tests pass.

```powershell
git add app/providers.tsx app/layout.tsx solana components/wallet
git commit -m "feat: add transaction-free solana wallet connection"
```

### Task 3: Visual system, shell, and original artwork

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Replace: `components/header.tsx`
- Create: `components/layout/site-header.tsx`
- Create: `components/layout/mobile-navigation.tsx`
- Create: `components/layout/site-footer.tsx`
- Create: `components/layout/security-label.tsx`
- Create: `components/ui/reveal.tsx`
- Create: `components/meters/glass-meter.tsx`
- Create: `public/images/null-form-hero.png`
- Create: `public/images/null-form-signal.png`

**Interfaces:**
- Consumes: `WalletControl`, `projectConfig`.
- Produces: global design tokens, `SiteHeader`, `SiteFooter`, `SecurityLabel`, `Reveal`, and `GlassMeter`.

- [ ] **Step 1: Generate two original campaign assets**

Generate local wide monochrome industrial-sculpture compositions: one hero object with generous negative space and one denser signal/archive composition. Use warm off-white, carbon black, glass, ceramic, paper, and chrome; exclude text, logos, neon, stock-photo styling, and watermarks. Save final selected files at the exact paths above and inspect both outputs.

- [ ] **Step 2: Build global tokens and motion primitives**

Define variables:

```css
:root {
  --paper: #f0eee7;
  --ink: #10100f;
  --graphite: #5d5d57;
  --line: rgba(16, 16, 15, 0.2);
  --glass: rgba(255, 255, 255, 0.34);
  --signal: #b6ff3b;
  --ease-out: cubic-bezier(.16, 1, .3, 1);
}
```

Add a 12-column `.nf-grid`, display/label classes, focus-visible styles, grain, reveal animation, meter calibration, card tilt styling, and complete reduced-motion overrides.

- [ ] **Step 3: Implement Glass Meter**

```tsx
export interface GlassMeterProps {
  label: string;
  value: number;
  display: string;
  tone?: "ink" | "signal" | "muted";
  orientation?: "vertical" | "horizontal";
}
```

Clamp `value` to `0..100`, render semantic text outside the decorative calibrated vessel, and use CSS custom property `--meter-value` for fill.

- [ ] **Step 4: Build the global shell**

Replace the old header with a sticky responsive header, full-screen mobile index, wallet control, network label, security line, and footer. Update metadata to NULL/FORM and remove the old background image from `body`.

- [ ] **Step 5: Verify shell and commit**

Run: `npm run lint`

Expected: exit 0.

```powershell
git add app/globals.css app/layout.tsx components public/images/null-form-hero.png public/images/null-form-signal.png
git commit -m "feat: create null form visual system"
```

### Task 4: Flagship homepage

**Files:**
- Replace: `app/page.tsx`
- Create: `components/sections/hero.tsx`
- Create: `components/sections/collection-thesis.tsx`
- Create: `components/sections/object-classes.tsx`
- Create: `components/sections/featured-objects.tsx`
- Create: `components/sections/solana-anatomy.tsx`
- Create: `components/sections/utility-board.tsx`
- Create: `components/sections/roadmap-preview.tsx`
- Create: `components/sections/signal-channel.tsx`
- Create: `components/sections/faq.tsx`
- Create: `components/sections/final-cta.tsx`

**Interfaces:**
- Consumes: `projectConfig`, `objects`, `GlassMeter`, `WalletControl`.
- Produces: server-rendered homepage with isolated interactive islands.

- [ ] **Step 1: Build hero and registration field**

Render the wordmark, tagline, local hero asset, catalogue/mint actions, live devnet label, supply meter, and scroll indicator. Keep the first viewport useful before animation completes.

- [ ] **Step 2: Build thesis, classes, and featured objects**

Use the exact Finite/Verifiable/Evolving principles and class supplies `2400 / 700 / 200 / 33`. Feature six objects from typed data with different crop/composition classes.

- [ ] **Step 3: Build Solana anatomy and utility board**

Render `Wallet signature → Mint instruction → Solana confirmation → Metadata registration → Object ownership` as an explicitly future-state technical diagram. Build utility as a keyboard-operable instrument board rather than a card grid.

- [ ] **Step 4: Build roadmap, Signal Channel, FAQ, and final CTA**

Use truthful stage statuses. Keep the AI field disabled with `Archive intelligence module — integration pending.` Include the complete security-aware FAQ from the specification and repeat the preview-mode disclosure near mint actions.

- [ ] **Step 5: Verify homepage and commit**

Run: `npm run lint`

Expected: exit 0.

```powershell
git add app/page.tsx components/sections
git commit -m "feat: build null form flagship experience"
```

### Task 5: Typed catalogue and object detail routes

**Files:**
- Create: `data/objects.ts`
- Create: `lib/catalogue.ts`
- Create: `lib/catalogue.test.ts`
- Replace: `app/collection/page.tsx`
- Create: `app/collection/[slug]/page.tsx`
- Create: `components/objects/catalogue.tsx`
- Create: `components/objects/object-card.tsx`
- Create: `components/objects/object-viewer.tsx`
- Create: `components/objects/filter-drawer.tsx`

**Interfaces:**
- Produces: `objects: NftObject[]`, `filterObjects(objects, filters)`, `sortObjects(objects, sort)`, catalogue UI, and static detail routes.

- [ ] **Step 1: Write filtering and sorting tests**

```ts
it("combines search and rarity filters", () => {
  expect(filterObjects(sample, { search: "vessel", rarity: ["Null"] })).toHaveLength(1);
});

it("sorts by token id without mutating input", () => {
  const original = [...sample];
  expect(sortObjects(sample, "token-desc")[0].id).toBe(3);
  expect(sample).toEqual(original);
});
```

- [ ] **Step 2: Run catalogue tests and verify RED**

Run: `npm test -- lib/catalogue.test.ts`

Expected: FAIL because catalogue functions do not exist.

- [ ] **Step 3: Add at least 24 complete typed objects**

Map existing `/nft/slash_*.png` files to unique NULL/FORM names, traits, materials, structures, surfaces, states, backgrounds, and composition classes. Include the six named feature objects and avoid fabricated owner addresses.

- [ ] **Step 4: Implement pure catalogue functions and verify GREEN**

Filter by normalized search plus multi-select dimensions. Sort a copied array by token, rarity rank, or price. Run: `npm test -- lib/catalogue.test.ts` and expect all focused tests to pass.

- [ ] **Step 5: Build catalogue interaction**

Use `useSearchParams` and `router.replace` for URL-synchronized search, sort, view, and filters. Add desktop controls, mobile filter drawer, active chips, clear all, empty state, loading skeleton styling, grid/list modes, and semantic result count.

- [ ] **Step 6: Build detail routes**

Use `generateStaticParams`, `notFound()`, `generateMetadata`, a zoom/full-screen viewer, trait table, sample-data disclosures, object integrity meter, related objects, and previous/next links. Disable address actions when configuration is unconfigured.

- [ ] **Step 7: Verify and commit**

Run: `npm test -- lib/catalogue.test.ts && npm run lint`

Expected: tests pass and lint exits 0.

```powershell
git add data lib/catalogue.ts lib/catalogue.test.ts app/collection components/objects
git commit -m "feat: add inspectable object catalogue"
```

### Task 6: Demo mint state machine and page

**Files:**
- Create: `lib/mint-preview.ts`
- Create: `lib/mint-preview.test.ts`
- Create: `components/mint/mint-instrument.tsx`
- Create: `components/mint/transaction-status.tsx`
- Create: `app/mint/page.tsx`

**Interfaces:**
- Consumes: wallet connected boolean, `projectConfig` price/supply/max quantity.
- Produces: `mintPreviewReducer(state, event)`, `MintInstrument`, and a transaction-free `/mint` route.

- [ ] **Step 1: Write reducer tests**

```ts
it("requires a wallet before previewing", () => {
  expect(mintPreviewReducer(initial, { type: "START", walletConnected: false }).status)
    .toBe("wallet-required");
});

it("never represents an on-chain completion", () => {
  const result = mintPreviewReducer({ ...initial, status: "signature-preview" }, { type: "ADVANCE" });
  expect(result).toMatchObject({ status: "complete-preview", signature: undefined });
});
```

- [ ] **Step 2: Run reducer tests and verify RED**

Run: `npm test -- lib/mint-preview.test.ts`

Expected: FAIL because reducer does not exist.

- [ ] **Step 3: Implement pure reducer and verify GREEN**

Events are `SET_QUANTITY`, `TOGGLE_TERMS`, `START`, `ADVANCE`, `CANCEL`, `FAIL`, and `RESET`. The final state text is always `Preview mode — mint program not connected.` and has no signature field.

- [ ] **Step 4: Build mint instrument and lifecycle**

Render quantity, price, estimated fee label, total, balance as `Not queried`, supply, max mint, terms, artwork preview, and the six lifecycle labels. Provide deterministic controls to preview rejection, cancellation, failure, paused, and sold-out states without timers pretending to contact Solana.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- lib/mint-preview.test.ts && npm run lint`

Expected: reducer tests pass and lint exits 0.

```powershell
git add lib/mint-preview.ts lib/mint-preview.test.ts components/mint app/mint
git commit -m "feat: add honest demo mint instrument"
```

### Task 7: Studio, roadmap, and structured archive

**Files:**
- Replace: `app/roadmap/page.tsx`
- Replace: `app/doc/page.tsx`
- Create: `app/studio/page.tsx`
- Create: `components/roadmap/roadmap-instrument.tsx`
- Create: `components/archive/archive-navigation.tsx`
- Create: `components/archive/disclosure-panel.tsx`

**Interfaces:**
- Consumes: project roadmap, utilities, transparency values, Glass Meter.
- Produces: truthful operational pages with no unreviewed legal claims.

- [ ] **Step 1: Rebuild roadmap**

Render stages Calibration, Registration, Inspection, Modification, and Open System with statuses Active, Scheduled, Planned, Research, and Future. Use expandable technical notes and vertical meters.

- [ ] **Step 2: Build Studio**

Create philosophy, creative process, art system, Solana rationale, role-only contributor list, contact, and transparency fields. Mark each field Confirmed, Pending, or Not applicable.

- [ ] **Step 3: Rebuild documentation archive**

Group Project, Minting, Solana, Holder, and Legal documents. Replace the existing false finality/legal language with concise educational content and the visible warning `Placeholder policy — obtain qualified legal review before launch.`

- [ ] **Step 4: Verify and commit**

Run: `npm run lint`

Expected: exit 0.

```powershell
git add app/roadmap app/doc app/studio components/roadmap components/archive
git commit -m "feat: add studio roadmap and archive"
```

### Task 8: Metadata, operations documentation, and final verification

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/opengraph-image.tsx`
- Create: `.env.example`
- Replace: `README.md`

**Interfaces:**
- Consumes: `projectConfig` and all public routes.
- Produces: share metadata, crawl configuration, setup/deployment/replacement guidance.

- [ ] **Step 1: Add SEO and social metadata**

Set canonical metadata, title template, description, Open Graph, Twitter card, and JSON-LD for a creative project without claiming a real deployed collection. Generate the Open Graph image with `ImageResponse` using the NULL/FORM wordmark and Glass Meter motif.

- [ ] **Step 2: Add environment and operations guidance**

`.env.example` must contain only public configuration keys:

```dotenv
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_COLLECTION_ADDRESS=
NEXT_PUBLIC_MINT_PROGRAM_ADDRESS=
NEXT_PUBLIC_MINT_PRICE_SOL=1.25
NEXT_PUBLIC_TOTAL_SUPPLY=3333
NEXT_PUBLIC_MINT_ENABLED=false
NEXT_PUBLIC_DEMO_MODE=true
```

README documents install, dev, test, build, deployment, artwork replacement, address replacement, demo-mode guarantees, wallet testing, and the rule that secrets/signing authorities never belong in browser variables.

- [ ] **Step 3: Run the complete automated verification**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all tests pass; ESLint exits 0; Next.js production build exits 0 and lists every intended route.

- [ ] **Step 4: Run manual safety and visual checks**

Start `npm run dev`. Inspect `/`, `/collection`, one object detail, `/mint`, `/studio`, `/roadmap`, and `/doc` at desktop and mobile widths. Verify keyboard navigation and reduced motion. With no wallet extension, confirm recovery guidance. With an installed Wallet Standard wallet, confirm explicit connect and disconnect. Confirm no action opens a signature request or creates a transaction.

- [ ] **Step 5: Commit final operations work**

```powershell
git add app/layout.tsx app/sitemap.ts app/robots.ts app/opengraph-image.tsx .env.example README.md
git commit -m "docs: finish null form launch guidance"
```

