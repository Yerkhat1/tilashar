#!/usr/bin/env node
/* Generate REVIEW-kazakh.md — the native-speaker check sheet, from content.js.
   Run: node tools/gen-review-sheet.mjs                                        */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const { UNITS, ALL } = new Function(
  fs.readFileSync(path.join(root, "assets/content.js"), "utf8") + "\nreturn { UNITS, ALL };")();

const sents = UNITS.reduce((n, u) => n + (u.sents || []).length, 0);
const out = [];

out.push(`# Тілашар — проверка казахского`);
out.push("");
const plural = (n, one, few, many) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
};
out.push(`**${ALL.length} ${plural(ALL.length, "слово", "слова", "слов")} и ${sents} ${plural(sents, "предложение", "предложения", "предложений")}. Их пока не проверял ни один носитель языка, а мы на них учим людей.**`);
out.push("");
out.push("Что нужно от тебя, Рамазан: пройтись по таблицам и в последней колонке поставить **+** если всё верно, или написать правильный вариант, если нет.");
out.push("");
out.push("На что смотреть:");
out.push("");
out.push("1. **Написание.** Особенно буквы ә ғ қ ң ө ұ ү і — легко перепутать с а, г, к, н, о, у, у, и.");
out.push("2. **Перевод.** Не «а так тоже можно сказать», а то ли это слово, которое казах правда употребит в этом значении первым.");
out.push("3. **Предложения.** Грамотно ли построено и звучит ли естественно, а не как перевод с русского.");
out.push("4. **Чего не хватает.** Если в теме пропущено очевидное слово — допиши внизу темы.");
out.push("");
out.push("Если что-то спорное, лучше напиши «спорно» и почему, чем поставить плюс на всякий случай. Неверное слово в приложении хуже, чем отсутствующее: отсутствующее человек просто не выучит, а неверное выучит именно в неправильном виде.");
out.push("");
out.push("---");
out.push("");

UNITS.forEach((u, ui) => {
  out.push(`## ${ui + 1}. ${u.icon} ${u.name.ru} · ${u.name.en}`);
  out.push("");
  out.push("| # | Қазақша | Русский | English | + / исправление |");
  out.push("|---|---------|---------|---------|------------------|");
  u.words.forEach((w, i) => out.push(`| ${i + 1} | **${w.kk}** | ${w.ru} | ${w.en} | |`));
  out.push("");
  (u.sents || []).forEach(s => {
    out.push(`> **Предложение:** ${s.kk}`);
    out.push(`> Сборка RU: ${s.ru.join(" ")} · EN: ${s.en.join(" ")}`);
    out.push("> ");
    out.push("> Верно / исправление: ");
    out.push("");
  });
  out.push("**Чего не хватает в этой теме:**");
  out.push("");
  out.push("---");
  out.push("");
});

fs.writeFileSync(path.join(root, "REVIEW-kazakh.md"), out.join("\n"));
console.log(`REVIEW-kazakh.md: ${UNITS.length} topics, ${ALL.length} words, ${sents} sentences`);
