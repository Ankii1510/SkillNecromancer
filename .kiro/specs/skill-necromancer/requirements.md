# Requirements — SkillNecromancer

## User stories

### Skeleton core
1. WHEN a developer opens the home page THEN the system SHALL list all bundled skill packs with name, risk, and triggers.
2. WHEN a SKILL.md has valid frontmatter THEN the loader SHALL produce a SkillPack with a stable slug id.
3. WHEN required frontmatter fields are missing THEN the loader SHALL return explicit errors and not yield a pack.

### LegacyLift
4. WHEN a user selects a sample legacy snippet THEN the system SHALL show the original source and a modernized equivalent.
5. WHEN modernization completes THEN the system SHALL list at least one invariant that must hold.
6. WHEN modernization changes security-sensitive behavior THEN the system SHALL surface a warning.

### SafeAct
7. WHEN a proposed tool kind is read THEN the system SHALL auto-approve without blocking the operator.
8. WHEN a proposed tool kind is write, delete, network, or shell THEN the system SHALL queue the action as pending.
9. WHEN an operator approves or denies a pending action THEN the system SHALL append an audit entry whose decision matches the action status.
10. WHEN an action is already settled THEN the system SHALL reject a second decision.
