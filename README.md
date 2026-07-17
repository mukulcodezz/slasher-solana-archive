# SLASHER

SLASHER is a premium Solana collection experience for 42 original diagonal-mark artworks. It is built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and the current Solana React client stack.

Wallet connection is real. Minting is intentionally a simulation: this repository contains no mint instruction, transaction construction, signature request, signing authority, seed phrase, or treasury secret.

## Local setup

Requires Node.js 20.18 or newer and npm.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Verification

```powershell
npm test
npm run lint
npm run build
```

## Product routes

- `/` - flagship SLASHER experience
- `/collection` - filterable 42-piece catalogue
- `/collection/[slug]` - static artwork inspection pages
- `/mint` - transaction-free mint state preview
- `/studio` - art system and transparency record
- `/roadmap` - operational project stages
- `/doc` - project, minting, Solana, holder, and legal archive

## Artwork

The original collection files and source metadata live in `public/nft` and `components/nfts.json`. `data/objects.ts` maps every supplied NFT to a unique route and complete trait record.

The generated campaign artwork lives at `public/images/slasher-banner.png`. It is used as the hero, editorial backdrop, studio image, and social preview. It was composed from the visual language of the real collection rather than unrelated stock imagery.

## Wallet behavior

Wallets are discovered through Wallet Standard by `@solana/client` and `@solana/react-hooks`. Connection is always user-initiated and auto-connect is disabled. The site does not query or fabricate wallet balances.

## Configuration

Public project values live in `config/project.ts`; browser-safe overrides are documented in `.env.example`. Never place private keys, seed phrases, treasury secrets, API secrets, or signing-authority credentials in `NEXT_PUBLIC_*` variables.

Collection and mint program addresses remain empty until reviewed production values are available. Explorer controls remain unavailable while those values are empty.

## Adding a production mint later

Keep transaction code outside the existing UI components. Add a dedicated Solana service boundary, test it on devnet, and replace only the demo reducer after independent program and security review. A production release also needs verified addresses, simulation, explicit signature intent, confirmation polling, metadata reads, legal review, and mobile-wallet failure testing.

The default `https://slasher.example` URL is documentation-only and must be replaced before deployment.
