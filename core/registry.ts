import { parseSkillMarkdown } from "./skill-loader";
import { LEGACY_LIFT_SKILL, SAFE_ACT_SKILL, SHARED_SKILL } from "./skill-content";
import type { SkillPack } from "./types";

const RAW_SKILLS: Array<{ path: string; raw: string }> = [
  { path: "skills/legacy-lift/SKILL.md", raw: LEGACY_LIFT_SKILL },
  { path: "skills/safe-act/SKILL.md", raw: SAFE_ACT_SKILL },
  { path: "skills/shared/SKILL.md", raw: SHARED_SKILL },
];

export function loadBundledSkills(): { packs: SkillPack[]; errors: string[] } {
  const packs: SkillPack[] = [];
  const errors: string[] = [];

  for (const entry of RAW_SKILLS) {
    const result = parseSkillMarkdown(entry.raw, entry.path);
    if (!result.ok || !result.pack) {
      errors.push(...result.errors.map((err) => `${entry.path}: ${err}`));
      continue;
    }
    packs.push(result.pack);
  }

  return { packs, errors };
}

export function getSkillById(packs: SkillPack[], id: string): SkillPack | undefined {
  return packs.find((pack) => pack.id === id);
}
