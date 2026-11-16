# Requirements — Loom

## User-facing

1. The product SHALL be named **Loom** in UI, README, and package description.
2. The landing experience SHALL present Loom as the primary brand, with LegacyLift and SafeAct as secondary surfaces.
3. Documentation SHALL state that the GitHub repository name SkillNecromancer is distinct from the product name.

## Skills

4. Shared skills SHALL live under `skills/` with frontmatter consumable by `core/`.
5. LegacyLift and SafeAct SHALL NOT redefine shared skill contracts locally.

## Engineering

6. Package name SHALL be `loom`.
7. Kiro specs for this product SHALL live under `.kiro/specs/loom/`.
8. Skill loading helpers SHALL be covered by property-based tests.

## Hackathon

9. Copy SHALL reference Kiroween 2026 Skeleton Crew where appropriate for judging context.
