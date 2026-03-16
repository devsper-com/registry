import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-ds-border py-ds-lg px-ds-lg bg-ds-bg">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6">
          <Link to="/" className="font-mono text-[9px] tracking-widest uppercase text-ds-muted hover:text-ds-text transition-opacity">
            Registry
          </Link>
          <Link to="/search" className="font-mono text-[9px] tracking-widest uppercase text-ds-muted hover:text-ds-text transition-opacity">
            Search
          </Link>
          <Link to="/publish" className="font-mono text-[9px] tracking-widest uppercase text-ds-muted hover:text-ds-text transition-opacity">
            Publish
          </Link>
          <a
            href="https://docs.devsper.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] tracking-widest uppercase text-ds-muted hover:text-ds-text transition-opacity"
          >
            Docs
          </a>
          <a
            href="https://github.com/devsper-com/registry"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] tracking-widest uppercase text-ds-muted hover:text-ds-text transition-opacity"
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
