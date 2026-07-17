import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WalletMenu } from "./wallet-menu";

afterEach(cleanup);

describe("WalletMenu", () => {
  it("connects only after a wallet is selected", () => {
    const onConnect = vi.fn();
    render(
      <WalletMenu
        address=""
        connected={false}
        connecting={false}
        connectors={[{ id: "phantom", name: "Phantom", icon: "" }]}
        errorMessage=""
        onClose={() => undefined}
        onConnect={onConnect}
        onDisconnect={() => undefined}
      />,
    );

    expect(onConnect).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Connect Phantom" }));
    expect(onConnect).toHaveBeenCalledOnce();
    expect(onConnect).toHaveBeenCalledWith("phantom");
  });

  it("shows the transaction-free connected state", () => {
    render(
      <WalletMenu
        address="1234567890abcdefghijklmnop"
        connected
        connecting={false}
        connectors={[]}
        errorMessage=""
        onClose={() => undefined}
        onConnect={() => undefined}
        onDisconnect={() => undefined}
      />,
    );

    expect(screen.getByText("1234…mnop")).toBeTruthy();
    expect(screen.getByText("Balance not queried")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Disconnect wallet" })).toBeTruthy();
  });
});
