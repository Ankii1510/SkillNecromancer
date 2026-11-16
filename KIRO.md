# KIRO.md — Loom Steering

Product name: **Loom**
Repo (GitHub): SkillNecromancer
Hackathon: Kiroween 2026 — Skeleton Crew

## Mission

Weave reusable AI Skills into two demo surfaces:

1. **LegacyLift** — lift aging codebases with guided modernization skills
2. **SafeAct** — keep agent actions inside explicit safety rails

## Non-negotiables

- Skills are first-class artifacts under `skills/`
- Shared skill contracts live in `core/`
- Apps consume skills; they do not own skill definitions
- Specs and steering stay under `.kiro/`

## Naming

| Context | Use |
|---------|-----|
| Product / UI / docs brand | Loom |
| GitHub repository | SkillNecromancer |
| Package name | loom |
| Spec folder | `.kiro/specs/loom/` |

Do not present SkillNecromancer as the product name in user-facing copy.

## Stack notes

- TypeScript monorepo with Next.js app shell
- Property-based tests for skill loading
- Kiro specs drive design → requirements → tasks

## Current focus

Ship a coherent Loom brand across README, landing page, package metadata, and Kiro steering so judges and contributors meet one product name everywhere.
