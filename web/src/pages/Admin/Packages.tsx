import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api, apiRoutes } from "@/lib/api";
import type { Package } from "@/types";
import { Badge } from "@/components/ui/Badge";

export function AdminPackages() {
  const { data: list, isLoading } = useQuery({
    queryKey: ["packages", "all"],
    queryFn: () => api<{ packages: Package[]; page: number }>(apiRoutes.packages({ page: 1 })),
  });
  const packages = list?.packages ?? [];

  return (
    <div>
      <h1 className="font-sans text-2xl font-semibold text-ds-text mb-6">Packages (moderation)</h1>
      {isLoading ? (
        <p className="text-ds-muted">Loading…</p>
      ) : (
        <div className="border border-ds-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ds-border bg-ds-surface">
                <th className="text-left px-4 py-2 font-semibold text-ds-text">Package</th>
                <th className="text-left px-4 py-2 font-semibold text-ds-text">Downloads</th>
                <th className="text-left px-4 py-2 font-semibold text-ds-text">Verified</th>
                <th className="text-left px-4 py-2 font-semibold text-ds-text">Trusted</th>
                <th className="text-left px-4 py-2 font-semibold text-ds-text">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-ds-border last:border-0">
                  <td className="px-4 py-2">
                    <Link to={`/packages/${pkg.name}`} className="font-mono text-ds-text hover:underline">
                      {pkg.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-ds-muted">
                    {typeof pkg.total_downloads === "number" ? pkg.total_downloads.toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-2">
                    {pkg.verified ? <Badge variant="verified">Yes</Badge> : <span className="text-ds-muted">—</span>}
                  </td>
                  <td className="px-4 py-2">
                    {pkg.trusted ? <Badge variant="trusted">Yes</Badge> : <span className="text-ds-muted">—</span>}
                  </td>
                  <td className="px-4 py-2">
                    <Link to={`/packages/${pkg.name}`} className="text-ds-muted hover:text-ds-text text-xs">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
