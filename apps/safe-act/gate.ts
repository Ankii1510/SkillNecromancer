import type { AuditEntry, PendingToolAction, SkillRisk, ToolActionKind } from "../../core/types";

let actionCounter = 0;
let auditCounter = 0;

export function createActionId(): string {
  actionCounter += 1;
  return `act_${actionCounter.toString().padStart(4, "0")}`;
}

export function createAuditId(): string {
  auditCounter += 1;
  return `aud_${auditCounter.toString().padStart(4, "0")}`;
}

export function resetGateCounters() {
  actionCounter = 0;
  auditCounter = 0;
}

export function riskRequiresApproval(risk: SkillRisk, kind: ToolActionKind): boolean {
  if (kind === "read") return false;
  // Non-read tool kinds always need a human gate, regardless of skill risk label.
  void risk;
  return kind === "write" || kind === "delete" || kind === "network" || kind === "shell";
}

export function queueToolAction(input: {
  skillId: string;
  tool: string;
  kind: ToolActionKind;
  summary: string;
  payload?: Record<string, unknown>;
  citation: string;
  skillRisk: SkillRisk;
  now?: string;
}): { action: PendingToolAction; autoApproved: boolean } {
  const now = input.now ?? new Date().toISOString();
  const needsApproval = riskRequiresApproval(input.skillRisk, input.kind);

  const action: PendingToolAction = {
    id: createActionId(),
    skillId: input.skillId,
    tool: input.tool,
    kind: input.kind,
    summary: input.summary,
    payload: input.payload ?? {},
    citation: input.citation,
    createdAt: now,
    status: needsApproval ? "pending" : "approved",
  };

  return { action, autoApproved: !needsApproval };
}

export function decideAction(
  action: PendingToolAction,
  decision: "approved" | "denied",
  reason: string,
  now = new Date().toISOString(),
): { action: PendingToolAction; audit: AuditEntry } {
  if (action.status !== "pending") {
    throw new Error(`Action ${action.id} is already ${action.status}`);
  }

  const next: PendingToolAction = { ...action, status: decision };
  const audit: AuditEntry = {
    id: createAuditId(),
    actionId: action.id,
    decision,
    reason: reason.trim() || (decision === "approved" ? "Approved by operator" : "Denied by operator"),
    at: now,
  };

  return { action: next, audit };
}

export const DEMO_PROPOSALS: Array<{
  skillId: string;
  tool: string;
  kind: ToolActionKind;
  summary: string;
  citation: string;
  skillRisk: SkillRisk;
  payload: Record<string, unknown>;
}> = [
  {
    skillId: "safeact",
    tool: "fs.write",
    kind: "write",
    summary: "Overwrite production .env with generated secrets",
    citation: "User asked to 'rotate secrets' — SafeAct §Guardrails requires approval for mutate tools.",
    skillRisk: "destructive",
    payload: { path: "/app/.env", bytes: 248 },
  },
  {
    skillId: "safeact",
    tool: "shell.exec",
    kind: "shell",
    summary: "Run rm -rf ./uploads to clear stale media",
    citation: "Agent plan step 3 proposed cleanup. Cite-before-act: destructive shell needs human gate.",
    skillRisk: "destructive",
    payload: { command: "rm -rf ./uploads" },
  },
  {
    skillId: "safeact",
    tool: "db.query",
    kind: "read",
    summary: "SELECT count(*) FROM users WHERE active = true",
    citation: "Read-only analytics probe — auto-pass when kind=read.",
    skillRisk: "read",
    payload: { sql: "SELECT count(*) FROM users WHERE active = true" },
  },
  {
    skillId: "safeact",
    tool: "http.post",
    kind: "network",
    summary: "POST customer PII to third-party webhook",
    citation: "No user instruction referenced this webhook. SafeAct blocks silent exfiltration pending review.",
    skillRisk: "destructive",
    payload: { url: "https://example.invalid/hooks/ingest", fields: ["email", "phone"] },
  },
];

/** Property: denied/approved decisions always produce matching audit decision. */
export function auditMatchesDecision(action: PendingToolAction, audit: AuditEntry): boolean {
  return action.id === audit.actionId && action.status === audit.decision;
}
