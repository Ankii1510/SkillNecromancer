import type { SkillPack } from "../../core/types";

const riskColor: Record<string, string> = {
  read: "text-[var(--mist)]",
  mutate: "text-[var(--bone)]",
  destructive: "text-[var(--ember)]",
};

export function SkillCard({ pack }: { pack: SkillPack }) {
  return (
    <article className="panel rise-in rounded-2xl p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
          {pack.frontmatter.name}
        </h3>
        <span
          className={`text-[11px] uppercase tracking-[0.18em] ${riskColor[pack.frontmatter.risk]}`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {pack.frontmatter.risk}
        </span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">{pack.frontmatter.description}</p>
      <div className="flex flex-wrap gap-2">
        {pack.frontmatter.triggers.slice(0, 4).map((trigger) => (
          <span
            key={trigger}
            className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] text-[var(--bone)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {trigger}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-[var(--muted)]" style={{ fontFamily: "var(--font-mono)" }}>
        {pack.path} · v{pack.frontmatter.version}
      </p>
    </article>
  );
}
