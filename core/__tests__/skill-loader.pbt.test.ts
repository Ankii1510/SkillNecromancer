import { describe, expect, it } from "vitest";
import * as fc from "fast-check";
import { parseSkillMarkdown, skillHasRequiredShape } from "../skill-loader";
import { loadBundledSkills } from "../registry";
import { modernizationIsWellFormed, modernizeSnippet, SAMPLE_SNIPPETS } from "../../apps/legacy-lift/modernize";
import {
  auditMatchesDecision,
  decideAction,
  queueToolAction,
  resetGateCounters,
  riskRequiresApproval,
} from "../../apps/safe-act/gate";

describe("SkillNecromancer property-based tests", () => {
  it("bundled skills always load with required shape", () => {
    const { packs, errors } = loadBundledSkills();
    expect(errors).toEqual([]);
    expect(packs.length).toBeGreaterThanOrEqual(3);
    for (const pack of packs) {
      expect(skillHasRequiredShape(pack)).toBe(true);
    }
  });

  it("valid generated frontmatter always parses", () => {
    const categoryArb = fc.constantFrom("legacy-lift", "safe-act", "shared" as const);
    const riskArb = fc.constantFrom("read", "mutate", "destructive" as const);
    const tokenArb = fc
      .stringMatching(/^[a-z][a-z0-9-]{1,12}$/)
      .filter((value) => value.length >= 2);

    fc.assert(
      fc.property(
        tokenArb,
        categoryArb,
        riskArb,
        fc.array(tokenArb, { minLength: 1, maxLength: 4 }),
        fc.array(tokenArb, { minLength: 1, maxLength: 4 }),
        (name, category, risk, triggers, tools) => {
          const raw = `---
name: ${name}
description: Generated skill for ${name}
version: 1.0.0
category: ${category}
risk: ${risk}
triggers: ${triggers.join(", ")}
tools: ${tools.join(", ")}
---

## Purpose

Auto-generated skill body for property testing.
`;
          const result = parseSkillMarkdown(raw, "generated");
          expect(result.ok).toBe(true);
          expect(result.pack && skillHasRequiredShape(result.pack)).toBe(true);
        },
      ),
      { numRuns: 40 },
    );
  });

  it("every sample legacy snippet modernizes into a well-formed result", () => {
    for (const snippet of SAMPLE_SNIPPETS) {
      const result = modernizeSnippet(snippet);
      expect(modernizationIsWellFormed(result)).toBe(true);
      expect(result.snippetId).toBe(snippet.id);
    }
  });

  it("mutate/destructive tool kinds always require approval", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("write", "delete", "network", "shell" as const),
        fc.constantFrom("read", "mutate", "destructive" as const),
        (kind, risk) => {
          expect(riskRequiresApproval(risk, kind)).toBe(true);
        },
      ),
      { numRuns: 20 },
    );
  });

  it("approve/deny always produces matching audit entries", () => {
    resetGateCounters();
    fc.assert(
      fc.property(fc.constantFrom("approved", "denied" as const), fc.string({ minLength: 1, maxLength: 40 }), (decision, reason) => {
        const { action } = queueToolAction({
          skillId: "safeact",
          tool: "fs.write",
          kind: "write",
          summary: "touch file",
          citation: "PBT citation",
          skillRisk: "destructive",
        });
        const decided = decideAction(action, decision, reason || "operator");
        expect(auditMatchesDecision(decided.action, decided.audit)).toBe(true);
      }),
      { numRuns: 25 },
    );
  });
});
