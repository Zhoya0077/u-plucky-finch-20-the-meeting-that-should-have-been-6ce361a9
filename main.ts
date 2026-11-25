import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line about a meeting that should have been an email.
// The joke lands on the last word: the meeting's only decision
// is to hold another meeting about whether it could have been an email.
const ENTRY =
  "The only decision from our hour-long meeting was to schedule another meeting — to decide whether it could have been an email.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

// Self-checking gate (sealed rules: 1-200 chars, exactly one line,
// plain text, not only whitespace). Fail loudly instead of writing junk.
const lines = ENTRY.split("\n");
if (ENTRY.length < 1 || ENTRY.length > 200) {
  console.error(`gate failed: entry is ${ENTRY.length} chars (must be 1-200)`);
  process.exit(1);
}
if (lines.length !== 1 || ENTRY.trim().length === 0) {
  console.error("gate failed: entry must be exactly one non-blank line");
  process.exit(1);
}
if (ENTRY.includes("\r") || ENTRY !== ENTRY.trim()) {
  console.error("gate failed: entry must have no stray carriage return or padding");
  process.exit(1);
}
console.error(`gate passed: ${ENTRY.length} chars, 1 line`);

writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
