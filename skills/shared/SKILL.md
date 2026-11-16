---
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

- Every skill lives in `skills/<id>/SKILL.md`.
- Frontmatter must include name, description, version, category, risk, triggers, tools.
- Apps import the registry — they do not re-parse ad-hoc markdown.

## Testing

Property-based tests assert that valid frontmatter always loads into a skill with a stable id and required fields.
