export function PublishGuide() {
  return (
    <div className="max-w-prose">
      <h1 className="font-sans text-2xl font-semibold text-ds-text mb-4">
        Publish a plugin
      </h1>
      <p className="text-ds-text-passive mb-6">
        Use the registry index when building and publishing your devsper plugin.
      </p>
      <div className="bg-ds-code-bg border border-ds-border border-l-4 border-l-ds-violet p-4 font-mono text-sm text-ds-text mb-6">
        <p className="text-ds-muted mb-2"># Configure your package (pyproject.toml)</p>
        <pre className="whitespace-pre-wrap break-words">
{`[tool.setuptools.packages.find]
[tool.devsper]
index-url = "https://registry.devsper.com/simple/"`}
        </pre>
      </div>
      <p className="text-ds-muted text-sm">
        After registering and logging in, create a package and upload wheels or sdists via the dashboard or API.
        Verification (safety, pip-audit, bandit) runs automatically before a version is published.
      </p>
    </div>
  );
}
