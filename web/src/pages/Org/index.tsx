import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api, apiRoutes } from "@/lib/api";
import type { Org } from "@/types";
import { Sidebar } from "@/components/layout/Sidebar";

export function OrgIndex() {
  const { slug } = useParams<{ slug: string }>();
  const { data: org } = useQuery({
    queryKey: ["org", slug],
    queryFn: () => api<Org>(apiRoutes.org(slug!)),
    enabled: !!slug,
  });

  return (
    <div className="flex gap-8">
      <Sidebar variant="org" />
      <div className="flex-1 min-w-0">
        <h1 className="font-sans text-2xl font-semibold text-ds-text mb-2">
          {org?.display_name ?? slug}
        </h1>
        <p className="text-ds-muted mb-6">Organization overview</p>
        <div className="flex flex-wrap gap-4">
          <Link to={`/org/${slug}/members`} className="text-ds-text hover:underline">Members</Link>
          <Link to={`/org/${slug}/sso`} className="text-ds-text hover:underline">SSO</Link>
          <Link to={`/org/${slug}/packages`} className="text-ds-text hover:underline">Packages</Link>
        </div>
      </div>
    </div>
  );
}
