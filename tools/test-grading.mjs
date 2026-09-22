#!/usr/bin/env node
/* =====================================================================
   Tілашар — tests for how answers are graded and what the course may ask.

   These exist because of two bugs found in real play on 2026-09-23:
     · a correct sentence was marked wrong over a missing "!" tile
     · the picture question showed 1️⃣ for Бір, Дүйсенбі and Он бір at once,
       so a correct answer could be marked wrong
   Both punish a learner for knowing the right thing, which is the worst
   failure an app that teaches can have.

   Run:  node tools/test-grading.mjs
   ===================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
let pass = 0, fail = 0;
const ok = (name, cond, extra) => cond
  ? (pass++, console.log("  ✓ " + name))
  : (fail++, console.log("  ✗ " + name + (extra !== undefined ? "  → " + JSON.stringify(extra) : "")));

const { UNITS, ALL } = new Function(
  fs.readFileSync(path.join(root, "assets/content.js"), "utf8") + "\nreturn { UNITS, ALL };")();

/* Pull the real helpers out of app.js — testing a copy would prove nothing. */
const appSrc = fs.readFileSync(path.join(root, "assets/app.js"), "utf8");
const grab = name => {
  const m = appSrc.match(new RegExp("const " + name + " = [\\s\\S]*?;\\n"));
  if (!m) throw new Error("could not find " + name + " in app.js");
  return m[0];
};
const { sentenceKey, prettySentence } =
  new Function(grab("sentenceKey") + grab("prettySentence") + "return { sentenceKey, prettySentence };")();

const graded = (answer, target) => sentenceKey(answer) === sentenceKey(target);

/* ═════════ 1. the bug that was reported ═════════ */
console.log("\nsentence grading — the reported case");
{
  const target = ["Hello", "!", "How", "are", "you", "?"];
  ok("exact answer", graded(["Hello","!","How","are","you","?"], target));
  ok("without the ! tile  (the reported bug)", graded(["Hello","How","are","you","?"], target));
  ok("without the ? tile", graded(["Hello","!","How","are","you"], target));
  ok("with no punctuation at all", graded(["Hello","How","are","you"], target));
  ok("different capitalisation", graded(["hello","!","how","ARE","you","?"], target));
}

console.log("\nsentence grading — still strict where it matters");
{
  const target = ["Hello", "!", "How", "are", "you", "?"];
  ok("wrong word order is wrong", !graded(["How","are","you","Hello"], target));
  ok("a missing word is wrong", !graded(["Hello","How","you"], target));
  ok("an extra word is wrong", !graded(["Hello","How","are","you","today"], target));
  ok("a wrong word is wrong", !graded(["Hello","How","is","you"], target));
  ok("empty is wrong", !graded([], target));
}

console.log("\nevery sentence in the course");
{
  let bad = [];
  UNITS.forEach(u => (u.sents || []).forEach(s => {
    ["en", "ru"].forEach(lang => {
      const t = s[lang];
      if (!graded(t, t)) bad.push(s.kk + " " + lang);
      const noPunct = t.filter(x => /[\p{L}\p{N}]/u.test(x));
      if (!graded(noPunct, t)) bad.push(s.kk + " " + lang + " (no punctuation)");
      if (!sentenceKey(t).length) bad.push(s.kk + " " + lang + " (empty key)");
    });
  }));
  ok("all 21 sentences accept their own answer, with or without punctuation", bad.length === 0, bad);
}

console.log("\nwhat the learner is shown as the right answer");
{
  ok("punctuation is not left floating", prettySentence(["Hello","!","How","are","you","?"]) === "Hello! How are you?",
     prettySentence(["Hello","!","How","are","you","?"]));
  ok("russian too", prettySentence(["Привет","!","Как","дела","?"]) === "Привет! Как дела?",
     prettySentence(["Привет","!","Как","дела","?"]));
}

/* ═════════ 2. questions that must have exactly one right answer ═════════ */
console.log("\npicture questions");
{
  const pic = ALL.filter(w => !w.noPic);
  const byEmoji = {};
  pic.forEach(w => (byEmoji[w.e] = byEmoji[w.e] || []).push(w.kk));
  const clashes = Object.entries(byEmoji).filter(([, v]) => v.length > 1);
  ok("no two askable words share a picture", clashes.length === 0, clashes);
  ok("enough words remain askable", pic.length >= 120, pic.length);

  const tooFew = ALL.filter(w => ALL.filter(x => x !== w && x.e !== w.e).length < 3).map(w => w.kk);
  ok("every word has 3 distractors with a different picture", tooFew.length === 0, tooFew);
}

console.log("\nmultiple-choice questions");
{
  const dupes = key => {
    const m = {};
    ALL.forEach(w => (m[w[key].toLowerCase()] = m[w[key].toLowerCase()] || []).push(w.kk));
    return Object.entries(m).filter(([, v]) => v.length > 1);
  };
  ok("no two words share a Russian translation", dupes("ru").length === 0, dupes("ru"));
  ok("no two words share an English translation", dupes("en").length === 0, dupes("en"));
  const kk = {};
  ALL.forEach(w => (kk[w.kk.toLowerCase()] = kk[w.kk.toLowerCase()] || []).push(w.id));
  ok("no two entries share a Kazakh form", Object.values(kk).every(v => v.length === 1));
}

console.log("\ncourse integrity");
{
  const ids = new Set(ALL.map(w => w.id));
  ok("every word id is unique", ids.size === ALL.length, { ids: ids.size, words: ALL.length });
  ok("every word is complete", ALL.every(w => w.kk && w.en && w.ru && w.e));
  ok("every unit has at least one sentence", UNITS.every(u => (u.sents || []).length >= 1));
  ok("every sentence has an id for its audio clip", UNITS.every(u => (u.sents || []).every(s => !!s.id)));
}

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
