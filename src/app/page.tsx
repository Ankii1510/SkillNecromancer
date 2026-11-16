import Link from "next/link";
import { loadBundledSkills } from "../../core/registry";
import { SkillCard } from "@/components/SkillCard";

export default function HomePage() {
  const { packs, errors } = loadBundledSkills();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 md:px-8 md:pt-14">
      <section className="relative mb-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p
            className="rise-in mb-4 text-[11px] uppercase tracking-[0.28em] text-[var(--acid)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Kiroween 2026 · Skeleton Crew
          </p>
          <h1
            className="rise-in-delay max-w-3xl text-4xl leading-[1.05] text-[var(--bone)] md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SkillNecromancer
          </h1>
          <p className="rise-in-delay-2 mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            A lean AI Skills skeleton for Kiro. Pack reusable <code className="text-[var(--mist)]">SKILL.md</code>{" "}
            expertise once, then raise two distinct apps from the same bones: LegacyLift and SafeAct.
          </p>
          <div className="rise-in-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/legacy-lift"
              className="rounded-md bg-[var(--acid)] px-5 py-2.5 text-sm font-medium text-[#071008] transition hover:brightness-110"
            >
              Open LegacyLift
            </Link>
            <Link
              href="/safe-act"
              className="rounded-md border border-[var(--line)] px-5 py-2.5 text-sm text-[var(--ink)] transition hover:border-[var(--mist)] hover:text-[var(--mist)]"
            >
              Open SafeAct
            </Link>
          </div>
        </div>

        <div className="panel drift relative overflow-hidden rounded-3xl p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--glow)] blur-2xl" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]" style={{ fontFamily: "var(--font-mono)" }}>
            Skeleton layout
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--ink)]" style={{ fontFamily: "var(--font-mono)" }}>
            <li className="flex justify-between border-b border-[var(--line)] pb-2">
              <span>core/</span>
              <span className="text-[var(--muted)]">skill loader</span>
            </li>
            <li className="flex justify-between border-b border-[var(--line)] pb-2">
              <span>skills/</span>
              <span className="text-[var(--muted)]">SKILL.md packs</span>
            </li>
            <li className="flex justify-between border-b border-[var(--line)] pb-2">
              <span>apps/legacy-lift</span>
              <span className="text-[var(--acid)]">app 1</span>
            </li>
            <li className="flex justify-between">
              <span>apps/safe-act</span>
              <span className="text-[var(--mist)]">app 2</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
            Loaded skill packs
          </h2>
          <p className="text-xs text-[var(--muted)]" style={{ fontFamily: "var(--font-mono)" }}>
            {packs.length} packs · sample data (no API keys required)
          </p>
        </div>
        {errors.length > 0 && (
          <div className="mb-4 rounded-xl border border-[var(--ember)]/40 bg-[var(--ember)]/10 p-4 text-sm text-[var(--ember)]">
            {errors.join(" · ")}
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-3">
          {packs.map((pack) => (
            <SkillCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>

      <section className="panel rounded-3xl p-6 md:p-8">
        <h2 className="text-xl text-[var(--bone)]" style={{ fontFamily: "var(--font-display)" }}>
          Why this skeleton
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "One core",
              body: "Parse, validate, and list skills once. Apps import the registry instead of reinventing prompts.",
            },
            {
              title: "Two proofs",
              body: "LegacyLift resurrects dead code. SafeAct gates dangerous tool calls with citations and audits.",
            },
            {
              title: "Kiro-ready",
              body: "Committed /.kiro specs, hooks, steering, and property-based tests for judgeable AI development.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="mb-2 text-sm uppercase tracking-[0.16em] text-[var(--acid)]" style={{ fontFamily: "var(--font-mono)" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
