# Tілашар — learn Kazakh

A game-first web app that teaches Kazakh, built by taking the best mechanic from each
leading language app. Russian **and** English interface. Mascot: Barys, the snow leopard.

**Live:** https://tilashar-virid.vercel.app · **Repo:** https://github.com/Yerkhat1/tilashar

## Run it
`.claude/launch.json` → name `tilashar` (port 8130), or serve the folder with any static
server. No build step, no dependencies, no npm — plain HTML/CSS/JS.

```
python3 -m http.server 8130
```

## Files
```
index.html                 landing page (the public, indexable one)
app.html                   the app itself (auth + lessons), noindex
assets/ui.css              design system: tokens, buttons, cards, answers, animations
assets/landing.css         landing-only styles
assets/app.css             app screens
assets/content.js          the course: 20 units, 185 words, example sentences
assets/mascot.js           Barys, inline SVG, shared by both pages
assets/auth.js             auth + progress layer (local today, Supabase-ready)
assets/app.js              lesson engine, SRS, profile, theme, audio
assets/audio-manifest.json word id -> clip filename (GENERATED)
audio/                     206 pre-rendered Kazakh clips, 1.8 MB
tools/gen-audio-mac.mjs    render clips with the macOS Kazakh voice
tools/gen-audio.mjs        render clips with Azure, or rebuild the manifest
vercel.json                content-type + cache headers for the audio
schema.sql                 Postgres/Supabase schema the app maps onto 1:1
seed.sql                   the whole course as SQL — GENERATED, see tools/gen-seed.js
tools/gen-seed.js          regenerates seed.sql from content.js
tools/test-auth.mjs        tests for the auth/progress layer (node tools/test-auth.mjs)
tools/test-grading.mjs     tests for answer grading + question fairness
tools/gen-review-sheet.mjs builds REVIEW-kazakh.md, the native-speaker check sheet
sw.js                      service worker: offline + installable
REVIEW-kazakh.md           GENERATED — 185 words for a native speaker to confirm
robots.txt sitemap.xml manifest.webmanifest favicon.svg og.png
```

## Design
The visual system is ported from the Bayan Sulu Kids app (itself built on Duolingo's
game UI) and recoloured for Tілашар: Nunito 700–900, 3D buttons that press down on their
own bottom border, hard-offset card shadows, numbered answer badges, spring animations.
Palette is Tілашар's own — Kazakh sky-blue `#00A6D6` as the brand, gold for rewards,
green for correct, terracotta-red for wrong. Light and dark, phone-first.

## What it borrows, and from where
| Source app | What we took |
|---|---|
| **Duolingo** | unit path, streak, hearts/lives, XP + levels, daily-goal ring, combo bonus, lesson-complete celebration, a mascot with personality |
| **Anki** | real spaced repetition — SM-2-style intervals + ease factor + cross-session due dates, not a single "mastered" flag |
| **Drops / Rosetta Stone** | picture-association exercises, tight ~5-min sessions |
| **Quizlet** | the tap-to-match pairs mini-game |
| **Memrise / Babbel** | listening exercises, word-tile sentence building |
| **Clozemaster** | words in real sentence context |

## Eight exercise types
Intro card · multiple choice (kk→meaning) · reverse (meaning→kk) · listening · picture ·
type-the-translation · match pairs · sentence build. Plus a global **Practice/Review**
mode that pulls every word whose SRS due date has arrived, across all topics.

**Grading never punishes a correct learner.** A sentence is graded on its words, not on
whether the punctuation tiles were placed — "Hello How are you" passes against
"Hello ! How are you ?" — while word order, word choice and extra words still count. A
picture question is only ever asked for a word whose emoji identifies it alone: 29 words
carry `noPic` (weekdays, bigger numbers, phrases and a few others) because a picture
cannot honestly say "Thursday" or "eighty", and distractors never reuse the prompt's
emoji. `node tools/test-grading.mjs` pins both.

Keyboard: `1`–`4` pick an answer, `Enter` checks and then continues. The numbered badge on
each answer is the hint. Typing exercises are never hijacked.

Every finished lesson is recorded (unit, correct, total, XP) — to `sessions` on Supabase, or
a capped local log otherwise. A review session carries a null unit because it spans all of them.

## Offline and install
`sw.js` makes the app installable and usable with no connection — a student on the bus
with no signal still gets the lesson and hears the words. Per file type: HTML is
network-first so a deploy lands immediately, `assets/` is stale-while-revalidate, `audio/`
is cache-first (clip bytes never change under a name), and the audio manifest is
network-first so new clips are noticed. After each home render the app pushes the current
and next unit's clips into the cache ahead of time. Bump `VERSION` in `sw.js` on any change
to it; old caches are dropped on activate.

## Kazakh audio
`speechSynthesis` was the wrong tool: **no browser ships a kk-KZ voice** (0 of 180 on a
current Mac). Asking for `lang="kk-KZ"` returned `voice: null`, so the engine default —
Samantha, US English — read the Cyrillic aloud. That is why it sounded broken.

Audio is now **pre-rendered files**, not runtime synthesis. The word list is fixed, so the
same 206 clips would otherwise be re-synthesised for every user forever, need an API key
in a static page, and add latency. Generated once, they are 1.8 MB total, served free,
instant, and work offline.

```
node tools/gen-audio-mac.mjs        # macOS Kazakh system voice "Aru (kk_KZ)" — free, offline
node tools/gen-audio.mjs            # Azure kk-KZ-AigulNeural / kk-KZ-DauletNeural
node tools/gen-audio.mjs --manifest-only   # after dropping in hand recordings
```

`assets/audio-manifest.json` maps each word id to its real filename, so the app never
guesses at an extension or probes for 404s. **An existing clip is never overwritten**
without `--force`: drop a native speaker's recording at `audio/<id>.m4a` (or `.mp3`), rerun
`--manifest-only`, and it replaces the synthesised one, one word at a time.

Resolution order at runtime: a clip in `audio/` → a genuine kk-KZ system voice → **silence**.
Never an English voice mispronouncing Kazakh. With no audio at all, the speaker button is
hidden and listening exercises are dropped from the lesson rather than shipped broken.

## Accounts
`assets/auth.js` is one interface with two providers. Today `LocalProvider` keeps accounts
and per-user progress in the browser (password stored as a SHA-256 digest). It is a
device-side stand-in, **not real authentication** — the sign-up screen says so. Swapping in
`SupabaseProvider` (stubbed in the same file) changes nothing else in the app.

Guest mode works with no account, and signing up afterwards carries the guest's progress
into the new account.

## Search / SEO
- `index.html` ships full Russian content in the HTML (not rendered by JS), with title,
  description, canonical, hreflang, Open Graph + Twitter cards, and JSON-LD for
  `WebApplication` and `FAQPage`.
- `robots.txt` allows the landing, disallows `/app.html`, and points at `sitemap.xml`.
- `manifest.webmanifest` + `favicon.svg` make it installable to a phone home screen.
- **Google Search Console needs one human step:** get the verification token at
  search.google.com/search-console (URL prefix → HTML tag), paste it into the clearly
  marked placeholder in `index.html` `<head>`, redeploy, press Verify, then submit the
  sitemap.

## Turning on the backend (Supabase)
The app ships working, on-device. Four steps switch it to real accounts with progress
synced across devices; nothing in the app code changes.

1. **Create the project** at supabase.com (free tier is plenty).
2. **SQL Editor → run `schema.sql`**, then **run `seed.sql`**. In that order, and seed is
   required: `srs_state.word_id` is a foreign key into `words`, so with an empty `words`
   table every progress write fails. Both files re-run safely.
3. **Project Settings → API** → copy *Project URL* and the *anon / public* key into
   `assets/supabase-config.js`. The anon key is meant to be public; Row Level Security is
   what protects the data. Never put the `service_role` key there.
4. **Push.** Vercel redeploys from `main` on its own.

`node tools/test-auth.mjs` covers provider selection, the state↔row mapping, the
changed-rows-only diff, debouncing and guest adoption against a stub client — 31 checks.
It does not prove the network contract on its own — but that was verified against the live
project on 2026-09-23: sign up → a full Greetings lesson → the device wiped completely
(no session, no localStorage) → sign in again, and 150 XP, the 1-day streak and all 7
studied words came back. Profile, `srs_state` and the `sessions` row were each read
straight out of the database, not taken from the app's word for it.

`Auth.provider` in the browser console reports `"supabase"` once it is live. If the key is
wrong or the CDN is blocked, the app logs a warning and keeps running on-device rather
than breaking.

Authentication → Providers → Email: if "Confirm email" is on, a new account has to click
the link before signing in. The app shows that as its own message.

## Still open
- **Search Console** — the token placeholder in `index.html` is still unfilled.
- **Native-speaker read-through** — the check sheet is built and waiting: `REVIEW-kazakh.md`
  (regenerate with `node tools/gen-review-sheet.mjs`). 185 words and 21 sentences have not
  been confirmed by a Kazakh speaker, and a wrong word is worse than a missing one: a
  missing word is simply not learned, a wrong one is learned wrong.
- **Native-voice recordings** — the 206 clips are synthesised. Replacing them with a real
  speaker is a drop-in, file by file (see "Kazakh audio").
- **AI features** — deliberately postponed (Ramazan, 2026-09-17: ship without AI first).
