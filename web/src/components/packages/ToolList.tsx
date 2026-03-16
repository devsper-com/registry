interface ToolListProps {
  tools: string[];
}

export function ToolList({ tools }: ToolListProps) {
  if (!tools.length) return null;
  return (
    <div>
      <h4 className="font-mono text-xs tracking-wider uppercase text-ds-muted mb-2">
        Tools provided
      </h4>
      <ul className="flex flex-wrap gap-2">
        {tools.map((t) => (
          <li
            key={t}
            className="px-2 py-1 bg-ds-surface border border-ds-border font-mono text-sm text-ds-text-passive"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
