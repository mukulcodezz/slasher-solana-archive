import Header from "@/components/header";
import { RoadmapInstrument } from "@/components/roadmap/roadmap-instrument";
import { projectConfig } from "@/config/project";

export default function RoadmapPage() {
  return (
    <main className="page-shell">
      <Header />
      <section className="roadmap-hero page-frame">
        <p className="eyebrow">Operational sequence</p>
        <h1>Build what can be maintained.</h1>
        <p>Progress is tied to concrete art, product, security, and documentation work. Dates remain secondary to readiness.</p>
      </section>
      <section className="roadmap-list page-frame">
        {projectConfig.roadmap.map((stage) => <RoadmapInstrument key={stage.code} stage={stage} />)}
      </section>
    </main>
  );
}
