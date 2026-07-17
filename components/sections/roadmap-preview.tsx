import Link from "next/link";
import { GlassMeter } from "@/components/meters/glass-meter";
import { projectConfig } from "@/config/project";

export function RoadmapPreview() {
  return (
    <section className="roadmap-preview page-frame reveal">
      <div className="roadmap-preview__title">
        <h2>Operational stages, not fundraising theatre.</h2>
        <Link className="text-action" href="/roadmap">Read technical roadmap</Link>
      </div>
      <div className="roadmap-preview__track">
        {projectConfig.roadmap.map((stage) => (
          <article key={stage.code}>
            <GlassMeter display={`${stage.progress}%`} label={stage.status} value={stage.progress} />
            <h3>{stage.code}</h3>
            <p>{stage.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
