/** Bundled skill markdown — kept in sync with skills/<id>/SKILL.md for runtime loading without raw MD imports. */

export const LEGACY_LIFT_SKILL = `---
name: LegacyLift
description: Resurrect dead code languages into modern TypeScript/Python while preserving invariants.
version: 1.0.0
category: legacy-lift
risk: mutate
triggers: modernize, cobol, php, fortran, legacy, resurrect
tools: parse_legacy, emit_modern, check_invariants
---

## Purpose

Use this skill when a developer wants to revive obsolete source into a maintainable modern language.

## Workflow

1. Detect the dead language and extract intent from the snippet.
2. Emit a modern equivalent in TypeScript or Python.
3. List invariants that must hold after modernization.
4. Flag risky assumptions as warnings — never silently drop business rules.

## Guardrails

- Prefer readable modern idioms over clever one-liners.
- Keep I/O boundaries explicit.
- When uncertain, add a warning instead of inventing payroll math.
`;

export const SAFE_ACT_SKILL = `---
name: SafeAct
description: Cite-before-act gate for agent tool calls — require human approval before mutate or destructive operations.
version: 1.0.0
category: safe-act
risk: destructive
triggers: approve, cite, tool-call, mutate, delete, shell
tools: queue_action, cite_source, approve_action, deny_action, audit_log
---

## Purpose

Wrap agent tool use so state-changing operations never run without an explicit human decision and a citation of why the tool was requested.

## Workflow

1. Intercept a proposed tool call.
2. Attach a citation (skill rule, user ask, or spec clause).
3. Queue the action as pending.
4. On approve, record audit and mark executable.
5. On deny, record reason and block execution.

## Guardrails

- Read-only tools may auto-pass when risk is \`read\`.
- Mutate and destructive tools always require approval.
- Never execute without an audit entry.
`;

export const SHARED_SKILL = `---
name: SkillNecromancer Core
description: Shared conventions for packaging AI Skills that plug into the SkillNecromancer skeleton.
version: 1.0.0
category: shared
risk: read
triggers: skill, pack, skeleton, registry
tools: load_skill, validate_skill, list_skills
---

## Purpose

Define how SkillNecromancer loads, validates, and surfaces skill packs so multiple apps can share one skeleton.

## Conventions

- Every skill lives in \`skills/<id>/SKILL.md\`.
- Frontmatter must include name, description, version, category, risk, triggers, tools.
- Apps import the registry — they do not re-parse ad-hoc markdown.

## Testing

Property-based tests assert that valid frontmatter always loads into a skill with a stable id and required fields.
`;
