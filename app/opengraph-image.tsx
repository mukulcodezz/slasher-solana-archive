import { ImageResponse } from "next/og";

export const alt = "SLASHER diagonal mark archive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 64,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
        background: "#f0eee7",
        color: "#10100f",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontSize: 24, letterSpacing: 2 }}>SLASHER</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ maxWidth: 750, fontSize: 112, fontWeight: 700, lineHeight: .82, letterSpacing: -8 }}>
            ONE MARK.
          </div>
          <div style={{ marginTop: 24, fontSize: 30 }}>Forty-two states on Solana.</div>
        </div>
        <div style={{ fontSize: 16, color: "#5d5d57" }}>TRANSACTION-FREE INTERFACE PREVIEW</div>
      </div>
      <div style={{ width: 180, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            border: "2px solid rgba(16,16,15,.35)",
            background: "rgba(255,255,255,.35)",
          }}
        >
          <div style={{ width: "100%", height: "68%", background: "#b6f23d" }} />
        </div>
        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", fontSize: 14 }}>
          <span>SUPPLY</span><strong>42</strong>
        </div>
      </div>
    </div>,
    size,
  );
}
