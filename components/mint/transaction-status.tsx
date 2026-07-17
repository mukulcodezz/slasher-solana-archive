import type { MintPreviewStatus } from "@/types/project";

const LIFECYCLE = [
  "Preparing instruction",
  "Signature preview",
  "Submitting to Solana",
  "Awaiting confirmation",
  "Reading minted asset",
  "Registration complete",
];

const STATUS_COPY: Record<MintPreviewStatus, string> = {
  ready: "Ready to inspect the interface",
  "wallet-required": "Connect a wallet to continue the preview",
  "terms-required": "Acknowledge the preview terms",
  preparing: "Preparing instruction preview",
  "signature-preview": "Signature request preview only",
  "complete-preview": "Preview mode - mint program not connected.",
  cancelled: "Signature preview cancelled",
  failed: "Simulated provider failure",
  paused: "Registration preview paused",
  "sold-out": "Sold-out state preview",
};

export function TransactionStatus({ status }: { status: MintPreviewStatus }) {
  const activeIndex = status === "preparing" ? 0 : status === "signature-preview" ? 1 : status === "complete-preview" ? 5 : -1;
  return (
    <div className="transaction-status" aria-live="polite">
      <strong>{STATUS_COPY[status]}</strong>
      <ol>
        {LIFECYCLE.map((label, index) => (
          <li className={index <= activeIndex ? "is-active" : ""} key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}
