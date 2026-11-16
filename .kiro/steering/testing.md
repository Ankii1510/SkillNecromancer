# Testing steering

- Use Vitest + fast-check for property-based tests under `core/__tests__/`.
- Properties to protect:
  - Valid skill frontmatter always parses into a pack with required shape.
  - Every sample legacy snippet modernizes with ≥1 invariant.
  - Mutate/destructive tool kinds always require approval.
  - Approve/deny decisions always match their audit entries.
- Prefer properties over brittle snapshot spam for core invariants.
