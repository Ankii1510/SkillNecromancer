export type SkillRisk = "read" | "mutate" | "destructive";

export interface SkillFrontmatter {
  name: string;
  description: string;
  version: string;
  category: "legacy-lift" | "safe-act" | "shared";
  risk: SkillRisk;
  triggers: string[];
  tools: string[];
}

export interface SkillPack {
  id: string;
  frontmatter: SkillFrontmatter;
  body: string;
  path: string;
}

export interface SkillLoadResult {
  ok: boolean;
  pack?: SkillPack;
  errors: string[];
}

export interface LegacySnippet {
  id: string;
  language: "cobol" | "php" | "bash" | "fortran";
  title: string;
  source: string;
  era: string;
}

export interface ModernizationResult {
  snippetId: string;
  modernLanguage: "typescript" | "python";
  modernCode: string;
  explanation: string;
  invariants: string[];
  warnings: string[];
}

export type ToolActionKind = "read" | "write" | "delete" | "network" | "shell";

export interface PendingToolAction {
  id: string;
  skillId: string;
  tool: string;
  kind: ToolActionKind;
  summary: string;
  payload: Record<string, unknown>;
  citation: string;
  createdAt: string;
  status: "pending" | "approved" | "denied";
}

export interface AuditEntry {
  id: string;
  actionId: string;
  decision: "approved" | "denied";
  reason: string;
  at: string;
}
