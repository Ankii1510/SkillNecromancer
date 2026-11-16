# SafeAct

Application 2 built on the SkillNecromancer skeleton.

Loads the `SafeAct` AI skill pack and queues cite-before-act approvals for mutate/destructive agent tool calls, with a full audit trail.

## Run via web UI

From the repo root:

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3847/safe-act](http://127.0.0.1:3847/safe-act).

## Library entry

```ts
import { DEMO_PROPOSALS, queueToolAction, decideAction } from "./gate";
```
