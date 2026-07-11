import { NextRequest, NextResponse } from "next/server";

const SOLANA_RPC = "https://api.mainnet-beta.solana.com";

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();

        const response = await fetch(SOLANA_RPC, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
            cache: "no-store",
        });

        const data = await response.text();

        return new NextResponse(data, {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch {
        return NextResponse.json(
            { jsonrpc: "2.0", error: { code: -32000, message: "RPC proxy failed" }, id: null },
            { status: 502 },
        );
    }
}
