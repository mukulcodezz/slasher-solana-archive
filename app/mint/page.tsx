import { SiteHeader } from "@/components/layout/site-header";
import { MintInstrument } from "@/components/mint/mint-instrument";

export default function MintPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <MintInstrument />
    </main>
  );
}
