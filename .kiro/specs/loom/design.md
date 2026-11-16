# Design — Loom

## Overview

Loom presents a single brand across the Next.js shell, package metadata, and Kiro artifacts while two apps (LegacyLift, SafeAct) consume shared skills.

## Architecture

```
┌─────────────┐     ┌──────────────┐
│  Loom shell │────▶│ LegacyLift   │
│  (src/app)  │     └──────────────┘
│             │     ┌──────────────┐
│             │────▶│ SafeAct      │
└──────┬──────┘     └──────────────┘
       │
       ▼
┌─────────────┐     ┌──────────────┐
│    core/    │◀────│   skills/    │
└─────────────┘     └──────────────┘
```

## Brand rules

- Hero and metadata use **Loom**
- Repo clone URL may still say SkillNecromancer
- Spec path: `.kiro/specs/loom/`

## Testing

Property-based tests in `core/__tests__` guard skill parsing and id normalization used by both apps.
