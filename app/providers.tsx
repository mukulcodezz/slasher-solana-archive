"use client";

import type { CreateDefaultClientOptions } from "@solana/client";
import { SolanaProvider } from "@solana/react-hooks";
import { projectConfig } from "@/config/project";

const solanaConfig: CreateDefaultClientOptions = {
  cluster: projectConfig.cluster,
  rpc: projectConfig.rpcUrl,
  websocket: projectConfig.cluster === "mainnet-beta" ? "wss://api.mainnet-beta.solana.com" : "wss://api.devnet.solana.com",
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
