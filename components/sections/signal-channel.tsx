import Image from "next/image";

const FEED = [
  { type: "Development log", date: "17 JUL 2026", text: "Wallet Standard discovery connected to the interface layer." },
  { type: "Archive update", date: "12 JUL 2026", text: "Object classes and material definitions entered calibration." },
  { type: "Release alert", date: "PENDING", text: "Official public channels are not configured." },
];

export function SignalChannel() {
  return (
    <section className="signal-channel reveal">
      <Image alt="Five industrial sculptures arranged on a dark museum stage" fill sizes="100vw" src="/images/nth-object-signal.png" />
      <div className="signal-channel__veil" />
      <div className="signal-channel__content page-frame">
        <p className="eyebrow">Signal channel</p>
        <h2>One source for project state.</h2>
        <div className="signal-channel__grid">
          <div className="signal-feed">
            {FEED.map((item) => (
              <article key={item.type}>
                <div><span>{item.type}</span><time>{item.date}</time></div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <form className="archive-assistant">
            <label htmlFor="archive-question">Archive assistant</label>
            <p>Future interface for collection lore, traits, mint instructions, holder utility, and documentation.</p>
            <div>
              <input disabled id="archive-question" placeholder="Archive intelligence module - integration pending." type="text" />
              <button disabled type="submit">Ask archive</button>
            </div>
            <small>No OpenAI service is connected.</small>
          </form>
        </div>
      </div>
    </section>
  );
}
