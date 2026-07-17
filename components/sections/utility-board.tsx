import { projectConfig } from "@/config/project";

export function UtilityBoard() {
  return (
    <section className="utility-board page-frame reveal">
      <h2 className="section-title">Utility designed to be deliverable.</h2>
      <div className="utility-board__instrument">
        <div className="utility-board__scope">
          <span>Holder interface</span>
          <strong>6 MODULES</strong>
          <p>No passive income, guaranteed value, or imaginary metaverse promises.</p>
        </div>
        <div className="utility-board__modules">
          {projectConfig.utilities.map((utility) => (
            <details key={utility.name}>
              <summary>
                <span>{utility.name}</span>
                <small>{utility.availability}</small>
              </summary>
              <p>{utility.summary}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
