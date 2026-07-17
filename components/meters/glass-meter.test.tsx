import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { GlassMeter } from "./glass-meter";

afterEach(cleanup);

describe("GlassMeter", () => {
  it("clamps its accessible value", () => {
    render(<GlassMeter display="3333" label="Supply" value={140} />);
    expect(screen.getByRole("meter").getAttribute("aria-valuenow")).toBe("100");
  });

  it("renders the configured label and display", () => {
    render(<GlassMeter display="72%" label="Calibration" value={72} />);
    expect(screen.getByText("Calibration")).toBeTruthy();
    expect(screen.getByText("72%")).toBeTruthy();
  });
});
