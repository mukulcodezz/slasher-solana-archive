import { SiteHeader } from "@/components/layout/site-header";
import { CollectionThesis } from "@/components/sections/collection-thesis";
import { FAQ } from "@/components/sections/faq";
import { FeaturedObjects } from "@/components/sections/featured-objects";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { MintPreviewPanel } from "@/components/sections/mint-preview-panel";
import { ObjectClasses } from "@/components/sections/object-classes";
import { RoadmapPreview } from "@/components/sections/roadmap-preview";
import { SignalChannel } from "@/components/sections/signal-channel";
import { SolanaAnatomy } from "@/components/sections/solana-anatomy";
import { UtilityBoard } from "@/components/sections/utility-board";

export default function HomePage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <Hero />
      <MintPreviewPanel />
      <CollectionThesis />
      <ObjectClasses />
      <FeaturedObjects />
      <SolanaAnatomy />
      <UtilityBoard />
      <RoadmapPreview />
      <SignalChannel />
      <FAQ />
      <FinalCta />
    </main>
  );
}
