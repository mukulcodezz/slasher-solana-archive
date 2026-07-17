import { describe, expect, it } from "vitest";
import { explorerAddressUrl, shortAddress } from "./format";

describe("wallet formatting", () => {
  it("shortens long addresses", () => {
    expect(shortAddress("1234567890abcdefghijklmnop")).toBe("1234…mnop");
  });

  it("keeps short addresses intact", () => {
    expect(shortAddress("short-key")).toBe("short-key");
  });

  it("creates a devnet explorer address URL", () => {
    expect(explorerAddressUrl("abc", "devnet")).toBe(
      "https://explorer.solana.com/address/abc?cluster=devnet",
    );
  });

  it("omits a cluster query for mainnet", () => {
    expect(explorerAddressUrl("abc", "mainnet-beta")).toBe(
      "https://explorer.solana.com/address/abc",
    );
  });
});
