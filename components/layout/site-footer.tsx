import Link from "next/link";
import { projectConfig } from "@/config/project";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <Link className="wordmark wordmark--footer" href="/">SLASHER</Link>
        <p>A finite archive of 42 diagonal marks.</p>
      </div>
      <div className="site-footer__grid">
        <div>
          <span className="footer-label">Network</span>
          <strong>Solana {projectConfig.cluster}</strong>
          <span>Collection address unconfigured</span>
        </div>
        <div>
          <span className="footer-label">Index</span>
          <Link href="/collection">Collection</Link>
          <Link href="/mint">Mint preview</Link>
          <Link href="/studio">The Studio</Link>
        </div>
        <div>
          <span className="footer-label">Policies</span>
          <Link href="/doc">Terms and risk</Link>
          <Link href="/doc">Holder license</Link>
          <span>Legal review pending</span>
        </div>
        <div>
          <span className="footer-label">Channels</span>
          <span>Discord unconfigured</span>
          <span>X unconfigured</span>
          <span>Signal archive pending</span>
        </div>
      </div>
      <div className="site-footer__warning">
        <span>Always verify the official collection address before signing a transaction.</span>
        <span>© 2026 SLASHER</span>
      </div>
    </footer>
  );
}
