import type { MintPreviewStatus } from "@/types/project";

export interface MintPreviewState {
  status: MintPreviewStatus;
  quantity: number;
  termsAccepted: boolean;
}

export type MintPreviewEvent =
  | { type: "SET_QUANTITY"; quantity: number }
  | { type: "TOGGLE_TERMS" }
  | { type: "START"; walletConnected: boolean }
  | { type: "ADVANCE" }
  | { type: "CANCEL" }
  | { type: "FAIL" }
  | { type: "SET_AVAILABILITY"; status: "paused" | "sold-out" }
  | { type: "RESET" };

export const initialMintPreviewState: MintPreviewState = {
  status: "ready",
  quantity: 1,
  termsAccepted: false,
};

export function mintPreviewReducer(state: MintPreviewState, event: MintPreviewEvent): MintPreviewState {
  if (event.type === "RESET") return initialMintPreviewState;
  if (event.type === "SET_QUANTITY") {
    return { ...state, quantity: Math.min(3, Math.max(1, Math.round(event.quantity))) };
  }
  if (event.type === "TOGGLE_TERMS") return { ...state, termsAccepted: !state.termsAccepted };
  if (event.type === "CANCEL") return { ...state, status: "cancelled" };
  if (event.type === "FAIL") return { ...state, status: "failed" };
  if (event.type === "SET_AVAILABILITY") return { ...state, status: event.status };
  if (event.type === "START") {
    if (!event.walletConnected) return { ...state, status: "wallet-required" };
    if (!state.termsAccepted) return { ...state, status: "terms-required" };
    return { ...state, status: "preparing" };
  }
  if (event.type === "ADVANCE" && state.status === "preparing") {
    return { ...state, status: "signature-preview" };
  }
  if (event.type === "ADVANCE" && state.status === "signature-preview") {
    return { ...state, status: "complete-preview" };
  }
  return state;
}
