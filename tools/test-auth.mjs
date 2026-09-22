#!/usr/bin/env node
/* =====================================================================
   Tілашар — tests for assets/auth.js.

   These exercise OUR logic (provider selection, state <-> row mapping,
   the dirty-row diff, debounce/flush, guest adoption) against a stub
   Supabase client. They do NOT prove the network contract with a real
   project — only a live instance can do that.

   Run:  node tools/test-auth.mjs
   ===================================================================== */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { webcrypto } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
let pass = 0, fail = 0;
const ok = (name, cond, extra) => cond
  ? (pass++, console.log("  ✓ " + name))
  : (fail++, console.log("  ✗ " + name + (extra ? "  → " + JSON.stringify(extra) : "")));

/* ---------- minimal browser ---------- */
function makeEnv(supabaseStub, config) {
  const store = new Map();
  const localStorage = {
    getItem: k => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: k => store.delete(k),
    clear: () => store.clear(),
  };
  const win = { SUPABASE: config || { url: "", anonKey: "" }, supabase: supabaseStub };
  const ctx = { window: win, localStorage, crypto: webcrypto, console,
                setTimeout, clearTimeout, TextEncoder, JSON, Math, Date, Object, Promise, Number, Array, RegExp };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, "assets/auth.js"), "utf8") + "\n;globalThis.__Auth = Auth;", ctx);
  return { Auth: ctx.__Auth, store, win };
}

/* ---------- stub Supabase ---------- */
function stubSupabase() {
  const db = { profiles: new Map(), srs_state: new Map() };
  const calls = { upsertProfiles: 0, upsertSrs: 0, srsRowsSent: [] };
  let session = null;

  const table = name => ({
    select() { return this; },
    eq(col, val) { this._eq = [col, val]; return this; },
    maybeSingle() {
      const row = name === "profiles" ? db.profiles.get(this._eq[1]) : null;
      return Promise.resolve({ data: row || null, error: null });
    },
    then(res) {                       // awaiting the builder = run the select
      const rows = name === "srs_state"
        ? [...db.srs_state.values()].filter(r => r.user_id === this._eq[1])
        : name === "sessions"
        ? (db.sessions || []).filter(r => r.user_id === this._eq[1])
        : [...db.profiles.values()];
      return Promise.resolve({ data: rows, error: null }).then(res);
    },
    insert(payload) {
      const rows = Array.isArray(payload) ? payload : [payload];
      db.sessions = db.sessions || [];
      rows.forEach(r => db.sessions.push({ ...r, finished_at: new Date().toISOString() }));
      return Promise.resolve({ data: rows, error: null });
    },
    order() { return this; },
    limit() { return this; },
    upsert(payload) {
      const rows = Array.isArray(payload) ? payload : [payload];
      if (name === "profiles") { calls.upsertProfiles++; rows.forEach(r => db.profiles.set(r.id, { ...db.profiles.get(r.id), ...r })); }
      else { calls.upsertSrs++; calls.srsRowsSent.push(rows.length); rows.forEach(r => db.srs_state.set(r.user_id + "|" + r.word_id, r)); }
      return Promise.resolve({ data: rows, error: null });
    },
  });

  return {
    db, calls,
    createClient: () => ({
      from: table,
      auth: {
        getSession: () => Promise.resolve({ data: { session }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
        signUp: ({ email, password, options }) => {
          if (email === "taken@x.kz") return Promise.resolve({ data: {}, error: { message: "User already registered" } });
          const user = { id: "uuid-1", email, user_metadata: { display_name: options.data.display_name } };
          session = { user };
          return Promise.resolve({ data: { user, session }, error: null });
        },
        signInWithPassword: ({ email, password }) => {
          if (password !== "test1234") return Promise.resolve({ data: {}, error: { message: "Invalid login credentials" } });
          const user = { id: "uuid-1", email, user_metadata: { display_name: "Ramazan" } };
          session = { user };
          return Promise.resolve({ data: { user, session }, error: null });
        },
        signOut: () => { session = null; return Promise.resolve({ error: null }); },
      },
    }),
  };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const CFG = { url: "https://abcdefghijklm.supabase.co", anonKey: "anon-key" };

/* ═════════ 1. provider selection ═════════ */
console.log("\nprovider selection");
{
  const { Auth } = makeEnv(stubSupabase(), { url: "", anonKey: "" });
  await Auth.init();
  ok("no config -> local", Auth.provider === "local", Auth.provider);
}
{
  const { Auth } = makeEnv(stubSupabase(), CFG);
  await Auth.init();
  ok("config + library -> supabase", Auth.provider === "supabase", Auth.provider);
}
{
  const { Auth } = makeEnv(undefined, CFG);      // library blocked / failed to load
  await Auth.init();
  ok("config but no supabase-js -> falls back to local", Auth.provider === "local", Auth.provider);
}
{
  const broken = { createClient: () => { throw new Error("bad key"); } };
  const { Auth } = makeEnv(broken, CFG);
  await Auth.init();
  ok("client throws -> falls back, app still runs", Auth.provider === "local", Auth.provider);
}
{
  const { Auth } = makeEnv(stubSupabase(), { url: "http://not-supabase.example", anonKey: "k" });
  await Auth.init();
  ok("non-supabase url rejected", Auth.provider === "local", Auth.provider);
}

/* ═════════ 2. sign up / in / out ═════════ */
console.log("\naccounts (supabase)");
{
  const sb = stubSupabase();
  const { Auth } = makeEnv(sb, CFG);
  await Auth.init();
  ok("starts signed out", Auth.user() === null);

  const bad = await Auth.signUp({ name: "R", email: "taken@x.kz", password: "test1234" });
  ok("duplicate email -> email_taken", bad.error === "email_taken", bad);

  const up = await Auth.signUp({ name: "Ramazan", email: "r@x.kz", password: "test1234" });
  ok("sign up returns the user", up.user && up.user.id === "uuid-1", up);
  ok("display_name carried through", up.user.name === "Ramazan", up.user);
  ok("profile row created on sign up", sb.db.profiles.has("uuid-1"));

  const wrong = await Auth.signIn({ email: "r@x.kz", password: "nope" });
  ok("wrong password -> bad_password", wrong.error === "bad_password", wrong);

  await Auth.signOut();
  ok("sign out clears the user", Auth.user() === null);
}

/* ═════════ 3. state <-> rows ═════════ */
console.log("\nprogress mapping");
{
  const sb = stubSupabase();
  const { Auth } = makeEnv(sb, CFG);
  await Auth.init();
  await Auth.signUp({ name: "Ramazan", email: "r@x.kz", password: "test1234" });

  const state = {
    lang: "ru", theme: "dark", muted: true,
    xp: 120, dailyXp: 40, goalDay: "2026-09-19", streak: 3, lastDay: "2026-09-19",
    srs: { "greetings:0": { str: 3, ease: 2.42, intv: 6, seen: 4, due: Date.parse("2026-09-25T00:00:00Z") } },
  };
  Auth.saveProgress(state);
  await Auth.flush();

  const prof = sb.db.profiles.get("uuid-1");
  ok("profile fields mapped", prof.xp === 120 && prof.streak === 3 && prof.ui_lang === "ru"
     && prof.theme === "dark" && prof.muted === true && prof.daily_xp === 40, prof);
  const row = sb.db.srs_state.get("uuid-1|greetings:0");
  ok("srs row mapped", row.strength === 3 && Number(row.ease) === 2.42 && row.interval_days === 6
     && row.seen_count === 4 && row.due_at === "2026-09-25T00:00:00.000Z", row);

  const back = await Auth.loadProgress();
  ok("round-trips xp/streak/lang", back.xp === 120 && back.streak === 3 && back.lang === "ru");
  ok("round-trips the srs entry", back.srs["greetings:0"].str === 3
     && back.srs["greetings:0"].intv === 6
     && back.srs["greetings:0"].due === state.srs["greetings:0"].due, back.srs);
}

/* ═════════ 4. only changed rows are sent ═════════ */
console.log("\nwrite efficiency");
{
  const sb = stubSupabase();
  const { Auth } = makeEnv(sb, CFG);
  await Auth.init();
  await Auth.signUp({ name: "R", email: "r@x.kz", password: "test1234" });

  const srs = {};
  for (let i = 0; i < 50; i++) srs["w:" + i] = { str: 1, ease: 2.3, intv: 1, seen: 1, due: 1000 + i };
  const state = { lang: "ru", theme: "auto", muted: false, xp: 0, dailyXp: 0, goalDay: null, streak: 0, lastDay: null, srs };

  Auth.saveProgress(state); await Auth.flush();
  ok("first write sends all 50 rows", sb.calls.srsRowsSent[0] === 50, sb.calls.srsRowsSent);

  Auth.saveProgress(JSON.parse(JSON.stringify(state))); await Auth.flush();
  ok("unchanged state sends no srs rows", sb.calls.srsRowsSent.length === 1, sb.calls.srsRowsSent);

  state.srs["w:7"].str = 2; state.xp = 10;
  Auth.saveProgress(state); await Auth.flush();
  ok("one changed word sends exactly 1 row", sb.calls.srsRowsSent[1] === 1, sb.calls.srsRowsSent);

  const before = sb.calls.upsertProfiles;
  for (let i = 0; i < 8; i++) { state.xp = 100 + i; Auth.saveProgress(state); }
  await Auth.flush();
  ok("8 rapid answers debounce into 1 write", sb.calls.upsertProfiles - before === 1,
     { writes: sb.calls.upsertProfiles - before });
  ok("last value wins after debounce", sb.db.profiles.get("uuid-1").xp === 107, sb.db.profiles.get("uuid-1").xp);
}

/* ═════════ 4b. lesson history ═════════ */
console.log("\nlesson history");
{
  const sb = stubSupabase();
  const { Auth } = makeEnv(sb, CFG);
  await Auth.init();
  await Auth.signUp({ name: "R", email: "r@x.kz", password: "test1234" });

  Auth.logSession({ unitId: "greetings", correct: 7, total: 8, xp: 62 });
  Auth.logSession({ unitId: null, correct: 4, total: 4, xp: 40 });   // cross-unit review
  await sleep(20);

  const rows = await Auth.loadSessions();
  ok("both lessons recorded", rows.length === 2, rows.length);
  ok("unit lesson keeps its unit", rows.some(r => r.unit_id === "greetings" && r.correct === 7 && r.xp === 62), rows);
  ok("review session has a null unit (matches the nullable FK)", rows.some(r => r.unit_id === null), rows);
}
{
  const { Auth } = makeEnv(stubSupabase(), { url: "", anonKey: "" });
  await Auth.init();
  Auth.logSession({ unitId: "food", correct: 5, total: 6, xp: 50 });
  const rows = await Auth.loadSessions();
  ok("local provider records history too", rows.length === 1 && rows[0].unitId === "food", rows);
  for (let i = 0; i < 260; i++) Auth.logSession({ unitId: "food", correct: 1, total: 1, xp: 1 });
  ok("local history stays bounded at 200", (await Auth.loadSessions()).length === 200, (await Auth.loadSessions()).length);
}

/* ═════════ 5. guest -> account ═════════ */
console.log("\nguest adoption");
{
  const sb = stubSupabase();
  const { Auth, store } = makeEnv(sb, CFG);
  await Auth.init();
  store.set("tilashar.progress.guest", JSON.stringify({ xp: 30, srs: { "greetings:0": { str: 2, ease: 2.3, intv: 3, seen: 2, due: 5000 } } }));
  await Auth.signUp({ name: "R", email: "r@x.kz", password: "test1234" });
  const moved = await Auth.adoptGuestProgress();
  ok("guest progress adopted", moved === true);
  ok("adopted rows reached the db", sb.db.srs_state.has("uuid-1|greetings:0"));
  const again = await Auth.adoptGuestProgress();
  ok("not adopted twice over existing work", again === false);
}

/* ═════════ 6. local provider still intact ═════════ */
console.log("\nlocal provider");
{
  const { Auth } = makeEnv(stubSupabase(), { url: "", anonKey: "" });
  await Auth.init();
  const up = await Auth.signUp({ name: "R", email: "R@X.kz", password: "test1234" });
  ok("sign up works", !!up.user);
  ok("email normalised to lowercase", up.user.email === "r@x.kz", up.user.email);
  ok("duplicate refused", (await Auth.signUp({ name: "R2", email: "r@x.kz", password: "test1234" })).error === "email_taken");
  await Auth.signOut();
  ok("wrong password refused", (await Auth.signIn({ email: "r@x.kz", password: "bad" })).error === "bad_password");
  ok("unknown email refused", (await Auth.signIn({ email: "zz@x.kz", password: "test1234" })).error === "no_user");
  await Auth.signIn({ email: "r@x.kz", password: "test1234" });
  Auth.saveProgress({ xp: 55, srs: {} });
  ok("progress round-trips", (await Auth.loadProgress()).xp === 55);
  await Auth.signOut();
  ok("signed-out progress is separate from the account", ((await Auth.loadProgress()).xp || 0) !== 55);
}

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
