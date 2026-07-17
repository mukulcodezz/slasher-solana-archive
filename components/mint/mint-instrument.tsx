"use client";

import Image from "next/image";
import { useReducer } from "react";
import { useWalletConnection } from "@solana/react-hooks";
import { GlassMeter } from "@/components/meters/glass-meter";
import { WalletControl } from "@/components/wallet/wallet-control";
import { projectConfig } from "@/config/project";
import { initialMintPreviewState, mintPreviewReducer } from "@/lib/mint-preview";
import { TransactionStatus } from "./transaction-status";

export function MintInstrument() {
  const wallet = useWalletConnection();
  const [state, dispatch] = useReducer(mintPreviewReducer, initialMintPreviewState);
  const networkFee = 0.00001;
  const total = state.quantity * projectConfig.priceSol + networkFee;
  const canAdvance = state.status === "preparing" || state.status === "signature-preview";

  return (
    <div className="mint-instrument">
      <div className="mint-instrument__art">
        <Image alt="SLASHER registration preview artwork" fill priority sizes="(max-width: 768px) 100vw, 50vw" src="/nft/slash_001.png" />
        <div className="mint-instrument__art-meter">
          <GlassMeter display="42" label="Total supply" tone="signal" value={82} />
        </div>
      </div>

      <div className="mint-instrument__controls">
        <div className="mint-instrument__heading">
          <span className="mono-label">Registration instrument</span>
          <h1>Mint interface preview.</h1>
          <p>Connect a wallet and inspect every state. No transaction, signature, or SOL transfer can be created.</p>
        </div>

        <div className="mint-wallet-row">
          <div><span>Wallet state</span><strong>{wallet.connected ? "Connected" : "Not connected"}</strong></div>
          <WalletControl />
        </div>

        <div className="quantity-control">
          <span>Quantity</span>
          <div>
            <button onClick={() => dispatch({ type: "SET_QUANTITY", quantity: state.quantity - 1 })} type="button">-</button>
            <strong>{state.quantity}</strong>
            <button onClick={() => dispatch({ type: "SET_QUANTITY", quantity: state.quantity + 1 })} type="button">+</button>
          </div>
        </div>

        <dl className="price-breakdown">
          <div><dt>Object price</dt><dd>{projectConfig.priceSol.toFixed(2)} SOL</dd></div>
          <div><dt>Quantity</dt><dd>{state.quantity}</dd></div>
          <div><dt>Estimated network fee</dt><dd>{networkFee.toFixed(5)} SOL</dd></div>
          <div><dt>Wallet balance</dt><dd>Not queried</dd></div>
          <div className="price-breakdown__total"><dt>Preview requirement</dt><dd>{total.toFixed(5)} SOL</dd></div>
        </dl>

        <label className="terms-control">
          <input checked={state.termsAccepted} onChange={() => dispatch({ type: "TOGGLE_TERMS" })} type="checkbox" />
          <span>I understand this is a transaction-free interface preview.</span>
        </label>

        <TransactionStatus status={state.status} />

        <div className="mint-instrument__actions">
          <button
            className="primary-action"
            onClick={() => dispatch(canAdvance ? { type: "ADVANCE" } : { type: "START", walletConnected: wallet.connected })}
            type="button"
          >
            {canAdvance ? "Advance preview" : "Preview mint"}
          </button>
          <button className="secondary-action" onClick={() => dispatch({ type: "RESET" })} type="button">Reset</button>
        </div>

        <details className="state-simulator">
          <summary>Inspect alternate states</summary>
          <div>
            <button onClick={() => dispatch({ type: "CANCEL" })} type="button">Cancelled</button>
            <button onClick={() => dispatch({ type: "FAIL" })} type="button">Failure</button>
            <button onClick={() => dispatch({ type: "SET_AVAILABILITY", status: "paused" })} type="button">Paused</button>
            <button onClick={() => dispatch({ type: "SET_AVAILABILITY", status: "sold-out" })} type="button">Sold out</button>
          </div>
        </details>

        <p className="demo-disclosure">Preview mode - mint program not connected.</p>
      </div>
    </div>
  );
}
