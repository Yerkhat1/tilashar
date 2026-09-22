-- Tілашар — database schema (Postgres / Supabase)
-- The app (app.html + assets/) runs on localStorage today and mirrors this exact
-- shape, so moving to the DB is a data-layer swap, not a rewrite: fill in
-- SupabaseProvider in assets/auth.js and nothing else changes.
-- Content lives in decks/units/words; per-user learning state lives in srs_state.
--
-- ORDER MATTERS: run this file, THEN seed.sql. srs_state.word_id is a foreign
-- key into words, so with an unseeded words table every single progress write
-- fails. Seeding is required, not optional.
--
-- Both files are safe to re-run.

-- ---------- CONTENT (authored once, shared by all learners) ----------
create table if not exists decks (
  id          text primary key,           -- e.g. 'kazakh-core'
  title       text not null,
  description text,
  created_at  timestamptz default now()
);

create table if not exists units (
  id        text primary key,             -- e.g. 'greetings'
  deck_id   text not null references decks(id) on delete cascade,
  name_en   text not null,
  name_ru   text not null,
  icon      text,
  ord       int not null                  -- order on the path
);

create table if not exists words (
  id      text primary key,               -- e.g. 'greetings:0'
  unit_id text not null references units(id) on delete cascade,
  kk      text not null,                  -- Kazakh (Cyrillic, incl. ә ғ қ ң ө ұ ү і)
  en      text not null,
  ru      text not null,
  emoji   text,                           -- picture-association exercises (Drops/Rosetta)
  ord     int not null
);
create index if not exists words_unit_idx on words(unit_id);

-- Example sentences used by the sentence-build exercise (Clozemaster/Duolingo).
-- kk is the shown Kazakh sentence; en_tiles/ru_tiles are the ordered correct tiles.
create table if not exists sentences (
  id       bigserial primary key,
  unit_id  text not null references units(id) on delete cascade,
  kk       text not null,
  en_tiles text[] not null,
  ru_tiles text[] not null
);
create index if not exists sentences_unit_idx on sentences(unit_id);

-- ---------- LEARNERS ----------
-- On Supabase, profiles.id = auth.users.id (managed by Supabase Auth).
create table if not exists profiles (
  id           uuid primary key,          -- references auth.users(id)
  display_name text,
  ui_lang      text not null default 'en' check (ui_lang in ('en','ru')),
  xp           int  not null default 0,
  daily_xp     int  not null default 0,   -- XP toward today's goal
  goal_day     date,                      -- the day daily_xp belongs to
  streak       int  not null default 0,
  last_day     date,
  theme        text not null default 'auto' check (theme in ('auto','light','dark')),
  muted        boolean not null default false,
  created_at   timestamptz default now()
);

-- Per-user, per-word spaced-repetition state (one row per word the user has seen).
create table if not exists srs_state (
  user_id       uuid not null references profiles(id) on delete cascade,
  word_id       text not null references words(id) on delete cascade,
  strength      int  not null default 0 check (strength between 0 and 6), -- >=3 = learned
  ease          numeric(3,2) not null default 2.30 check (ease between 1.30 and 3.20),
  interval_days int  not null default 0,  -- SM-2 interval; 0 = relearn today
  seen_count    int  not null default 0,
  miss_count    int  not null default 0,
  due_at        timestamptz,              -- next review time (cross-session SRS)
  updated_at    timestamptz default now(),
  primary key (user_id, word_id)
);
create index if not exists srs_due_idx on srs_state(user_id, due_at);

-- Optional: per-lesson history for streaks / analytics.
create table if not exists sessions (
  id         bigserial primary key,
  user_id    uuid not null references profiles(id) on delete cascade,
  unit_id    text references units(id),   -- null = a cross-unit review session
  correct    int  not null,
  total      int  not null,
  xp         int  not null,
  finished_at timestamptz default now()
);

-- ---------- ROW LEVEL SECURITY (Supabase) ----------
-- Re-runnable: every policy is dropped before it is created.
-- Content is world-readable; user state is private to its owner.
alter table decks     enable row level security;
alter table units     enable row level security;
alter table words     enable row level security;
alter table sentences enable row level security;
alter table profiles  enable row level security;
alter table srs_state enable row level security;
alter table sessions  enable row level security;

drop policy if exists "content readable" on decks;
create policy "content readable" on decks     for select using (true);
drop policy if exists "units readable" on units;
create policy "units readable"   on units     for select using (true);
drop policy if exists "words readable" on words;
create policy "words readable"   on words     for select using (true);
drop policy if exists "sents readable" on sentences;
create policy "sents readable"   on sentences for select using (true);

drop policy if exists "own profile" on profiles;
create policy "own profile"   on profiles  for all using (auth.uid() = id)         with check (auth.uid() = id);
drop policy if exists "own srs" on srs_state;
create policy "own srs"        on srs_state for all using (auth.uid() = user_id)    with check (auth.uid() = user_id);
drop policy if exists "own sessions" on sessions;
create policy "own sessions"   on sessions  for all using (auth.uid() = user_id)    with check (auth.uid() = user_id);
