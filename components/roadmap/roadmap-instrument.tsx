import { GlassMeter } from "@/components/meters/glass-meter";
import type { RoadmapStage } from "@/types/project";

export function RoadmapInstrument({ stage }: { stage: RoadmapStage }) {
  return (
    <article className="roadmap-instrument">
      <GlassMeter display={`${stage.progress}%`} label={stage.status} tone={stage.status === "Active" ? "signal" : "ink"} value={stage.progress} />
      <div className="roadmap-instrument__content">
        <span>{stage.code}</span>
        <h2>{stage.title}</h2>
        <ul>
          {stage.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <details>
          <summary>Technical note</summary>
          <p>Timing depends on testing, contributor capacity, security review, and project resources. This stage is not a financial promise.</p>
        </details>
      </div>
    </article>
  );
}
