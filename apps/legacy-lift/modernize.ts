import type { LegacySnippet, ModernizationResult } from "../../core/types";

export const SAMPLE_SNIPPETS: LegacySnippet[] = [
  {
    id: "payroll-cobol",
    language: "cobol",
    title: "COBOL weekly payroll stub",
    era: "1978",
    source: `IDENTIFICATION DIVISION.
PROGRAM-ID. PAYROLL.
DATA DIVISION.
WORKING-STORAGE SECTION.
01 HOURS PIC 9(3)V9(2) VALUE 40.00.
01 RATE  PIC 9(3)V9(2) VALUE 25.50.
01 GROSS PIC 9(5)V9(2).
PROCEDURE DIVISION.
    COMPUTE GROSS = HOURS * RATE
    DISPLAY GROSS
    STOP RUN.`,
  },
  {
    id: "guestbook-php",
    language: "php",
    title: "PHP 4 guestbook insert",
    era: "2003",
    source: `<?php
$name = $_POST['name'];
$msg  = $_POST['msg'];
$conn = mysql_connect('localhost','root','');
mysql_select_db('guestbook');
$sql = "INSERT INTO notes VALUES ('$name','$msg')";
mysql_query($sql);
echo "Thanks $name";
?>`,
  },
  {
    id: "backup-bash",
    language: "bash",
    title: "Cron tar backup script",
    era: "1999",
    source: `#!/bin/sh
SRC=/var/www
DEST=/backup/www-$(date +%F).tar.gz
tar czf $DEST $SRC
echo backup done`,
  },
  {
    id: "interest-fortran",
    language: "fortran",
    title: "FORTRAN compound interest",
    era: "1966",
    source: `      PROGRAM INTEREST
      PRINCIPAL = 1000.0
      RATE = 0.05
      YEARS = 10
      AMOUNT = PRINCIPAL * (1.0 + RATE)**YEARS
      PRINT *, AMOUNT
      END`,
  },
];

function modernizeCobol(snippet: LegacySnippet): ModernizationResult {
  return {
    snippetId: snippet.id,
    modernLanguage: "typescript",
    modernCode: `export function computeGrossPay(hours: number, rate: number): number {
  if (hours < 0 || rate < 0) {
    throw new Error("Hours and rate must be non-negative");
  }
  return Number((hours * rate).toFixed(2));
}

// Sample values from the COBOL WORKING-STORAGE section
const hours = 40;
const rate = 25.5;
console.log(computeGrossPay(hours, rate));`,
    explanation:
      "Mapped COBOL COMPUTE GROSS = HOURS * RATE into a typed function with explicit validation and two-decimal money rounding.",
    invariants: [
      "gross = hours * rate",
      "hours and rate are non-negative",
      "money values round to two decimal places",
    ],
    warnings: ["Original PIC clauses implied fixed decimals; modern code uses floating number + toFixed."],
  };
}

function modernizePhp(snippet: LegacySnippet): ModernizationResult {
  return {
    snippetId: snippet.id,
    modernLanguage: "typescript",
    modernCode: `import { z } from "zod";

const NoteSchema = z.object({
  name: z.string().min(1).max(80),
  msg: z.string().min(1).max(2000),
});

export async function insertGuestbookNote(
  input: unknown,
  db: { execute: (sql: string, params: unknown[]) => Promise<void> },
) {
  const note = NoteSchema.parse(input);
  await db.execute(
    "INSERT INTO notes (name, message) VALUES ($1, $2)",
    [note.name, note.msg],
  );
  return \`Thanks \${note.name}\`;
}`,
    explanation:
      "Replaced deprecated mysql_* APIs and string-concatenated SQL with validated input and parameterized queries.",
    invariants: [
      "name and msg are required non-empty strings",
      "SQL uses bound parameters — no string interpolation of user input",
      "response still thanks the author by name",
    ],
    warnings: ["Original code was vulnerable to SQL injection; modernization intentionally changes the query style."],
  };
}

function modernizeBash(snippet: LegacySnippet): ModernizationResult {
  return {
    snippetId: snippet.id,
    modernLanguage: "typescript",
    modernCode: `import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);

export async function backupDirectory(src = "/var/www", backupDir = "/backup") {
  const stamp = new Date().toISOString().slice(0, 10);
  const dest = path.join(backupDir, \`www-\${stamp}.tar.gz\`);
  await execFileAsync("tar", ["czf", dest, src]);
  return { dest, message: "backup done" };
}`,
    explanation:
      "Kept tar-based backup semantics while avoiding shell injection via execFile argument arrays.",
    invariants: [
      "Creates a dated .tar.gz archive",
      "Sources from the configured src directory",
      "Returns a done message after archive creation",
    ],
    warnings: ["Caller must ensure backupDir exists and process has permission."],
  };
}

function modernizeFortran(snippet: LegacySnippet): ModernizationResult {
  return {
    snippetId: snippet.id,
    modernLanguage: "python",
    modernCode: `def compound_amount(principal: float, rate: float, years: int) -> float:
    if principal < 0 or rate < 0 or years < 0:
        raise ValueError("principal, rate, and years must be non-negative")
    return principal * ((1.0 + rate) ** years)

if __name__ == "__main__":
    print(compound_amount(1000.0, 0.05, 10))`,
    explanation:
      "Preserved compound interest formula A = P*(1+r)**n with typed parameters and input validation.",
    invariants: [
      "amount = principal * (1 + rate) ** years",
      "inputs are non-negative",
    ],
    warnings: [],
  };
}

export function modernizeSnippet(snippet: LegacySnippet): ModernizationResult {
  switch (snippet.language) {
    case "cobol":
      return modernizeCobol(snippet);
    case "php":
      return modernizePhp(snippet);
    case "bash":
      return modernizeBash(snippet);
    case "fortran":
      return modernizeFortran(snippet);
    default: {
      const _exhaustive: never = snippet.language;
      return _exhaustive;
    }
  }
}

export function findSnippet(id: string): LegacySnippet | undefined {
  return SAMPLE_SNIPPETS.find((snippet) => snippet.id === id);
}

/** Property: modernization always returns the same snippet id and at least one invariant. */
export function modernizationIsWellFormed(result: ModernizationResult): boolean {
  return (
    Boolean(result.snippetId) &&
    Boolean(result.modernCode.trim()) &&
    result.invariants.length > 0 &&
    Boolean(result.explanation.trim())
  );
}
