# Loom

**Kiroween 2026 — Skeleton Crew**

Weave AI Skills into **LegacyLift** and **SafeAct**.

Loom is the product: a skill-first toolkit that threads reusable agent capabilities through modernization (LegacyLift) and guarded execution (SafeAct). The GitHub repository remains `SkillNecromancer`; everything user-facing is Loom.

## Why Loom

Legacy systems and autonomous agents both need structure. Loom treats skills as portable contracts—loadable, testable, and shared—so demos stay coherent instead of one-off prompts.

## Surfaces

| App | Role |
|-----|------|
| **LegacyLift** | Modernization skills for aging codebases |
| **SafeAct** | Safety rails for agent actions |

Shared skill content and loaders live under `skills/` and `core/`.

## Quick start

```bash
npm install
npm run dev
```

Open the app shell, then explore LegacyLift and SafeAct from the header.

## Repository layout

```
apps/           # LegacyLift & SafeAct
core/           # Shared skill loading & contracts
skills/         # Skill markdown and metadata
src/            # Next.js product shell (Loom brand)
.kiro/          # Steering + loom specs
```

## Specs

Product design, requirements, and tasks: [`.kiro/specs/loom/`](.kiro/specs/loom/).

## License

MIT — see [LICENSE](LICENSE).
