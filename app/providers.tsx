"use client";

import type { CreateDefaultClientOptions } from "@solana/client";
import { SolanaProvider } from "@solana/react-hooks";

const solanaConfig: CreateDefaultClientOptions = {
  cluster: "devnet",
  rpc: process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
  websocket: "wss://api.devnet.solana.com",
  walletConnectors: "default",
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SolanaProvider
      config={solanaConfig}
      walletPersistence={{ autoConnect: false, storage: null }}
    >
      {children}
    </SolanaProvider>
  );
}
