/* =====================================================================
   Tілашар — auth + progress layer.

   ONE interface, TWO providers, chosen at boot by assets/supabase-config.js:
     · SupabaseProvider — real accounts, progress synced across devices.
     · LocalProvider    — everything in this browser. Used when Supabase is
                          not configured, and as the fallback if it fails
                          to load, so the app never dies on a bad key.

   Interface (the app knows only this):
     Auth.init()                 -> Promise, resolves the session
     Auth.provider               -> "supabase" | "local"
     Auth.user()                 -> {id,name,email} | null   (sync, cached)
     Auth.signUp/signIn/signOut  -> Promise<{user}|{error}>
     Auth.loadProgress()         -> Promise<state>
     Auth.saveProgress(state)    -> void (debounced, fire-and-forget)
     Auth.logSession(row)        -> void, one finished lesson
     Auth.loadSessions()         -> Promise<rows>, newest first
     Auth.flush()                -> Promise, force-write pending state
     Auth.adoptGuestProgress()   -> Promise<bool>, carry a guest's work in
   ===================================================================== */

const Auth = (() => {
  const UKEY = "tilashar.users";
  const SKEY = "tilashar.session";

  const readJSON = (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch (e) { return fb; } };
  const writeJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  /* srs(id) in the app creates an entry the moment a word is merely LOOKED at
     — the home screen's progress rings read every word — so the state ends up
     holding all 185 with seen:0. Only words the learner actually worked on
     belong in storage; the rest are noise that would be written for every
     user on their first lesson. */
  const studied = c => !!c && (c.seen > 0 || c.str > 0 || c.intv > 0);
  const pruneSrs = srs => {
    const out = {};
    for (const [k, v] of Object.entries(srs || {})) if (studied(v)) out[k] = v;
    return out;
  };

  const uid = () => "u_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  const clean = u => u && { id: u.id, name: u.name, email: u.email };

  async function digest(text) {
    try {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("tlsr:" + text));
      return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
    } catch (e) {
      let h = 0; for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
      return "fb" + (h >>> 0).toString(16);
    }
  }

  /* ═══════════════ LOCAL ═══════════════
     Device-side stand-in. Passwords are stored as a SHA-256 digest, but
     anything client-side is inspectable: this is not real authentication,
     and the sign-up screen says so. */
  const LocalProvider = {
    name: "local",
    _user: null,

    async init() {
      const id = localStorage.getItem(SKEY);
      this._user = id ? (clean(readJSON(UKEY, []).find(u => u.id === id)) || null) : null;
    },
    user() { return this._user; },

    async signUp({ name, email, password }) {
      const users = readJSON(UKEY, []);
      const mail = (email || "").trim().toLowerCase();
      if (users.some(u => u.email === mail)) return { error: "email_taken" };
      const rec = { id: uid(), name: (name || "").trim(), email: mail, pass: await digest(password), created: Date.now() };
      users.push(rec); writeJSON(UKEY, users);
      localStorage.setItem(SKEY, rec.id);
      this._user = clean(rec);
      return { user: this._user };
    },
    async signIn({ email, password }) {
      const mail = (email || "").trim().toLowerCase();
      const rec = readJSON(UKEY, []).find(u => u.email === mail);
      if (!rec) return { error: "no_user" };
      if (rec.pass !== await digest(password)) return { error: "bad_password" };
      localStorage.setItem(SKEY, rec.id);
      this._user = clean(rec);
      return { user: this._user };
    },
    async signOut() { localStorage.removeItem(SKEY); this._user = null; return {}; },

    key(u) { return "tilashar.progress." + (u ? u.id : "guest"); },
    logKey(u) { return "tilashar.sessions." + (u ? u.id : "guest"); },
    async loadProgress() { return readJSON(this.key(this._user), {}); },
    saveProgress(state) { writeJSON(this.key(this._user), { ...state, srs: pruneSrs(state.srs) }); },
    logSession(row) {
      const log = readJSON(this.logKey(this._user), []);
      log.push({ ...row, at: Date.now() });
      writeJSON(this.logKey(this._user), log.slice(-200));   // keep it bounded
    },
    async loadSessions() { return readJSON(this.logKey(this._user), []); },
    async flush() {},
  };

  /* ═══════════════ SUPABASE ═══════════════
     Maps 1:1 onto schema.sql. Writes are debounced and only send the SRS
     rows that actually changed, so a lesson is a couple of round trips,
     not one per answer. */
  const SupabaseProvider = {
    name: "supabase",
    sb: null,
    _user: null,
    _lastSrs: {},          // snapshot of what the server already has
    _timer: null,
    _pending: null,
    _inflight: null,

    async init() {
      const cfg = window.SUPABASE || {};
      this.sb = window.supabase.createClient(cfg.url, cfg.anonKey, {
        auth: { persistSession: true, autoRefreshToken: true },
      });
      const { data } = await this.sb.auth.getSession();
      this._user = this._shape(data && data.session && data.session.user);
      this.sb.auth.onAuthStateChange((_e, session) => {
        this._user = this._shape(session && session.user);
      });
    },
    _shape(u) {
      if (!u) return null;
      return { id: u.id, email: u.email || "", name: (u.user_metadata && u.user_metadata.display_name) || (u.email || "").split("@")[0] };
    },
    user() { return this._user; },

    _mapError(e) {
      const m = ((e && e.message) || "").toLowerCase();
      if (m.includes("already registered") || m.includes("already been registered")) return "email_taken";
      if (m.includes("invalid login")) return "bad_password";
      if (m.includes("email not confirmed")) return "email_unconfirmed";
      return (e && e.message) || "unknown_error";
    },

    async signUp({ name, email, password }) {
      const { data, error } = await this.sb.auth.signUp({
        email, password, options: { data: { display_name: name } },
      });
      if (error) return { error: this._mapError(error) };
      if (!data.session) return { error: "email_unconfirmed" };   // confirmations are ON in the project
      this._user = this._shape(data.user);
      await this.sb.from("profiles").upsert({ id: this._user.id, display_name: name });
      return { user: this._user };
    },
    async signIn({ email, password }) {
      const { data, error } = await this.sb.auth.signInWithPassword({ email, password });
      if (error) return { error: this._mapError(error) };
      this._user = this._shape(data.user);
      return { user: this._user };
    },
    async signOut() {
      await this.flush();
      await this.sb.auth.signOut();
      this._user = null; this._lastSrs = {};
      return {};
    },

    logSession(row) {
      if (!this._user) { LocalProvider._user = null; LocalProvider.logSession(row); return; }
      // fire-and-forget: a lost history row must never cost a finished lesson
      this.sb.from("sessions").insert({
        user_id: this._user.id, unit_id: row.unitId,
        correct: row.correct, total: row.total, xp: row.xp,
      }).then(r => { if (r && r.error) console.warn("[tilashar] session log failed:", r.error.message); });
    },
    async loadSessions() {
      if (!this._user) return [];
      const { data } = await this.sb.from("sessions").select("*")
        .eq("user_id", this._user.id).order("finished_at", { ascending: false }).limit(200);
      return data || [];
    },

    async loadProgress() {
      if (!this._user) { this._lastSrs = {}; return readJSON("tilashar.progress.guest", {}); }
      const [{ data: prof }, { data: rows }] = await Promise.all([
        this.sb.from("profiles").select("*").eq("id", this._user.id).maybeSingle(),
        this.sb.from("srs_state").select("word_id,strength,ease,interval_days,seen_count,due_at").eq("user_id", this._user.id),
      ]);
      const srs = {};
      (rows || []).forEach(r => {
        srs[r.word_id] = {
          str: r.strength, ease: Number(r.ease), intv: r.interval_days,
          seen: r.seen_count, due: r.due_at ? Date.parse(r.due_at) : 0,
        };
      });
      this._lastSrs = JSON.parse(JSON.stringify(srs));
      return {
        lang: (prof && prof.ui_lang) || undefined,
        theme: (prof && prof.theme) || undefined,
        muted: !!(prof && prof.muted),
        xp: (prof && prof.xp) || 0,
        dailyXp: (prof && prof.daily_xp) || 0,
        goalDay: (prof && prof.goal_day) || null,
        streak: (prof && prof.streak) || 0,
        lastDay: (prof && prof.last_day) || null,
        srs,
      };
    },

    saveProgress(state) {
      if (!this._user) { writeJSON("tilashar.progress.guest", state); return; }
      this._pending = state;
      clearTimeout(this._timer);
      this._timer = setTimeout(() => { this._inflight = this._push(); }, 900);
    },
    async flush() {
      clearTimeout(this._timer);
      if (this._pending) this._inflight = this._push();
      try { await this._inflight; } catch (e) {}
    },
    async _push() {
      const state = this._pending; this._pending = null;
      if (!state || !this._user) return;
      const id = this._user.id;
      const changed = [];
      const srs = pruneSrs(state.srs);
      for (const [wordId, c] of Object.entries(srs)) {
        const p = this._lastSrs[wordId];
        if (p && p.str === c.str && p.intv === c.intv && p.seen === c.seen && p.due === c.due && p.ease === c.ease) continue;
        changed.push({
          user_id: id, word_id: wordId,
          strength: c.str, ease: c.ease, interval_days: c.intv,
          seen_count: c.seen, due_at: c.due ? new Date(c.due).toISOString() : null,
          updated_at: new Date().toISOString(),
        });
      }
      const jobs = [this.sb.from("profiles").upsert({
        id, display_name: this._user.name, ui_lang: state.lang, theme: state.theme, muted: !!state.muted,
        xp: state.xp, daily_xp: state.dailyXp, goal_day: state.goalDay,
        streak: state.streak, last_day: state.lastDay,
      })];
      if (changed.length) jobs.push(this.sb.from("srs_state").upsert(changed, { onConflict: "user_id,word_id" }));
      const results = await Promise.all(jobs);
      const failed = results.find(r => r && r.error);
      if (failed) { console.warn("[tilashar] progress save failed:", failed.error.message); return; }
      this._lastSrs = JSON.parse(JSON.stringify(srs));
    },
  };

  /* ═══════════════ the facade ═══════════════ */
  let P = LocalProvider;

  const configured = () => {
    const c = window.SUPABASE || {};
    return !!(c.url && c.anonKey && /^https:\/\/.+\.supabase\.co/.test(c.url));
  };

  return {
    get provider() { return P.name; },

    async init() {
      if (configured() && window.supabase && window.supabase.createClient) {
        try { await SupabaseProvider.init(); P = SupabaseProvider; }
        catch (e) { console.warn("[tilashar] Supabase unavailable, staying on-device:", e.message); P = LocalProvider; await P.init(); }
      } else {
        if (configured()) console.warn("[tilashar] supabase-js did not load; staying on-device.");
        await LocalProvider.init();
      }
    },
    user: () => P.user(),
    signUp: a => P.signUp(a),
    signIn: a => P.signIn(a),
    signOut: () => P.signOut(),
    loadProgress: () => P.loadProgress(),
    saveProgress: s => P.saveProgress(s),
    logSession: row => P.logSession(row),
    loadSessions: () => P.loadSessions(),
    flush: () => P.flush(),

    /* A guest's work must survive signing up — otherwise the account costs
       them the words they already did, and nobody signs up twice. */
    async adoptGuestProgress() {
      const guest = readJSON("tilashar.progress.guest", null);
      if (!guest || !guest.srs || !Object.keys(guest.srs).length) return false;
      const own = await P.loadProgress();
      if (own && own.srs && Object.keys(own.srs).length) return false;
      P.saveProgress(guest);
      await P.flush();
      return true;
    },
  };
})();
