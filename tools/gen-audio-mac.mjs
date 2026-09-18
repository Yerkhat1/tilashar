#!/usr/bin/env node
/* =====================================================================
   Tілашар — render the course with the macOS Kazakh system voice.

   macOS ships a real Kazakh voice, `Aru (kk_KZ)`, which `say(1)` can use
   even though browsers do not expose it to speechSynthesis. That makes a
   full, genuinely Kazakh audio set free and offline, with no API account.

   Usage:
     node tools/gen-audio-mac.mjs [--voice Aru] [--rate 170] [--force] [--only greetings]

   Existing clips are never overwritten without --force, so a native
   speaker's recording always beats the synthesised one. Writes the
   manifest at the end.
   ===================================================================== */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "audio");

const argv = process.argv.slice(2);
const flag = (n, fb) => { const i = argv.indexOf("--" + n); return i === -1 ? fb : argv[i + 1]; };
const VOICE = flag("voice", "Aru");
const RATE  = flag("rate", "165");          // words per minute; learners need it slow
const ONLY  = flag("only", null);
const FORCE = argv.includes("--force");

const src = fs.readFileSync(path.join(root, "assets/content.js"), "utf8");
const { UNITS } = new Function(src + "\nreturn { UNITS };")();

const voices = execFileSync("say", ["-v", "?"], { encoding: "utf8" });
if (!new RegExp("^" + VOICE + "\\s", "m").test(voices)) {
  console.error(`Voice "${VOICE}" is not installed.`);
  console.error("System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → Kazakh.");
  process.exit(1);
}

const items = [];
for (const u of UNITS) {
  if (ONLY && u.id !== ONLY) continue;
  for (const w of u.words) items.push({ id: w.id, text: w.kk });
  for (const s of u.sents || []) items.push({ id: s.id, text: s.kk });
}

const EXTS = ["m4a", "mp3", "ogg", "wav"];
const existing = id => EXTS.map(e => path.join(outDir, id.replace(/:/g, "-") + "." + e)).find(fs.existsSync);

fs.mkdirSync(outDir, { recursive: true });
const tmp = path.join(os.tmpdir(), "tilashar-tts.aiff");
let made = 0, kept = 0, failed = 0;

for (const it of items) {
  if (existing(it.id) && !FORCE) { kept++; continue; }
  const dest = path.join(outDir, it.id.replace(/:/g, "-") + ".m4a");
  try {
    execFileSync("say", ["-v", VOICE, "-r", String(RATE), "-o", tmp, it.text]);
    execFileSync("afconvert", ["-f", "m4af", "-d", "aac", "-b", "48000", tmp, dest]);
    made++;
    process.stdout.write(`\r${made} rendered (${it.id})            `);
  } catch (e) {
    failed++;
    console.error(`\n! ${it.id} "${it.text}": ${e.message.split("\n")[0]}`);
  }
}
fs.rmSync(tmp, { force: true });
console.log(`\nvoice ${VOICE} @ ${RATE} wpm · ${made} new · ${kept} kept · ${failed} failed`);
execFileSync("node", [path.join(root, "tools/gen-audio.mjs"), "--manifest-only"], { stdio: "inherit" });
