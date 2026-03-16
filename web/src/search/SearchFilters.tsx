import { useSearchParams } from "react-router-dom";

export function SearchFilters() {
  const [params, setParams] = useSearchParams();
  const verifiedOnly = params.get("verified") === "1";
  const sort = params.get("sort") ?? "relevance";

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-2 font-sans text-sm">
      <label className="flex items-center gap-2 text-ds-muted">
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={(e) => update("verified", e.target.checked ? "1" : null)}
          className="rounded border-ds-border"
        />
        Verified only
      </label>
      <select
        value={sort}
        onChange={(e) => update("sort", e.target.value)}
        className="bg-ds-surface border border-ds-border px-2 py-1 text-ds-text focus:outline-none focus:border-ds-muted"
      >
        <option value="relevance">Relevance</option>
        <option value="downloads">Downloads</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}
