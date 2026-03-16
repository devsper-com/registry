import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-ds-lg px-ds-lg bg-ds-bg">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <img src="/branding/logo.svg" alt="Devsper" className="w-6 h-6 opacity-50 grayscale" />
          <Link to="/" className="font-mono text-[9px] tracking-widest uppercase text-ds-muted hover:text-orchid transition-colors">
            Registry
          </Link>
          <Link to="/search" className="font-mono text-[9px] tracking-widest uppercase text-ds-muted hover:text-orchid transition-colors">
            Search
          </Link>
          <Link to="/publish" className="font-mono text-[9px] tracking-widest uppercase text-ds-muted hover:text-orchid transition-colors">
            Publish
          </Link>
          <a
            href="https://docs.devsper.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] tracking-widest uppercase text-ds-muted hover:text-orchid transition-colors"
          >
            Docs
          </a>
          <a
            href="https://github.com/devsper-com/registry"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] tracking-widest uppercase text-ds-muted hover:text-orchid transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="font-mono text-[9px] tracking-widest uppercase text-ds-muted">
          Devsper Registry · registry.devsper.com
        </p>
      </div>
    </footer>
  );
}
