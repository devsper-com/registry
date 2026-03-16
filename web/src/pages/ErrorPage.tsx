import { useSearchParams, Link } from "react-router-dom";

export function ErrorPage() {
  const [params] = useSearchParams();
  const code = params.get("code") ?? "unknown_error";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-ds-bg bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="relative w-full max-w-md border border-ds-border rounded-lg bg-ds-surface/80 p-8 shadow-xl">
        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-ds-muted rounded-tl" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-ds-muted rounded-br" />

        <div className="flex flex-col items-center text-center space-y-4">
          <span className="inline-block px-3 py-1 text-sm font-bold tracking-wider text-white border-2 border-violet-500/80 rounded">
            ERROR
          </span>
          <h1 className="font-sans text-xl font-semibold text-ds-text">
            Something went wrong
          </h1>
          <p className="text-ds-muted text-sm">
            CODE:{" "}
            <code className="px-2 py-0.5 bg-ds-bg border border-ds-border rounded font-mono text-ds-text text-xs">
              {code}
            </code>
          </p>
          <p className="text-ds-text-passive text-sm max-w-sm">
            We encountered an unexpected error. Please try again or return to the
            home page. If you&apos;re a developer, you can find more information
            about the error{" "}
            <a
              href="https://www.better-auth.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
            >
              here
            </a>
            .
          </p>
          <div className="flex gap-3 pt-2">
            <Link
              to="/"
              className="px-4 py-2 rounded border border-ds-border text-ds-text hover:bg-ds-border/50 transition-colors text-sm font-medium"
            >
              Go Home
            </Link>
            <a
              href="https://github.com/devsper-com/registry/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-ds-border text-ds-text hover:bg-ds-muted transition-colors text-sm font-medium"
            >
              Ask AI / Report
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
