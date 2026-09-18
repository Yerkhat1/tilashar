/* Regenerate seed.sql from assets/content.js.  Run:  node tools/gen-seed.js  */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const { UNITS, ALL } = new Function(fs.readFileSync(path.join(root, "assets/content.js"), "utf8") + "\nreturn {UNITS,ALL};")();
const q = s => "'" + String(s).replace(/'/g, "''") + "'";
const arr = a => "ARRAY[" + a.map(q).join(",") + "]";
const out = [
  "-- Tілашар — content seed, GENERATED from assets/content.js.",
  "-- Do not hand-edit: regenerate with  node tools/gen-seed.js  after changing content.js.",
  "-- Apply after schema.sql. Idempotent: re-running updates rows in place.",
  "",
  `insert into decks (id,title,description) values ('kazakh-core','Қазақ тілі','Everyday Kazakh: ${UNITS.length} topics, ${ALL.length} words')`,
  "  on conflict (id) do update set title=excluded.title, description=excluded.description;",
  "",
];
UNITS.forEach((u, i) => {
  out.push(`insert into units (id,deck_id,name_en,name_ru,icon,ord) values (${[q(u.id), q("kazakh-core"), q(u.name.en), q(u.name.ru), q(u.icon), i].join(",")})`);
  out.push("  on conflict (id) do update set name_en=excluded.name_en, name_ru=excluded.name_ru, icon=excluded.icon, ord=excluded.ord;");
});
out.push("");
UNITS.forEach(u => u.words.forEach((w, i) => {
  out.push(`insert into words (id,unit_id,kk,en,ru,emoji,ord) values (${[q(w.id), q(u.id), q(w.kk), q(w.en), q(w.ru), q(w.e), i].join(",")})`);
  out.push("  on conflict (id) do update set kk=excluded.kk, en=excluded.en, ru=excluded.ru, emoji=excluded.emoji, ord=excluded.ord;");
}));
out.push("", "delete from sentences;  -- sentences have no natural key; replace wholesale");
UNITS.forEach(u => (u.sents || []).forEach(s =>
  out.push(`insert into sentences (unit_id,kk,en_tiles,ru_tiles) values (${[q(u.id), q(s.kk), arr(s.en), arr(s.ru)].join(",")});`)));
out.push("");
fs.writeFileSync(path.join(root, "seed.sql"), out.join("\n"));
console.log("seed.sql written from", UNITS.length, "units /", ALL.length, "words");
