---
name: loom-shared
description: Shared Loom skill contract for LegacyLift and SafeAct
version: 0.1.0
tags: [loom, shared, kiroween]
---

# Loom shared skill

This skill defines the baseline contract consumed by both demo surfaces.

## Intent

Provide a single, versioned skill document that LegacyLift and SafeAct can load through `core/` without duplicating frontmatter rules.

## When to use

- Bootstrapping app-specific skills that extend shared Loom conventions
- Verifying skill markdown parsing and id normalization

## Outputs

- Stable `name` / skill id
- Human-readable body for agents and judges
