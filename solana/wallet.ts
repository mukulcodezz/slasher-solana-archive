export type WalletErrorKind =
  | "unavailable"
  | "rejected"
  | "unsupported"
  | "cluster"
  | "provider"
  | "unknown";

export interface WalletErrorView {
  kind: WalletErrorKind;
  message: string;
}

const ERROR_RULES: ReadonlyArray<{
  match: RegExp;
  view: WalletErrorView;
}> = [
  {
    match: /reject|declin|cancel/i,
    view: { kind: "rejected", message: "Connection was cancelled in your wallet." },
  },
  {
    match: /no wallet|not installed|connector.*available/i,
    view: { kind: "unavailable", message: "No compatible Solana wallet was found." },
  },
  {
    match: /unsupported|mobile environment/i,
    view: { kind: "unsupported", message: "This browser cannot open the selected wallet." },
  },
  {
    match: /cluster|network mismatch/i,
    view: { kind: "cluster", message: "Switch your wallet to the configured Solana network." },
  },
  {
    match: /rpc|endpoint|provider|fetch/i,
    view: { kind: "provider", message: "The Solana connection is temporarily unavailable." },
  },
];

export function normalizeWalletError(error: unknown): WalletErrorView {
  const message = error instanceof Error ? error.message : "";
  return ERROR_RULES.find((rule) => rule.match.test(message))?.view ?? {
    kind: "unknown",
    message: "Wallet connection could not be completed.",
  };
}
