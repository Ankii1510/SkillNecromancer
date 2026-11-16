"use client";

import { useMemo, useState } from "react";
import { SAMPLE_SNIPPETS, modernizeSnippet } from "../../../apps/legacy-lift/modernize";

export default function LegacyLiftPage() {
  const [selectedId, setSelectedId] = useState(SAMPLE_SNIPPETS[0].id);
  const snippet = useMemo(
    () => SAMPLE_SNIPPETS.find((item) => item.id === selectedId) ?? SAMPLE_SNIPPETS[0],
    [selectedId],
  );
  const result = useMemo(() => modernizeSnippet(snippet), [snippet]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 md:px-8">
      <p className="rise-in text-[11px] uppercase tracking-[0.28em] text-[var(--acid)]" style={{ fontFamily: "var(--font-mono)" }}>
        App 1 · skills/legacy-lift
      </p>
      <h1 className="rise-in-delay mt-3 text-4xl text-[var(--bone)] md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
        LegacyLift
      </h1>
      <p className="rise-in-delay-2 mt-4 max-w-2xl text-[var(--muted)]">
        Pick a dead-language relic. The LegacyLift skill emits modern code, invariants, and warnings — without inventing
        business rules it cannot prove.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {SAMPLE_SNIPPETS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(item.id)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              selectedId === item.id
                ? "border-[var(--acid)] bg-[var(--acid)]/10 text-[var(--acid)]"
                : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {item.language.toUpperCase()} · {item.era}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section className="panel rise-in rounded-2xl p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-lg text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
              {snippet.title}
            </h2>
            <span className="text-[11px] text-[var(--muted)]" style={{ fontFamily: "var(--font-mono)" }}>
              {snippet.language}
            </span>
          </div>
          <pre className="overflow-x-auto rounded-xl bg-black/35 p-4 text-xs leading-relaxed text-[var(--bone)]" style={{ fontFamily: "var(--font-mono)" }}>
            {snippet.source}
          </pre>
        </section>

        <section className="panel rise-in-delay rounded-2xl p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-lg text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
              Modern resurrection
            </h2>
            <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--mist)]" style={{ fontFamily: "var(--font-mono)" }}>
              {result.modernLanguage}
            </span>
          </div>
          <pre className="mb-4 overflow-x-auto rounded-xl bg-black/35 p-4 text-xs leading-relaxed text-[var(--mist)]" style={{ fontFamily: "var(--font-mono)" }}>
            {result.modernCode}
          </pre>
          <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">{result.explanation}</p>
          <div className="mb-3">
            <h3 className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[var(--acid)]" style={{ fontFamily: "var(--font-mono)" }}>
              Invariants
            </h3>
            <ul className="space-y-1.5 text-sm text-[var(--ink)]">
              {result.invariants.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          {result.warnings.length > 0 && (
            <div>
              <h3 className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[var(--ember)]" style={{ fontFamily: "var(--font-mono)" }}>
                Warnings
              </h3>
              <ul className="space-y-1.5 text-sm text-[var(--ember)]/90">
                {result.warnings.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
