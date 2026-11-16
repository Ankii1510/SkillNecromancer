# Design — SkillNecromancer

## Architecture

```
core/                 shared skill loader + types + registry
skills/*/SKILL.md     human-editable skill packs
apps/legacy-lift/     application 1 domain logic
apps/safe-act/        application 2 domain logic
src/app/              Next.js UI surfaces for both apps
.kiro/                specs, hooks, steering for Kiro
```

## Key decisions

- **No backend required for the demo.** Sample snippets and tool proposals are local so judges can run without secrets.
- **Skill content dual-stored:** markdown files for Kiro/humans; `core/skill-content.ts` for deterministic runtime bundling.
- **PBT in Vitest** using `fast-check` to encode invariants from requirements.
- **UI** is a single Next.js app routing `/`, `/legacy-lift`, `/safe-act` while keeping application folders separate for Skeleton Crew rules.

## Data flow

1. Registry loads bundled skill markdown → SkillPack[].
2. LegacyLift maps LegacySnippet → ModernizationResult via pure functions.
3. SafeAct queues PendingToolAction → operator decision → AuditEntry.
