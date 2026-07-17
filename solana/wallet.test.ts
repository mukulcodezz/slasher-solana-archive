import { describe, expect, it } from "vitest";
import { normalizeWalletError } from "./wallet";

describe("normalizeWalletError", () => {
  it("recognizes a rejected connection", () => {
    expect(normalizeWalletError(new Error("User rejected the request"))).toEqual({
      kind: "rejected",
      message: "Connection was cancelled in your wallet.",
    });
  });

  it("recognizes an unavailable wallet", () => {
    expect(normalizeWalletError(new Error("No wallet connector available")).kind).toBe("unavailable");
  });

  it("recognizes an RPC provider error", () => {
    expect(normalizeWalletError(new Error("RPC endpoint unavailable")).kind).toBe("provider");
  });

  it("provides a safe unknown fallback", () => {
    expect(normalizeWalletError({ bad: true })).toEqual({
      kind: "unknown",
      message: "Wallet connection could not be completed.",
    });
  });
});
