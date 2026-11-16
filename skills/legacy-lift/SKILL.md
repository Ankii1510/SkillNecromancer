---
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
