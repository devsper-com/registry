import type { PackageFile } from "@/types";

const REGISTRY_SIMPLE = import.meta.env.VITE_REGISTRY_URL?.replace(/\/?$/, "") ?? "https://registry.devsper.com/simple";

interface FileListProps {
  packageName: string;
  files: PackageFile[];
}

export function FileList({ packageName, files }: FileListProps) {
  return (
    <div className="border border-ds-border overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ds-border bg-ds-surface">
            <th className="text-left px-4 py-2 font-semibold text-ds-text">Filename</th>
            <th className="text-left px-4 py-2 font-semibold text-ds-text">Type</th>
            <th className="text-left px-4 py-2 font-semibold text-ds-text">Size</th>
            <th className="text-left px-4 py-2 font-semibold text-ds-text">SHA256</th>
          </tr>
        </thead>
        <tbody>
          {files.map((f) => (
            <tr key={f.id} className="border-b border-ds-border last:border-0 hover:bg-ds-surface/50">
              <td className="px-4 py-2">
                <a
                  href={`${REGISTRY_SIMPLE}/${packageName}/${f.filename}`}
                  className="text-ds-text hover:underline font-mono break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {f.filename}
                </a>
              </td>
              <td className="px-4 py-2 text-ds-muted">{f.filetype}</td>
              <td className="px-4 py-2 font-mono text-ds-text-passive">
                {(f.size_bytes / 1024).toFixed(1)} KB
              </td>
              <td className="px-4 py-2 font-mono text-ds-muted text-xs truncate max-w-[12ch]" title={f.sha256}>
                {f.sha256.slice(0, 16)}…
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
