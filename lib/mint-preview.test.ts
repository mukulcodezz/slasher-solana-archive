import { describe, expect, it } from "vitest";
import { initialMintPreviewState, mintPreviewReducer } from "./mint-preview";

describe("mintPreviewReducer", () => {
  it("requires a wallet before previewing", () => {
    expect(mintPreviewReducer(initialMintPreviewState, { type: "START", walletConnected: false }).status)
      .toBe("wallet-required");
  });

  it("requires terms after wallet connection", () => {
    expect(mintPreviewReducer(initialMintPreviewState, { type: "START", walletConnected: true }).status)
      .toBe("terms-required");
  });

  it("caps quantity at the configured maximum", () => {
    expect(mintPreviewReducer(initialMintPreviewState, { type: "SET_QUANTITY", quantity: 99 }).quantity)
      .toBe(3);
  });

  it("finishes only as a preview", () => {
    const ready = { ...initialMintPreviewState, termsAccepted: true };
    const preparing = mintPreviewReducer(ready, { type: "START", walletConnected: true });
    const signaturePreview = mintPreviewReducer(preparing, { type: "ADVANCE" });
    const completePreview = mintPreviewReducer(signaturePreview, { type: "ADVANCE" });

    expect(completePreview.status).toBe("complete-preview");
    expect(completePreview).not.toHaveProperty("signature");
  });
});
