"use client";

import { useMemo, useState } from "react";
import type { AuditEntry, PendingToolAction } from "../../../core/types";
import { DEMO_PROPOSALS, decideAction, queueToolAction, resetGateCounters } from "../../../apps/safe-act/gate";

function seedQueue(): { actions: PendingToolAction[]; audits: AuditEntry[] } {
  resetGateCounters();
  const actions: PendingToolAction[] = [];
  const audits: AuditEntry[] = [];

  for (const proposal of DEMO_PROPOSALS) {
    const { action, autoApproved } = queueToolAction(proposal);
    actions.push(action);
    if (autoApproved) {
      audits.push({
        id: `aud_auto_${action.id}`,
        actionId: action.id,
        decision: "approved",
        reason: "Auto-approved read-only tool",
        at: action.createdAt,
      });
    }
  }

  return { actions, audits };
}

export default function SafeActPage() {
  const initial = useMemo(() => seedQueue(), []);
  const [actions, setActions] = useState<PendingToolAction[]>(initial.actions);
  const [audits, setAudits] = useState<AuditEntry[]>(initial.audits);
  const [toast, setToast] = useState<string | null>(null);

  const pending = actions.filter((action) => action.status === "pending");

  function onDecide(actionId: string, decision: "approved" | "denied") {
    setActions((current) => {
      const target = current.find((item) => item.id === actionId);
      if (!target || target.status !== "pending") return current;
      try {
        const result = decideAction(
          target,
          decision,
          decision === "approved" ? "Operator approved after reading citation" : "Operator denied — too risky",
        );
        setAudits((prev) => [result.audit, ...prev]);
        setToast(`${result.action.tool} ${decision}`);
        return current.map((item) => (item.id === actionId ? result.action : item));
      } catch (error) {
        setToast(error instanceof Error ? error.message : "Decision failed");
        return current;
      }
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 md:px-8">
      <p className="rise-in text-[11px] uppercase tracking-[0.28em] text-[var(--mist)]" style={{ fontFamily: "var(--font-mono)" }}>
        App 2 · skills/safe-act
      </p>
      <h1 className="rise-in-delay mt-3 text-4xl text-[var(--bone)] md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
        SafeAct
      </h1>
      <p className="rise-in-delay-2 mt-4 max-w-2xl text-[var(--muted)]">
        Cite-before-act gate for agent tools. Mutate and destructive calls stay pending until you approve or deny —
        every decision lands in the audit trail.
      </p>

      {toast && (
        <div className="mt-6 rounded-xl border border-[var(--acid)]/30 bg-[var(--acid)]/10 px-4 py-3 text-sm text-[var(--acid)]">
          {toast}
        </div>
      )}

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-4">
          <h2 className="text-lg text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
            Pending & queued actions ({pending.length} awaiting you)
          </h2>
          {actions.map((action) => (
            <article
              key={action.id}
              className={`panel rounded-2xl p-5 ${action.status === "pending" ? "pulse-pending" : ""}`}
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                  {action.tool}
                </h3>
                <span
                  className={`text-[11px] uppercase tracking-[0.16em] ${
                    action.status === "pending"
                      ? "text-[var(--bone)]"
                      : action.status === "approved"
                        ? "text-[var(--acid)]"
                        : "text-[var(--ember)]"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {action.status} · {action.kind}
                </span>
              </div>
              <p className="mb-3 text-sm text-[var(--muted)]">{action.summary}</p>
              <p className="mb-4 rounded-lg border border-[var(--line)] bg-black/25 p-3 text-xs leading-relaxed text-[var(--mist)]" style={{ fontFamily: "var(--font-mono)" }}>
                Citation: {action.citation}
              </p>
              {action.status === "pending" ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onDecide(action.id, "approved")}
                    className="rounded-md bg-[var(--acid)] px-4 py-2 text-sm font-medium text-[#071008]"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => onDecide(action.id, "denied")}
                    className="rounded-md border border-[var(--ember)]/50 px-4 py-2 text-sm text-[var(--ember)]"
                  >
                    Deny
                  </button>
                </div>
              ) : (
                <p className="text-xs text-[var(--muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                  {action.id} settled
                </p>
              )}
            </article>
          ))}
        </section>

        <section className="panel h-fit rounded-2xl p-5">
          <h2 className="mb-4 text-lg text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
            Audit trail
          </h2>
          <div className="space-y-3">
            {audits.length === 0 && <p className="text-sm text-[var(--muted)]">No decisions yet.</p>}
            {audits.map((entry) => (
              <div key={entry.id} className="border-b border-[var(--line)] pb-3 last:border-0">
                <div className="mb-1 flex justify-between gap-2 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                  <span className={entry.decision === "approved" ? "text-[var(--acid)]" : "text-[var(--ember)]"}>
                    {entry.decision}
                  </span>
                  <span className="text-[var(--muted)]">{new Date(entry.at).toLocaleTimeString()}</span>
                </div>
                <p className="text-sm text-[var(--ink)]">{entry.reason}</p>
                <p className="mt-1 text-[11px] text-[var(--muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                  {entry.actionId}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
