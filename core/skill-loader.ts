import type { SkillFrontmatter, SkillLoadResult, SkillPack, SkillRisk } from "./types";

const REQUIRED_FIELDS: Array<keyof SkillFrontmatter> = [
  "name",
  "description",
  "version",
  "category",
  "risk",
  "triggers",
  "tools",
];

const VALID_CATEGORIES = new Set(["legacy-lift", "safe-act", "shared"]);
const VALID_RISKS = new Set<SkillRisk>(["read", "mutate", "destructive"]);

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseList(raw: string): string[] {
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseFrontmatter(block: string): { data: Partial<SkillFrontmatter>; errors: string[] } {
  const data: Partial<SkillFrontmatter> = {};
  const errors: string[] = [];

  for (const line of block.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const sep = trimmed.indexOf(":");
    if (sep === -1) {
      errors.push(`Invalid frontmatter line: ${trimmed}`);
      continue;
    }
    const key = trimmed.slice(0, sep).trim();
    const value = trimmed.slice(sep + 1).trim().replace(/^["']|["']$/g, "");

    switch (key) {
      case "name":
      case "description":
      case "version":
        data[key] = value;
        break;
      case "category":
        data.category = value as SkillFrontmatter["category"];
        break;
      case "risk":
        data.risk = value as SkillRisk;
        break;
      case "triggers":
      case "tools":
        data[key] = parseList(value);
        break;
      default:
        errors.push(`Unknown frontmatter key: ${key}`);
    }
  }

  return { data, errors };
}

export function parseSkillMarkdown(raw: string, path = "inline"): SkillLoadResult {
  const errors: string[] = [];
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return {
      ok: false,
      errors: ["SKILL.md must start with YAML-like frontmatter between --- fences"],
    };
  }

  const [, frontmatterBlock, body] = match;
  const { data, errors: parseErrors } = parseFrontmatter(frontmatterBlock);
  errors.push(...parseErrors);

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === "" || (Array.isArray(data[field]) && data[field]!.length === 0)) {
      errors.push(`Missing required frontmatter field: ${field}`);
    }
  }

  if (data.category && !VALID_CATEGORIES.has(data.category)) {
    errors.push(`Invalid category: ${data.category}`);
  }

  if (data.risk && !VALID_RISKS.has(data.risk)) {
    errors.push(`Invalid risk: ${data.risk}`);
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const frontmatter = data as SkillFrontmatter;
  const pack: SkillPack = {
    id: slugify(frontmatter.name),
    frontmatter,
    body: body.trim(),
    path,
  };

  return { ok: true, pack, errors: [] };
}

export function validateSkillPack(pack: SkillPack): string[] {
  const errors: string[] = [];
  if (!pack.id) errors.push("Skill id is empty");
  if (pack.frontmatter.risk === "destructive" && pack.frontmatter.tools.length === 0) {
    errors.push("Destructive skills must declare at least one tool");
  }
  if (!pack.body.includes("##")) {
    errors.push("Skill body should include markdown section headings");
  }
  return errors;
}

export function listSkillSummaries(packs: SkillPack[]) {
  return packs.map((pack) => ({
    id: pack.id,
    name: pack.frontmatter.name,
    description: pack.frontmatter.description,
    category: pack.frontmatter.category,
    risk: pack.frontmatter.risk,
    triggers: pack.frontmatter.triggers,
    tools: pack.frontmatter.tools,
    path: pack.path,
  }));
}

/** Property used by PBT: every successfully parsed skill must round-trip required fields. */
export function skillHasRequiredShape(pack: SkillPack): boolean {
  return (
    Boolean(pack.id) &&
    Boolean(pack.frontmatter.name) &&
    Boolean(pack.frontmatter.description) &&
    Boolean(pack.frontmatter.version) &&
    VALID_CATEGORIES.has(pack.frontmatter.category) &&
    VALID_RISKS.has(pack.frontmatter.risk) &&
    pack.frontmatter.triggers.length > 0 &&
    pack.frontmatter.tools.length > 0
  );
}
