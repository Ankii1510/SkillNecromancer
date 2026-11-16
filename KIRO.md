# How Kiro was used — SkillNecromancer

Judges: this project is designed so every major Kiro surface is visible in-repo.

## Spec-driven development

- Requirements, design, and tasks live in `.kiro/specs/skill-necromancer/`.
- The Skeleton Crew rule (one foundation → two apps) is encoded as explicit requirements, not vibe-only chat.

## Steering

- `.kiro/steering/product.md` locks architecture, sync rules for skills, and visual direction.
- `.kiro/steering/testing.md` forces property-based tests for loader / modernization / approvals.

## Agent hooks

- `on-skill-edit` — when `skills/**/SKILL.md` changes, sync `core/skill-content.ts` and re-test.
- `on-gate-change` — when SafeAct gate logic changes, re-validate approval properties.

## Skills / Powers

- `skills/legacy-lift/SKILL.md`, `skills/safe-act/SKILL.md`, `skills/shared/SKILL.md` are the reusable expertise packs.
- The skeleton’s job is to load and validate these packs so new apps can plug in.

## Property-based testing

- `core/__tests__/skill-loader.pbt.test.ts` uses Vitest + fast-check.
- Properties cover skill shape, modernization invariants, mandatory approvals, and audit matching.

## MCP / Crew path

- SafeAct models cite-before-act middleware for MCP tool calls (approve mutate/destructive ops with citations).
- Ready to wire to real MCP servers; demo uses sample proposals so judges need no credentials.

## Apps from the skeleton

1. **LegacyLift** — dead-tech resurrection via the LegacyLift skill.
2. **SafeAct** — tool-leash UX via the SafeAct skill.
