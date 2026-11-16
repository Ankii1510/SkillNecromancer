# LegacyLift

Application 1 built on the SkillNecromancer skeleton.

Loads the `LegacyLift` AI skill pack and modernizes dead-language snippets (COBOL, PHP, Bash, FORTRAN) into TypeScript/Python while listing invariants and warnings.

## Run via web UI

From the repo root:

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3847/legacy-lift](http://127.0.0.1:3847/legacy-lift).

## Library entry

```ts
import { SAMPLE_SNIPPETS, modernizeSnippet } from "./modernize";
```
