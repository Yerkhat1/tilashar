# Tілашар — learn Kazakh

A polished, game-first web app that teaches Kazakh, built by collecting the best
mechanic from each leading language app into one product. English **and** Russian
interface. Mascot: Barys, the snow leopard (Kazakhstan's national animal).

## Run it
Local preview: `.claude/launch.json` name `tilashar` (port 8130), or open `index.html`
in any browser. Single self-contained file, no build step, no dependencies, works offline.

## What it borrows, and from where
| Source app | What we took |
|---|---|
| **Duolingo** | unit path, streak, hearts/lives, XP + levels, daily-goal ring, combo bonus, lesson-complete celebration, a mascot with personality |
| **Anki** | real spaced repetition — SM-2-style intervals + ease factor + cross-session due dates, not a single "mastered" flag |
| **Drops / Rosetta Stone** | picture-association exercises (learn a word from its image, no translation), tight ~5-min sessions, minimalist visuals |
| **Quizlet** | the tap-to-match pairs mini-game |
| **Memrise / Babbel** | listening exercises with native audio, word-tile sentence building |
| **Clozemaster** | words in real sentence context |

## Eight exercise types (all verified in-browser, no console errors)
1. **Intro card** — teaches a new word (emoji + Kazakh + meaning + audio) before testing it
2. **Multiple choice** — Kazakh → meaning
3. **Reverse** — meaning → Kazakh word
4. **Listening** — hear the word, pick the meaning
5. **Picture** — see the image, pick the word (Drops/Rosetta)
6. **Type** — type the translation
7. **Match pairs** — Quizlet-style tap-matching mini-game
8. **Sentence build** — assemble the translation from word tiles

## Systems
- **Spaced repetition (SM-2 lite):** every word carries `strength` (0–6), `ease`, an
  `interval` and a `due` timestamp. A correct answer grows the interval (1 → 3 → ease-scaled)
  and pushes the word out; a miss resets it and brings the word back sooner. Due words are
  prioritised each lesson, across sessions.
- **Game loop:** 5 hearts per lesson (run out → retry), daily-goal ring, streak with day
  tracking, XP with a combo multiplier, levels with a level-up celebration.
- **Feel:** Web-Audio sound effects (correct / wrong / complete / level-up, mutable),
  canvas confetti, spring button presses, screen-transition animation, a custom inline-SVG
  animated mascot (blinks + bobs), light + dark themes, mobile-first.
- **Content:** 6 themed units, 48 Kazakh words (Cyrillic incl. ә ғ қ ң ө ұ ү і) each with an
  emoji, plus example sentences for the build exercise. EN/RU throughout.

## Files
- `index.html` — the entire app (single self-contained file).
- `schema.sql` — Postgres/Supabase schema the app maps onto 1:1: `decks → units → words`
  (+ `emoji`) and `sentences`; per-user `profiles`, `srs_state` (strength/ease/interval/due),
  `sessions`; RLS so content is world-readable and each user's state is private. The app runs
  on `localStorage` today; moving to Supabase is a data-layer swap, not a rewrite.

## Not done here (needs a go)
- **Live URL / deploy:** Vercel + Supabase must be authorised in an interactive session, and
  a public push is an outward action → awaiting a mentor "go".
- **Content depth:** 6 units is a real, playable slice, not the full course. More units, the
  okulyk.kz book material, grammar tips, and native-speaker audio recordings are additive on
  the same data shape.
- **Kazakh review:** vocabulary and example sentences are kept to common, high-confidence
  material; a native read-through is worth doing before any public ship. Audio currently uses
  the browser speech engine (kk-KZ), which is not available on every device — real recordings
  would upgrade it.
