# SkillNecromancer

**Kiroween 2026 · Skeleton Crew**

A reusable **AI Skills** skeleton for Kiro. One core loads `SKILL.md` packs; two distinct apps prove the foundation:

| App | Path | What it does |
|---|---|---|
| **LegacyLift** | [`apps/legacy-lift`](apps/legacy-lift) | Resurrects COBOL / PHP / Bash / FORTRAN snippets into modern TypeScript or Python with invariants + warnings |
| **SafeAct** | [`apps/safe-act`](apps/safe-act) | Cite-before-act gate for agent tool calls — approve/deny mutate & destructive ops with an audit trail |

## Why this exists

Winning Skeleton Crew / kit projects (InteractionKit, Impulse Kit) and MCP winners (Cite Before Act, Legacy Code Modernizer) share a pattern: **reusable agent expertise + two clear demos**. SkillNecromancer packages that as AI Skills for Kiro Crew / Powers / hooks / PBT.

## Quick start (cloud or local)

```bash
npm install
npm run dev      # http://127.0.0.1:3847
npm test         # property-based tests
npm run build
```

## Repo map

```
core/                 skill loader, registry, types
skills/*/SKILL.md     LegacyLift, SafeAct, shared packs
apps/legacy-lift/     application 1
apps/safe-act/        application 2
src/app/              Next.js UI
.kiro/                specs, hooks, steering (do not gitignore)
```

## How we use Kiro (submission write-up outline)

- **Specs:** `.kiro/specs/skill-necromancer/` requirements → design → tasks
- **Steering:** product + testing rules keep architecture and PBT consistent
- **Hooks:** skill edit / gate change hooks re-sync content and re-run properties
- **Skills / Powers:** `skills/*/SKILL.md` are the reusable expertise units
- **PBT:** Vitest + fast-check encode loader, modernization, and approval invariants
- **MCP (demo path):** SafeAct models cite-before-act middleware for tool servers

## Sample data

No API keys required. Legacy snippets and tool proposals are bundled samples labeled in the UI.

## License

MIT — see [LICENSE](LICENSE).
