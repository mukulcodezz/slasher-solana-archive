"use client";

import { useEffect } from "react";

const OWNER_ID = "W8gE2HUE5DRmKAqWbGUkAJJ3m1hHoyUdJvvwgujZxTX";
const COLLECTION_ID = "L3v0yGVOEkmz8YFS8w1x";
const SCRIPT_URL = "https://storage.googleapis.com/scriptslmt/0.1.3/solana.js";
const STYLESHEET_URL = "https://storage.googleapis.com/scriptslmt/0.1.3/solana.css";

// LaunchMyNFT's bundled script hardcodes a Helius RPC URL that no longer resolves.
// Browser calls to public RPC endpoints are also blocked, so proxy through our API route.
const DEAD_RPC = "https://rahel-v0lqwp-fast-mainnet.helius-rpc.com/";
const BLOCKED_RPC_PREFIXES = [
    DEAD_RPC,
    "https://rpc.ironforge.network/",
    "https://api.mainnet-beta.solana.com",
];

function getRpcProxyUrl() {
    return `${window.location.origin}/api/solana-rpc`;
}

declare global {
    interface Window {
        ownerId?: string;
        collectionId?: string;
        __lmnftFetchPatched?: boolean;
    }
}

function shouldProxyRpc(url: string) {
    return BLOCKED_RPC_PREFIXES.some((prefix) => url.startsWith(prefix));
}

function patchRpcFetch() {
    if (window.__lmnftFetchPatched) return;

    const proxyUrl = getRpcProxyUrl();
    const originalFetch = window.fetch.bind(window);

    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

        if (shouldProxyRpc(url)) {
            if (input instanceof Request) {
                return originalFetch(new Request(proxyUrl, input));
            }

            return originalFetch(proxyUrl, init);
        }

        return originalFetch(input, init);
    };

    window.__lmnftFetchPatched = true;
}

function loadStylesheet() {
    if (document.getElementById("lmnft-solana-css")) return;

    const link = document.createElement("link");
    link.id = "lmnft-solana-css";
    link.rel = "stylesheet";
    link.href = STYLESHEET_URL;
    document.head.appendChild(link);
}

function loadMintScript() {
    if (document.getElementById("lmnft-solana-script")) return;

    const script = document.createElement("script");
    script.id = "lmnft-solana-script";
    script.type = "module";
    script.src = SCRIPT_URL;
    document.body.appendChild(script);
}

function initLaunchMyNft() {
    const mintButtonContainer = document.getElementById("mint-button-container");
    if (!mintButtonContainer) return;

    window.ownerId = OWNER_ID;
    window.collectionId = COLLECTION_ID;

    patchRpcFetch();
    loadStylesheet();
    loadMintScript();
}

export default function LaunchMyNftEmbed() {
    useEffect(() => {
        // LaunchMyNFT reads #mint-button-container once when solana.js loads.
        // Wait until after React commits the mount targets to the DOM.
        const frameId = requestAnimationFrame(() => {
            initLaunchMyNft();
        });

        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="flex flex-col items-center gap-[12px]">
            <div id="mint-counter" />
            <div id="mint-button-container" />
        </div>
    );
}
