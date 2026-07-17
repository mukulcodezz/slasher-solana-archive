import Image from "next/image";
import { shortAddress } from "../../lib/format";

export interface WalletMenuConnector {
  id: string;
  name: string;
  icon?: string;
}

interface WalletMenuProps {
  address: string;
  connected: boolean;
  connecting: boolean;
  connectors: readonly WalletMenuConnector[];
  errorMessage: string;
  explorerHref?: string;
  onClose(): void;
  onConnect(id: string): void;
  onDisconnect(): void;
}

export function WalletMenu({
  address,
  connected,
  connecting,
  connectors,
  errorMessage,
  explorerHref = "#",
  onClose,
  onConnect,
  onDisconnect,
}: WalletMenuProps) {
  return (
    <div
      aria-label="Wallet connection"
      aria-modal="true"
      className="wallet-menu"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      role="dialog"
    >
      <div className="wallet-menu__head">
        <p>Wallet interface</p>
        <button aria-label="Close wallet menu" onClick={onClose} type="button">
          Close
        </button>
      </div>

      {connected ? (
        <div className="wallet-menu__connected">
          <p className="wallet-menu__address">{shortAddress(address)}</p>
          <dl>
            <div><dt>Network</dt><dd>Solana devnet</dd></div>
            <div><dt>Balance</dt><dd>Balance not queried</dd></div>
            <div><dt>Authority</dt><dd>Connection only</dd></div>
          </dl>
          <div className="wallet-menu__actions">
            <button
              onClick={() => navigator.clipboard?.writeText(address)}
              type="button"
            >
              Copy address
            </button>
            <a href={explorerHref} rel="noreferrer" target="_blank">View on Explorer</a>
            <button aria-label="Disconnect wallet" onClick={onDisconnect} type="button">
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="wallet-menu__wallets">
          <p>Select an installed Wallet Standard wallet. This site will not request a transaction.</p>
          {connectors.length > 0 ? connectors.map((connector) => (
            <button
              aria-label={`Connect ${connector.name}`}
              disabled={connecting}
              key={connector.id}
              onClick={() => onConnect(connector.id)}
              type="button"
            >
              <span className="wallet-menu__wallet-name">
                {connector.icon ? (
                  <Image alt="" height={28} src={connector.icon} unoptimized width={28} />
                ) : null}
                {connector.name}
              </span>
              <span>{connecting ? "Opening" : "Connect"}</span>
            </button>
          )) : (
            <div className="wallet-menu__empty">
              <strong>No compatible wallet detected</strong>
              <span>Install Phantom, Solflare, Backpack, or another Wallet Standard wallet.</span>
            </div>
          )}
        </div>
      )}

      {errorMessage ? <p className="wallet-menu__error" role="alert">{errorMessage}</p> : null}
      <p className="wallet-menu__security">NTH/OBJECT will never request your seed phrase.</p>
    </div>
  );
}
