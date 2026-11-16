/**
 * Loom core — shared skill content helpers.
 * Product: Loom | Repo: SkillNecromancer
 */

export type SkillFrontmatter = {
  name: string;
  description?: string;
  version?: string;
  tags?: string[];
};

export type SkillDocument = {
  frontmatter: SkillFrontmatter;
  body: string;
  raw: string;
};

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

/**
 * Parse a skill markdown document with optional YAML-ish frontmatter.
 * Keys are treated as simple `key: value` lines (no nested YAML).
 */
export function parseSkillMarkdown(raw: string): SkillDocument {
  const trimmed = raw.replace(/^\uFEFF/, "");
  const match = FRONTMATTER_RE.exec(trimmed);

  if (!match) {
    return {
      frontmatter: { name: "untitled" },
      body: trimmed,
      raw: trimmed,
    };
  }

  const [, fmBlock, body] = match;
  const frontmatter = parseSimpleFrontmatter(fmBlock);
  if (!frontmatter.name) {
    frontmatter.name = "untitled";
  }

  return {
    frontmatter: frontmatter as SkillFrontmatter,
    body: body.trimStart(),
    raw: trimmed,
  };
}

function parseSimpleFrontmatter(block: string): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {};
  for (const line of block.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('[') && value.endsWith(']')) ||
      value.includes(",")
    ) {
      const inner = value.replace(/^\[/, "").replace(/\]$/, "");
      result[key] = inner
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    } else {
      result[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }
  return result;
}

/** Normalize skill id for Loom loaders (LegacyLift + SafeAct). */
export function skillIdFromName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
