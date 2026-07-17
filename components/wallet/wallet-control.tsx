"use client";

import { useEffect, useRef, useState } from "react";
import { useWalletConnection } from "@solana/react-hooks";
import { projectConfig } from "@/config/project";
import { explorerAddressUrl, shortAddress } from "@/lib/format";
import { normalizeWalletError } from "@/solana/wallet";
import { WalletMenu } from "./wallet-menu";

export function WalletControl() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [localError, setLocalError] = useState("");
  const wallet = useWalletConnection();
  const address = wallet.wallet?.account.address.toString() ?? "";

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  async function connect(connectorId: string) {
    setLocalError("");
    try {
      await wallet.connect(connectorId, { autoConnect: false });
    } catch (error) {
      setLocalError(normalizeWalletError(error).message);
    }
  }

  async function disconnect() {
    setLocalError("");
    try {
      await wallet.disconnect();
      setIsOpen(false);
      triggerRef.current?.focus();
    } catch (error) {
      setLocalError(normalizeWalletError(error).message);
    }
  }

  const hookError = wallet.error ? normalizeWalletError(wallet.error).message : "";

  return (
    <div className="wallet-control">
      <button
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="wallet-control__trigger"
        disabled={!wallet.isReady}
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        <span className="wallet-control__indicator" aria-hidden="true" />
        {wallet.connected ? shortAddress(address) : wallet.isReady ? "Connect wallet" : "Detecting wallets"}
      </button>

      {isOpen ? (
        <WalletMenu
          address={address}
          connected={wallet.connected}
          connecting={wallet.connecting}
          connectors={wallet.connectors}
          errorMessage={localError || hookError}
          explorerHref={address ? explorerAddressUrl(address, projectConfig.cluster) : "#"}
          onClose={() => {
            setIsOpen(false);
            triggerRef.current?.focus();
          }}
          onConnect={connect}
          onDisconnect={disconnect}
        />
      ) : null}
    </div>
  );
}
