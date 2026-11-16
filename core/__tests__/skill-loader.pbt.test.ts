import { describe, expect, it } from "vitest";
import * as fc from "fast-check";
import {
  parseSkillMarkdown,
  skillIdFromName,
} from "../skill-content";

describe("Loom skill loader (property-based)", () => {
  it("round-trips name into a stable skill id", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 64 }).filter((s) => s.trim().length > 0),
        (name) => {
          const id = skillIdFromName(name);
          expect(id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
          expect(skillIdFromName(id)).toBe(id);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("parses frontmatter name when present", () => {
    fc.assert(
      fc.property(
        fc
          .string({ minLength: 1, maxLength: 40 })
          .filter((s) => /^[A-Za-z0-9][A-Za-z0-9 _-]*$/.test(s)),
        fc.lorem({ maxCount: 20 }),
        (name, body) => {
          const raw = `---\nname: ${name}\n---\n\n${body}\n`;
          const doc = parseSkillMarkdown(raw);
          expect(doc.frontmatter.name).toBe(name);
          expect(doc.body.trim()).toBe(body.trim());
        }
      ),
      { numRuns: 50 }
    );
  });

  it("defaults missing frontmatter to untitled", () => {
    fc.assert(
      fc.property(fc.lorem({ maxCount: 15 }), (body) => {
        const doc = parseSkillMarkdown(body);
        expect(doc.frontmatter.name).toBe("untitled");
        expect(doc.body).toBe(body);
      }),
      { numRuns: 50 }
    );
  });

  it("skill ids never contain spaces or uppercase", () => {
    fc.assert(
      fc.property(fc.string({ maxLength: 80 }), (name) => {
        const id = skillIdFromName(name);
        expect(id).not.toMatch(/\s/);
        expect(id).toBe(id.toLowerCase());
      }),
      { numRuns: 100 }
    );
  });
});
