#!/usr/bin/env node
/* =====================================================================
   Tілашар — pre-render every Kazakh word and sentence to audio/*.mp3.

   WHY PRE-RENDER instead of calling a TTS API from the browser:
     · the word list is fixed (185 words + 20 sentences), so the same audio
       would be re-synthesised for every user, forever;
     · an API key cannot live in a static page;
     · files are served free from Vercel, play instantly and work offline.
   Generate once, ship the mp3s.

   Usage:
     AZURE_SPEECH_KEY=xxx AZURE_SPEECH_REGION=westeurope \
       node tools/gen-audio.mjs [--voice kk-KZ-AigulNeural] [--force] [--only greetings]
     node tools/gen-audio.mjs --manifest-only     # after hand-recording clips

   Existing files are NEVER overwritten unless --force, so a clip recorded by
   a native speaker always wins over the synthesised one. Drop a real
   recording at audio/<id>.mp3 (colons become dashes) and re-run
   --manifest-only.

   Voices verified in Microsoft's own docs (learn.microsoft.com → Speech
   service → language support): kk-KZ-AigulNeural (female),
   kk-KZ-DauletNeural (male).
   ===================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "audio");
const manifestPath = path.join(root, "assets", "audio-manifest.json");

const argv = process.argv.slice(2);
const flag = (name, fb) => { const i = argv.indexOf("--" + name); return i === -1 ? fb : argv[i + 1]; };
const has = name => argv.includes("--" + name);

const VOICE  = flag("voice", "kk-KZ-AigulNeural");
const RATE   = flag("rate", "-8%");
const ONLY   = flag("only", null);
const FORCE  = has("force");
const MANIFEST_ONLY = has("manifest-only");

/* ---- the course, straight from the single source of truth ---- */
const src = fs.readFileSync(path.join(root, "assets/content.js"), "utf8");
const { UNITS } = new Function(src + "\nreturn { UNITS };")();

const items = [];
for (const u of UNITS) {
  if (ONLY && u.id !== ONLY) continue;
  for (const w of u.words) items.push({ id: w.id, text: w.kk });
  for (const s of u.sents || []) items.push({ id: s.id, text: s.kk });
}

const fileFor = id => path.join(outDir, id.replace(/:/g, "-") + ".mp3");

/* A clip may be .mp3 (Azure), .m4a (macOS `say`) or a hand recording in either.
   The manifest maps word id -> actual filename, so the app never guesses. */
const EXTS = ["m4a", "mp3", "ogg", "wav"];
function findClip(id) {
  const base = id.replace(/:/g, "-");
  for (const ext of EXTS) if (fs.existsSync(path.join(outDir, base + "." + ext))) return base + "." + ext;
  return null;
}
function writeManifest() {
  const files = {};
  for (const u of UNITS) {
    for (const w of u.words) { const f = findClip(w.id); if (f) files[w.id] = f; }
    for (const s of u.sents || []) { const f = findClip(s.id); if (f) files[s.id] = f; }
  }
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), files }));
  const total = UNITS.reduce((n, u) => n + u.words.length + (u.sents || []).length, 0);
  console.log(`manifest: ${Object.keys(files).length} / ${total} clips present → assets/audio-manifest.json`);
  return Object.keys(files).length;
}

if (MANIFEST_ONLY) { writeManifest(); process.exit(0); }

const KEY = process.env.AZURE_SPEECH_KEY;
const REGION = process.env.AZURE_SPEECH_REGION;
if (!KEY || !REGION) {
  console.error("Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION (e.g. westeurope).");
  console.error("Free tier covers this course many times over: the whole script is ~2 KB of text.");
  process.exit(1);
}

const endpoint = `https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
const xmlEsc = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]));

async function synth(text) {
  const ssml = `<speak version='1.0' xml:lang='kk-KZ'><voice name='${VOICE}'>` +
               `<prosody rate='${RATE}'>${xmlEsc(text)}</prosody></voice></speak>`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": KEY,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
      "User-Agent": "tilashar-gen-audio",
    },
    body: ssml,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${(await res.text()).slice(0, 200)}`);
  return Buffer.from(await res.arrayBuffer());
}

fs.mkdirSync(outDir, { recursive: true });
let made = 0, kept = 0, failed = 0;

for (const it of items) {
  const dest = fileFor(it.id);
  if (findClip(it.id) && !FORCE) { kept++; continue; }   // any existing clip wins
  try {
    fs.writeFileSync(dest, await synth(it.text));
    made++;
    process.stdout.write(`\r${made} synthesised (${it.id})            `);
    await new Promise(r => setTimeout(r, 120));   // stay well under the rate limit
  } catch (e) {
    failed++;
    console.error(`\n! ${it.id} "${it.text}": ${e.message}`);
  }
}

console.log(`\nvoice ${VOICE} · ${made} new · ${kept} kept (already on disk) · ${failed} failed`);
writeManifest();
