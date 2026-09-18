/* =====================================================================
   Tілашар — app engine.
   Mechanics kept from v2 (all verified): Duolingo path/hearts/XP/levels/
   goal ring, Anki SM-2 spaced repetition, Drops picture cards, Quizlet
   match-pairs, Memrise listening, Clozemaster sentence build.
   New in v3: accounts, per-user progress, profile, theme control.
   ===================================================================== */

/* ---------------- helpers ---------------- */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length-1; i > 0; i--) { const j = (Math.random()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]]; } return a; };
const pick = a => a[(Math.random()*a.length)|0];
const norm = s => (s||"").toLowerCase().trim().replace(/[.,!?;:"'`]/g,"").replace(/ё/g,"е").replace(/\s+/g," ");
const sampleWords = (n, ex) => shuffle(ALL.filter(w => w !== ex)).slice(0, n);
const today = () => new Date().toISOString().slice(0,10);
const now = () => Date.now();

/* Russian plural: 1 день / 2 дня / 5 дней */
function plural(n, one, few, many){
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

/* ---------------- i18n ---------------- */
const T = {
 en:{
  hi:"Ready for today's lesson?", goal:"Daily goal", goalSub:(a,b)=>a+" / "+b+" XP today", goalDone:"Goal reached! 🎉",
  level:"LEVEL", lvup:"Level", keepgo:"Keep it up!", start:"START", locked:"Finish the unit above first",
  practice:"Practice", due:n=>n+" word"+(n===1?"":"s")+" to review", noDue:"Nothing due — great job!", reviewDone:"Review complete!",
  new:"New word", tapKnow:"Tap the meaning", tapWord:"Tap the Kazakh word", listen:"Listen and choose",
  type:"Type the translation", picture:"Which word is this?", match:"Tap the matching pairs", build:"Build the sentence",
  check:"Check", cont:"Continue", gotit:"Got it", typeph:"type in English",
  nice:["Nice!","Great!","Correct!","Perfect!","Дұрыс!"], oops:"Answer:",
  done:"Lesson complete!", unitDone:"Unit complete!", xp:"XP", acc:"Accuracy", combo:"Best combo",
  noHearts:"Out of hearts", noHeartsSub:"Review this unit to try again", retry:"Try again",
  streakUp:n=>n+" day streak! 🔥",
  /* auth */
  signIn:"Sign in", signUp:"Create account", signInSub:"Keep your progress and pick up anywhere",
  signUpSub:"Free, and your streak is saved", name:"Name", email:"Email", password:"Password",
  noAcc:"No account yet?", hasAcc:"Already have an account?", create:"Create one", logIn:"Sign in",
  guest:"Continue as a guest", authNote:"Your account is stored on this device for now. Cross-device sync arrives with the server.",
  errName:"Enter your name", errEmail:"Enter a valid email", errPass:"At least 6 characters",
  errTaken:"That email is already registered", errNoUser:"No account with that email", errBadPass:"Wrong password",
  errConfirm:"Check your inbox and confirm the email, then sign in.",
  welcomeBack:n=>"Welcome back, "+n+"!", welcomeNew:n=>"Сәлем, "+n+"! Let's start.",
  adopted:"Your guest progress moved to this account",
  /* profile */
  profile:"Profile", guestName:"Guest", totalXp:"Total XP", dayStreak:"Day streak",
  wordsLearned:"Words learned", unitsDone:"Units done",
  theme:"Theme", themeSub:"Light or dark", auto:"Auto", light:"Light", dark:"Dark",
  sound:"Sound", soundSub:"Effects and word audio", on:"On", off:"Off",
  uiLang:"Interface language", uiLangSub:"Russian or English",
  signOut:"Sign out", signInCta:"Sign in or create an account", signedOut:"Signed out",
  quit:"Quit the lesson", back:"Back", soundTip:"Sound", profileTip:"Profile"},
 ru:{
  hi:"Готов к сегодняшнему уроку?", goal:"Цель дня", goalSub:(a,b)=>a+" / "+b+" XP сегодня", goalDone:"Цель достигнута! 🎉",
  level:"УРОВЕНЬ", lvup:"Уровень", keepgo:"Так держать!", start:"НАЧАТЬ", locked:"Сначала закончи тему выше",
  practice:"Повторение", due:n=>n+" "+plural(n,"слово","слова","слов")+" на повтор", noDue:"Нечего повторять — молодец!", reviewDone:"Повторение завершено!",
  new:"Новое слово", tapKnow:"Выбери перевод", tapWord:"Выбери казахское слово", listen:"Послушай и выбери",
  type:"Напиши перевод", picture:"Какое это слово?", match:"Соедини пары", build:"Составь предложение",
  check:"Проверить", cont:"Продолжить", gotit:"Понятно", typeph:"напиши по-русски",
  nice:["Отлично!","Супер!","Верно!","Идеально!","Дұрыс!"], oops:"Ответ:",
  done:"Урок пройден!", unitDone:"Тема пройдена!", xp:"XP", acc:"Точность", combo:"Комбо",
  noHearts:"Жизни закончились", noHeartsSub:"Повтори тему, чтобы попробовать снова", retry:"Ещё раз",
  streakUp:n=>n+" "+plural(n,"день","дня","дней")+" подряд! 🔥",
  /* auth */
  signIn:"Вход", signUp:"Регистрация", signInSub:"Сохраняй прогресс и продолжай с любого места",
  signUpSub:"Бесплатно, и серия дней не потеряется", name:"Имя", email:"Почта", password:"Пароль",
  noAcc:"Нет аккаунта?", hasAcc:"Уже есть аккаунт?", create:"Создать", logIn:"Войти",
  guest:"Продолжить как гость", authNote:"Аккаунт пока хранится на этом устройстве. Синхронизация между устройствами появится вместе с сервером.",
  errName:"Введите имя", errEmail:"Введите корректную почту", errPass:"Минимум 6 символов",
  errTaken:"Эта почта уже зарегистрирована", errNoUser:"Аккаунт с такой почтой не найден", errBadPass:"Неверный пароль",
  errConfirm:"Проверьте почту и подтвердите адрес, затем войдите.",
  welcomeBack:n=>"С возвращением, "+n+"!", welcomeNew:n=>"Сәлем, "+n+"! Начнём.",
  adopted:"Прогресс гостя перенесён в аккаунт",
  /* profile */
  profile:"Профиль", guestName:"Гость", totalXp:"Всего XP", dayStreak:"Дней подряд",
  wordsLearned:"Слов выучено", unitsDone:"Тем пройдено",
  theme:"Тема", themeSub:"Светлая или тёмная", auto:"Авто", light:"Светлая", dark:"Тёмная",
  sound:"Звук", soundSub:"Эффекты и озвучка слов", on:"Вкл", off:"Выкл",
  uiLang:"Язык интерфейса", uiLangSub:"Русский или английский",
  signOut:"Выйти", signInCta:"Войти или создать аккаунт", signedOut:"Вы вышли",
  quit:"Выйти из урока", back:"Назад", soundTip:"Звук", profileTip:"Профиль"}
};
const L = () => T[S.lang];

/* ---------------- state ---------------- */
const GOAL = 40, MAXHEARTS = 5, MASTER = 3;
const LV = [0,40,100,180,290,440,640,900,1220,1600,2050,2600,3200,3900,4700];
const levelFor = xp => { let l = 1; for (let i = 0; i < LV.length; i++) if (xp >= LV[i]) l = i+1; return l; };

const PREFS = "tilashar.prefs";
const defaultLang = () => /^(ru|kk|ky|uz|be|uk)/i.test(navigator.language || "") ? "ru" : "en";
let prefs = (() => { try { return JSON.parse(localStorage.getItem(PREFS)) || {}; } catch (e) { return {}; } })();
let user = null;                       // set by Auth.init() in boot()
let guestMode = localStorage.getItem("tilashar.guest") === "1";
let S = blankState();
let newStreak = false, LS = null;

function blankState(){
  return { lang: prefs.lang || defaultLang(), theme: prefs.theme || "auto", muted: !!prefs.muted,
           xp:0, streak:0, lastDay:null, goalDay:null, dailyXp:0, srs:{} };
}
async function loadState(){
  const saved = (await Auth.loadProgress()) || {};
  S = Object.assign(blankState(), saved);
  S.lang = prefs.lang || saved.lang || defaultLang();
  S.theme = prefs.theme || "auto";
  S.muted = !!prefs.muted;
  if (!S.srs) S.srs = {};
}
function save(){
  Auth.saveProgress(S);
  try { localStorage.setItem(PREFS, JSON.stringify({ lang:S.lang, theme:S.theme, muted:S.muted })); } catch(e){}
}
const srs = id => S.srs[id] || (S.srs[id] = { str:0, ease:2.3, intv:0, due:0, seen:0 });

function schedule(id, good){
  const c = srs(id); c.seen++;
  if (good) {
    c.str = Math.min(c.str+1, 6);
    c.ease = Math.min(c.ease+0.06, 3.1);
    c.intv = c.intv === 0 ? 1 : c.intv === 1 ? 3 : Math.round(c.intv * c.ease);
  } else {
    c.str = Math.max(c.str-1, 0);
    c.ease = Math.max(c.ease-0.22, 1.35);
    c.intv = 0;
  }
  c.due = now() + (c.intv ? c.intv * 864e5 : 6e4);
}
const unitLearned = u => u.words.every(w => srs(w.id).str >= MASTER);
const unitProg = u => { let s = 0; u.words.forEach(w => s += Math.min(srs(w.id).str, MASTER)); return s/(u.words.length*MASTER); };
const unitOpen = i => i === 0 || unitLearned(UNITS[i-1]);
const dueWords = () => ALL.filter(w => { const c = srs(w.id); return c.seen > 0 && c.due <= now(); })
                          .sort((a,b) => srs(a.id).due - srs(b.id).due);
const learnedCount = () => ALL.filter(w => srs(w.id).str >= MASTER).length;
const unitsDone = () => UNITS.filter(unitLearned).length;
function rollDay(){ const t = today(); if (S.goalDay !== t) { S.goalDay = t; S.dailyXp = 0; } }
function addXp(n){
  S.xp += n; S.dailyXp += n;
  const t = today();
  if (S.lastDay !== t) {
    const y = new Date(now()-864e5).toISOString().slice(0,10);
    S.streak = (S.lastDay === y) ? S.streak+1 : 1;
    S.lastDay = t; newStreak = true;
  }
  save();
}

/* ---------------- audio ---------------- */
let AC = null;
const ac = () => { if (!AC) { try { AC = new (window.AudioContext||window.webkitAudioContext)(); } catch(e){} } return AC; };
function beep(seq){
  if (S.muted) return; const a = ac(); if (!a) return; let t = a.currentTime;
  seq.forEach(([f,d,type]) => {
    const o = a.createOscillator(), g = a.createGain();
    o.type = type || "sine"; o.frequency.value = f; o.connect(g); g.connect(a.destination);
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.16,t+0.01);
    g.gain.exponentialRampToValueAtTime(0.0001,t+d); o.start(t); o.stop(t+d); t += d*0.9;
  });
}
const sfxOk = () => beep([[660,.09],[880,.13]]);
const sfxNo = () => beep([[200,.16,"square"],[150,.18,"square"]]);
const sfxDone = () => beep([[523,.12],[659,.12],[784,.12],[1046,.22]]);
const sfxTap = () => beep([[440,.05]]);
const sfxLevel = () => beep([[523,.1],[659,.1],[784,.1],[1046,.14],[1318,.24]]);
/* ---------------- Kazakh audio ----------------
   Resolution order, best first:
     1. a pre-rendered clip in audio/  (real Kazakh, works offline, free to serve)
     2. a genuine kk-KZ system voice   (rare: macOS/iOS ship none)
     3. SILENCE — never let an English voice mispronounce Kazakh, which is
        what the old code did (it asked for kk-KZ, got voice=null, and the
        engine default read the Cyrillic).
   ------------------------------------------------------------------------ */
const AUDIO = { files: {}, have: new Set(), voice: null };
const audioURL = id => "audio/" + AUDIO.files[id];
const canSpeak = id => AUDIO.have.has(id) || !!AUDIO.voice;
let playing = null;

function findKkVoice(){
  try { return speechSynthesis.getVoices().find(v => /^kk([-_]|$)/i.test(v.lang)) || null; }
  catch(e){ return null; }
}
async function initAudio(){
  try {
    const r = await fetch("assets/audio-manifest.json", { cache: "no-cache" });
    if (r.ok) {
      const j = await r.json();
      AUDIO.files = j.files || {};
      Object.keys(AUDIO.files).forEach(id => AUDIO.have.add(id));
    }
  } catch(e) { /* no manifest yet — fall through to voice/silence */ }
  AUDIO.voice = findKkVoice();
  if (!AUDIO.voice && typeof speechSynthesis !== "undefined")
    speechSynthesis.addEventListener("voiceschanged", () => { AUDIO.voice = findKkVoice(); }, { once: true });
}
function speak(txt, id){
  if (S.muted) return;
  if (id && AUDIO.have.has(id)) {
    try {
      if (playing) { playing.pause(); playing.currentTime = 0; }
      playing = new Audio(audioURL(id));
      playing.play().catch(() => {});   // autoplay block before first tap — harmless
      return;
    } catch(e) {}
  }
  if (AUDIO.voice) {
    try {
      const u = new SpeechSynthesisUtterance(txt);
      u.voice = AUDIO.voice; u.lang = AUDIO.voice.lang; u.rate = .85;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    } catch(e) {}
  }
  /* no Kazakh available: stay silent on purpose */
}
/* speaker button, rendered only when there is real Kazakh audio to play */
const spkBtn = (id, cls) => canSpeak(id) ? `<button type="button" class="speak${cls ? " " + cls : ""}" id="spk">🔊</button>` : "";
function wireSpeak(txt, id){ const b = $("#spk"); if (b) b.onclick = () => speak(txt, id); return !!b; }
function toast(m){
  const t = $("#toast"); t.textContent = m; t.classList.add("is-open");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("is-open"), 1800);
}

/* ---------------- screens ---------------- */
const SCREENS = ["scAuth","scHome","scLesson","scSummary","scProfile"];
function show(id){
  SCREENS.forEach(s => $("#"+s).classList.toggle("hidden", s !== id));
  $("#topbar").classList.toggle("hidden", id !== "scHome" && id !== "scProfile");
  $("#banner").classList.remove("is-open");
  if (id !== "scSummary") { parts = []; cx.clearRect(0,0,cv.width,cv.height); }
  scrollTo(0,0);
}

/* ---------------- theme ---------------- */
function applyTheme(){
  const el = document.documentElement;
  if (S.theme === "auto") el.removeAttribute("data-theme"); else el.setAttribute("data-theme", S.theme);
  const label = { auto:L().auto, light:L().light, dark:L().dark }[S.theme];
  const b = $("#btnTheme"); if (b) b.textContent = label;
}

/* ---------------- top bar ---------------- */
function initials(n){ return (n||"?").trim().slice(0,1).toUpperCase() || "?"; }
function paintTop(){
  $("#tStreak").textContent = S.streak;
  $("#tXp").textContent = S.xp;
  $$("#langtog button, #langtog2 button").forEach(b => b.classList.toggle("on", b.dataset.l === S.lang));
  $("#btnSound").textContent = S.muted ? "🔇" : "🔊";
  $("#btnQuit").title = L().quit;
  $("#pBack").title = L().back;
  $("#btnSound").title = L().soundTip;
  const av = $("#btnProfile");
  av.title = L().profileTip;
  av.textContent = user ? initials(user.name || user.email) : "👤";
  av.classList.toggle("avatar--guest", !user);
}

/* ---------------- home ---------------- */
function ringSVG(p, color, size){
  const s = size || 56, r = s/2 - 4, c = 2*Math.PI*r, off = c*(1-p);
  return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <circle cx="${s/2}" cy="${s/2}" r="${r}" fill="none" stroke="var(--cloud)" stroke-width="7"/>
    <circle cx="${s/2}" cy="${s/2}" r="${r}" fill="none" stroke="${color}" stroke-width="7"
      stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg>`;
}
function renderHome(){
  rollDay(); save();
  $("#hiName").textContent = user ? "Сәлем, " + (user.name || "").split(" ")[0] + "! 👋" : "Сәлем! 👋";
  $("#hiSub").textContent = L().hi;
  $("#homeMascot").innerHTML = MASCOT_CSS + MASCOT_SVG();

  const gp = Math.min(S.dailyXp/GOAL, 1);
  $("#goalRing").innerHTML = ringSVG(gp, "var(--brand)") + `<div class="ring__n">${Math.round(gp*100)}%</div>`;
  $("#goalTitle").textContent = L().goal;
  $("#goalSub").textContent = gp >= 1 ? L().goalDone : L().goalSub(S.dailyXp, GOAL);
  $("#lvlCap").textContent = L().level;
  $("#lvlNum").textContent = levelFor(S.xp);

  const due = dueWords(), pc = $("#btnPractice");
  $("#prTitle").textContent = L().practice;
  $("#prCount").textContent = due.length;
  $("#prSub").textContent = due.length ? L().due(due.length) : L().noDue;
  pc.className = "rowcard " + (due.length ? "is-live" : "is-off");
  pc.onclick = () => { if (due.length) { ac(); startReview(due); } };

  const path = $("#path"); path.innerHTML = "";
  UNITS.forEach((u, ui) => {
    const band = document.createElement("div");
    band.className = "band";
    band.innerHTML = `<div class="band__line"></div><span class="band__name">${esc(u.name[S.lang])}</span><div class="band__line"></div>`;
    path.appendChild(band);

    const wrap = document.createElement("div"); wrap.className = "nodewrap";
    const nudge = [0,44,-44,30,-30,0][ui % 6];
    const done = unitLearned(u), open = unitOpen(ui);
    const node = document.createElement("button");
    node.type = "button";
    node.className = "node " + (done ? "is-done" : open ? "is-open" : "is-locked");
    node.style.marginLeft = nudge + "px";
    node.setAttribute("aria-label", u.name[S.lang]);
    node.innerHTML = `<div class="node__ring">${ringSVG(unitProg(u), done ? "var(--gold-dk)" : "var(--brand)", 100)}</div>
      <span>${done ? "⭐" : u.icon}</span>${!open ? '<span class="node__lock">🔒</span>' : ""}
      ${open && !done ? `<span class="node__start a-bob">${L().start}</span>` : ""}
      <span class="node__label">${u.words.length} ${S.lang==="ru"?"слов":"words"}</span>`;
    node.onclick = () => { ac(); open ? startLesson(ui) : toast(L().locked); };
    wrap.appendChild(node); path.appendChild(wrap);
  });
  paintTop(); show("scHome");
}

/* ---------------- lesson engine ---------------- */
/* "listen" is impossible with no Kazakh audio — drop it rather than ship a
   silent or mispronounced exercise. */
const kinds = (w, list) => canSpeak(w.id) ? list : list.filter(k => k !== "listen");
function buildLesson(u){
  const due = u.words.filter(w => { const c = srs(w.id); return c.str < MASTER || c.due <= now(); });
  const focus = (due.length ? due : u.words).slice(0, 7);
  const q = [];
  focus.forEach(w => {
    const c = srs(w.id);
    if (c.seen === 0) { q.push({ t:"intro", w }); q.push({ t:pick(kinds(w, ["mc","picture","listen"])), w }); }
    else q.push({ t:pick(kinds(w, ["mc","mcRev","type","listen","picture","mc"])), w });
  });
  const intros = q.filter(x => x.t === "intro"), tests = shuffle(q.filter(x => x.t !== "intro"));
  const out = [], placed = new Set();
  tests.forEach(item => {
    const intro = intros.find(x => x.w === item.w && !placed.has(x.w));
    if (intro) { out.push(intro); placed.add(intro.w); }
    out.push(item);
  });
  intros.forEach(x => { if (!placed.has(x.w)) { out.unshift(x); placed.add(x.w); } });
  if (focus.length >= 3) out.splice(Math.min(3, out.length), 0, { t:"pairs", set: shuffle(focus).slice(0, Math.min(5, focus.length)) });
  if (u.sents && u.sents.length) out.push({ t:"build", s: pick(u.sents) });
  return out;
}
function startLesson(ui){
  const u = UNITS[ui];
  LS = { u, ui, q:buildLesson(u), i:0, hearts:MAXHEARTS, right:0, ans:0, combo:0, bestCombo:0, xp:0, dead:false };
  show("scLesson"); renderHearts(); next();
}
function startReview(due){
  const focus = due.slice(0, 10);
  const out = shuffle(focus.map(w => ({ t:pick(kinds(w, ["mc","mcRev","type","listen","picture"])), w })));
  if (focus.length >= 3) out.splice(Math.min(3, out.length), 0, { t:"pairs", set: shuffle(focus).slice(0, Math.min(5, focus.length)) });
  LS = { u:UNITS[0], ui:0, q:out, i:0, hearts:MAXHEARTS, right:0, ans:0, combo:0, bestCombo:0, xp:0, dead:false, review:true };
  show("scLesson"); renderHearts(); next();
}
const renderHearts = () => { $("#hearts").innerHTML = Array.from({length:MAXHEARTS}, (_,i) => i < LS.hearts ? "❤️" : "🤍").join(""); };
const setProgress = () => { $("#pFill").style.width = (LS.i/LS.q.length*100) + "%"; };
function next(){
  if (LS.dead) return;
  if (LS.i >= LS.q.length) return finish();
  setProgress();
  const item = LS.q[LS.i];
  ({ mc:exMC, mcRev:exMCRev, type:exType, listen:exListen, picture:exPicture, pairs:exPairs, build:exBuild, intro:exIntro })[item.t](item);
}
function cta(label, enabled, fn){
  const b = $("#cta"); b.className = "btn btn--upper"; b.textContent = label; b.disabled = !enabled;
  b.style.visibility = "visible"; b.onclick = fn;
}
function advance(){ LS.i++; $("#banner").classList.remove("is-open"); next(); }
function grade(good, correctText, word){
  LS.ans++;
  if (good) {
    LS.right++; LS.combo++; LS.bestCombo = Math.max(LS.bestCombo, LS.combo);
    LS.xp += 10 + Math.min(LS.combo-1, 5)*2; sfxOk();
  } else {
    LS.combo = 0; LS.hearts--; renderHearts(); sfxNo();
    if (LS.hearts <= 0) return outOfHearts();
  }
  if (word) schedule(word.id, good);
  save(); showBanner(good, correctText, word);
}
function showBanner(good, correctText, word){
  const b = $("#banner");
  b.className = "banner is-open " + (good ? "is-ok" : "is-no");
  $("#bIco").textContent = good ? "✓" : "✕";
  $("#bTitle").textContent = good ? pick(L().nice) : L().oops;
  $("#bSub").textContent = good ? (word ? word.kk + " → " + correctText : correctText) : correctText;
  const cont = $("#bCont");
  cont.className = "btn btn--upper " + (good ? "btn--green" : "btn--red");
  cont.textContent = L().cont; cont.onclick = advance;
  if (good && word) speak(word.kk, word.id);
}
function outOfHearts(){
  LS.dead = true; save(); sfxNo();
  $("#stage").innerHTML = `<div style="text-align:center;padding:44px 10px">
    <div style="font-size:4.4rem">💔</div>
    <h2 style="font-size:1.4rem;margin:10px 0 4px">${L().noHearts}</h2>
    <p style="color:var(--slate);font-weight:800">${L().noHeartsSub}</p></div>`;
  $("#banner").classList.remove("is-open");
  cta(L().retry, true, renderHome);
}

/* answer list helper — badge + text (Bayan Sulu pattern) */
const BADGE = ["1","2","3","4","5","6"];
function answerList(items){
  return `<div class="answers" id="answers">${items.map((txt,i) =>
    `<button type="button" class="answer" data-i="${i}">
       <span class="answer__badge">${BADGE[i]||i+1}</span><span class="answer__text">${esc(txt)}</span>
     </button>`).join("")}</div>`;
}
function wireAnswers(onPick){
  $$("#answers .answer").forEach(el => el.onclick = () => {
    sfxTap();
    $$("#answers .answer").forEach(x => x.classList.remove("is-picked"));
    el.classList.add("is-picked");
    onPick(+el.dataset.i, el);
  });
}
function revealAnswers(correctIdx, pickedIdx){
  $$("#answers .answer").forEach((el,i) => {
    el.disabled = true; el.classList.remove("is-picked");
    if (i === correctIdx) el.classList.add("is-right");
    else if (i === pickedIdx) el.classList.add("is-wrong");
    else el.classList.add("is-dim");
  });
}

/* ---------------- exercises ---------------- */
function exIntro(item){
  const w = item.w;
  $("#stage").innerHTML = `<div class="prompt">${L().new}</div>
    <div class="bigemoji">${w.e}</div>
    <div class="wordcard"><div class="wordcard__w">${esc(w.kk)}</div>
      ${spkBtn(w.id)}</div>
    <div class="meaning">${esc(w[S.lang])}</div>`;
  wireSpeak(w.kk, w.id); speak(w.kk, w.id);
  cta(L().gotit, true, () => { LS.i++; next(); });
}
function exMC(item){
  const w = item.w, tgt = w[S.lang];
  const opts = shuffle([tgt, ...sampleWords(3,w).map(x => x[S.lang])]);
  const ci = opts.indexOf(tgt);
  $("#stage").innerHTML = `<div class="prompt">${L().tapKnow}</div>
    <div class="wordcard"><div class="wordcard__e">${w.e}</div><div class="wordcard__w">${esc(w.kk)}</div>
      ${spkBtn(w.id)}</div>${answerList(opts)}`;
  wireSpeak(w.kk, w.id);
  let sel = -1;
  wireAnswers(i => { sel = i; cta(L().check, true, submit); });
  cta(L().check, false, null);
  function submit(){ revealAnswers(ci, sel); grade(sel === ci, tgt, w); }
}
function exMCRev(item){
  const w = item.w;
  const opts = shuffle([w, ...sampleWords(3,w)]);
  const ci = opts.indexOf(w);
  $("#stage").innerHTML = `<div class="prompt">${L().tapWord}</div>
    <div class="wordcard"><div class="wordcard__e">${w.e}</div><div class="wordcard__w wordcard__w--sm">${esc(w[S.lang])}</div></div>
    ${answerList(opts.map(o => o.kk))}`;
  let sel = -1;
  wireAnswers(i => { sel = i; cta(L().check, true, submit); });
  cta(L().check, false, null);
  function submit(){ revealAnswers(ci, sel); grade(sel === ci, w.kk, w); }
}
function exListen(item){
  const w = item.w, tgt = w[S.lang];
  const opts = shuffle([tgt, ...sampleWords(3,w).map(x => x[S.lang])]);
  const ci = opts.indexOf(tgt);
  $("#stage").innerHTML = `<div class="prompt">${L().listen}</div>
    <div style="text-align:center">${spkBtn(w.id, "speak--big")}</div>
    ${answerList(opts)}`;
  wireSpeak(w.kk, w.id); speak(w.kk, w.id);
  let sel = -1;
  wireAnswers(i => { sel = i; cta(L().check, true, submit); });
  cta(L().check, false, null);
  function submit(){ revealAnswers(ci, sel); grade(sel === ci, tgt, w); }
}
function exPicture(item){
  const w = item.w;
  const opts = shuffle([w, ...sampleWords(3,w)]);
  const ci = opts.indexOf(w);
  $("#stage").innerHTML = `<div class="prompt">${L().picture}</div>
    <div class="bigemoji">${w.e}</div>${answerList(opts.map(o => o.kk))}`;
  let sel = -1;
  wireAnswers(i => { sel = i; cta(L().check, true, submit); });
  cta(L().check, false, null);
  function submit(){ revealAnswers(ci, sel); grade(sel === ci, w[S.lang], w); }
}
function exType(item){
  const w = item.w, tgt = w[S.lang];
  $("#stage").innerHTML = `<div class="prompt">${L().type}</div>
    <div class="wordcard"><div class="wordcard__e">${w.e}</div><div class="wordcard__w">${esc(w.kk)}</div>
      ${spkBtn(w.id)}</div>
    <input class="field__input" id="tin" style="margin-top:16px;font-size:1.15rem;font-weight:800"
      autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${L().typeph}">`;
  wireSpeak(w.kk, w.id);
  const inp = $("#tin");
  inp.oninput = () => cta(L().check, !!inp.value.trim(), submit);
  inp.onkeydown = e => { if (e.key === "Enter" && inp.value.trim()) { e.preventDefault(); submit(); } };
  setTimeout(() => inp.focus(), 60);
  cta(L().check, false, null);
  function submit(){ inp.blur(); grade(norm(inp.value) === norm(tgt), tgt, w); }
}
function exPairs(item){
  const set = item.set;
  const cells = shuffle([...set.map(w => ({ id:w.id, txt:w.kk })), ...set.map(w => ({ id:w.id, txt:w[S.lang] }))]);
  $("#stage").innerHTML = `<div class="prompt">${L().match}</div>
    <div class="pairs" id="pairs">${cells.map((c,i) =>
      `<button type="button" class="tile" data-i="${i}" data-id="${c.id}">${esc(c.txt)}</button>`).join("")}</div>`;
  cta(L().check, false, null); $("#cta").style.visibility = "hidden";
  let sel = null, remaining = set.length, missed = false;
  $$("#pairs .tile").forEach(t => t.onclick = () => {
    if (t.classList.contains("is-gone")) return;
    sfxTap();
    if (!sel) { sel = t; t.classList.add("is-picked"); return; }
    if (sel === t) { t.classList.remove("is-picked"); sel = null; return; }
    if (sel.dataset.id === t.dataset.id) {
      sel.classList.add("is-gone"); t.classList.add("is-gone"); sel = null; remaining--; sfxOk();
      if (remaining === 0) {
        $("#cta").style.visibility = "visible";
        set.forEach(w => schedule(w.id, !missed));
        LS.right++; LS.ans++; LS.combo++; LS.bestCombo = Math.max(LS.bestCombo, LS.combo); LS.xp += 12;
        save(); showBanner(true, L().match, null);
      }
    } else {
      missed = true;
      const a = sel; a.classList.add("a-shake"); t.classList.add("a-shake");
      setTimeout(() => { a.classList.remove("a-shake","is-picked"); t.classList.remove("a-shake"); }, 420);
      sel = null; sfxNo();
    }
  });
}
function exBuild(item){
  const s = item.s, target = s[S.lang];
  const pool = (S.lang === "en" ? ["the","a","and","is","my","you","we","he"] : ["и","это","мой","ты","мы","он","в","не"])
    .filter(x => !target.includes(x));
  const bank = shuffle([...target.map(t => ({ t })), ...shuffle(pool).slice(0,2).map(t => ({ t }))]);
  $("#stage").innerHTML = `<div class="prompt">${L().build}</div>
    <div class="wordcard"><div class="wordcard__w wordcard__w--sm">${esc(s.kk)}</div>
      ${spkBtn(s.id)}</div>
    <div class="answerline" id="ans"></div>
    <div class="bank" id="bank">${bank.map((b,i) =>
      `<button type="button" class="wtile" data-i="${i}">${esc(b.t)}</button>`).join("")}</div>`;
  wireSpeak(s.kk, s.id); speak(s.kk, s.id);
  const chosen = [], ansEl = $("#ans");
  function repaint(){
    ansEl.innerHTML = chosen.map((c,i) => `<button type="button" class="wtile" data-ai="${i}">${esc(c.t)}</button>`).join("");
    ansEl.querySelectorAll(".wtile").forEach(el => el.onclick = () => {
      const c = chosen.splice(+el.dataset.ai, 1)[0];
      document.querySelector(`#bank .wtile[data-i="${c.bi}"]`).classList.remove("is-used");
      repaint(); cta(L().check, chosen.length > 0, submit);
    });
  }
  $$("#bank .wtile").forEach(el => el.onclick = () => {
    if (el.classList.contains("is-used")) return;
    sfxTap(); el.classList.add("is-used");
    chosen.push({ t: el.textContent, bi: el.dataset.i });
    repaint(); cta(L().check, chosen.length > 0, submit);
  });
  cta(L().check, false, null);
  function submit(){ grade(chosen.map(c => c.t).join(" ") === target.join(" "), target.join(" "), null); }
}

/* ---------------- finish ---------------- */
function finish(){
  $("#pFill").style.width = "100%";
  const before = levelFor(S.xp);
  addXp(LS.xp);
  const after = levelFor(S.xp);
  const acc = LS.ans ? Math.round(LS.right/LS.ans*100) : 100;
  const done = !LS.review && unitLearned(LS.u);
  $("#sTrophy").textContent = done ? "🏆" : LS.review ? "🧠" : "🎉";
  $("#sTitle").textContent = LS.review ? L().reviewDone : done ? L().unitDone : L().done;
  $("#sSub").textContent = newStreak ? L().streakUp(S.streak) : L().keepgo;
  $("#cXp").textContent = L().xp; $("#cAcc").textContent = L().acc; $("#cCombo").textContent = L().combo;
  $("#sXp").textContent = "+" + LS.xp; $("#sAcc").textContent = acc + "%"; $("#sCombo").textContent = LS.bestCombo;
  $("#sCont").textContent = L().cont; $("#sCont").onclick = renderHome;
  paintTop(); show("scSummary"); sfxDone(); confetti();
  if (after > before) setTimeout(() => levelUp(after), 700);
  newStreak = false;
}
function levelUp(n){
  const el = $("#modalLevel");
  $("#luTitle").textContent = L().lvup + " " + n + "!";
  $("#luSub").textContent = L().keepgo;
  $("#luCont").textContent = L().cont;
  $("#luCont").onclick = () => el.classList.remove("is-open");
  el.classList.add("is-open"); sfxLevel(); confetti();
}

/* ---------------- confetti ---------------- */
const cv = $("#confetti"), cx = cv.getContext("2d");
let parts = [], raf = null;
function resize(){ cv.width = innerWidth; cv.height = innerHeight; }
resize(); addEventListener("resize", resize);
function confetti(){
  const cols = ["#00A6D6","#2BC77E","#FFC53D","#7C6BF2","#FF7A1A"];
  for (let i = 0; i < 130; i++) parts.push({
    x: innerWidth/2 + (Math.random()-.5)*120, y: innerHeight*0.4,
    vx:(Math.random()-.5)*11, vy:-Math.random()*13-4, g:.32,
    r: Math.random()*7+3, c: pick(cols), a:1, rot: Math.random()*6, vr:(Math.random()-.5)*.4 });
  if (!raf) tick();
}
function tick(){
  cx.clearRect(0,0,cv.width,cv.height);
  parts = parts.filter(p => p.a > 0);
  parts.forEach(p => {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    if (p.y > innerHeight*0.5) p.a -= .012;
    cx.save(); cx.globalAlpha = Math.max(p.a,0); cx.translate(p.x,p.y); cx.rotate(p.rot);
    cx.fillStyle = p.c; cx.fillRect(-p.r/2,-p.r/2,p.r,p.r*.6); cx.restore();
  });
  raf = parts.length ? requestAnimationFrame(tick) : (cx.clearRect(0,0,cv.width,cv.height), null);
}

/* ---------------- AUTH SCREEN ---------------- */
let authMode = "in"; // "in" | "up"
function paintAuth(){
  const up = authMode === "up";
  $("#authMascot").innerHTML = MASCOT_CSS + MASCOT_SVG();
  $("#authTitle").textContent = up ? L().signUp : L().signIn;
  $("#authSub").textContent = up ? L().signUpSub : L().signInSub;
  $("#fName").hidden = !up;
  $("#lblName").textContent = L().name;
  $("#lblEmail").textContent = L().email;
  $("#lblPass").textContent = L().password;
  $("#inPass").autocomplete = up ? "new-password" : "current-password";
  $("#authGo").textContent = up ? L().signUp : L().logIn;
  $("#altTxt").textContent = up ? L().hasAcc : L().noAcc;
  $("#altBtn").textContent = up ? L().logIn : L().create;
  $("#guestBtn").textContent = L().guest;
  $("#authNote").textContent = L().authNote;
  $("#authErr").classList.remove("is-open");
  ["fName","fEmail","fPass"].forEach(id => $("#"+id).classList.remove("is-bad"));
}
function fieldError(id, msg){
  $("#f"+id).classList.add("is-bad");
  $("#er"+id).textContent = msg;
}
$("#altBtn").onclick = () => { authMode = authMode === "in" ? "up" : "in"; paintAuth(); };
$("#guestBtn").onclick = async () => {
  guestMode = true; localStorage.setItem("tilashar.guest","1");
  user = null; await loadState(); applyTheme(); renderHome();
};
$("#authForm").onsubmit = async e => {
  e.preventDefault();
  ["Name","Email","Pass"].forEach(k => $("#f"+k).classList.remove("is-bad"));
  $("#authErr").classList.remove("is-open");
  const up = authMode === "up";
  const name = $("#inName").value.trim(), email = $("#inEmail").value.trim(), pass = $("#inPass").value;
  let bad = false;
  if (up && name.length < 2) { fieldError("Name", L().errName); bad = true; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { fieldError("Email", L().errEmail); bad = true; }
  if (pass.length < 6) { fieldError("Pass", L().errPass); bad = true; }
  if (bad) return;

  const res = up ? await Auth.signUp({ name, email, password: pass })
                 : await Auth.signIn({ email, password: pass });
  if (res.error) {
    const msg = { email_taken:L().errTaken, no_user:L().errNoUser, bad_password:L().errBadPass,
                  email_unconfirmed:L().errConfirm }[res.error] || res.error;
    const box = $("#authErr"); box.textContent = msg; box.classList.add("is-open");
    return;
  }
  user = res.user;
  const moved = up ? await Auth.adoptGuestProgress() : false;
  localStorage.removeItem("tilashar.guest"); guestMode = false;
  await loadState(); applyTheme(); save();
  $("#inPass").value = "";
  renderHome();
  const who = (user.name || user.email).split(" ")[0];
  toast(moved ? L().adopted : up ? L().welcomeNew(who) : L().welcomeBack(who));
};

/* ---------------- PROFILE ---------------- */
function renderProfile(){
  const named = user ? (user.name || user.email) : L().guestName;
  $("#pAv").textContent = user ? initials(named) : "👤";
  $("#pAv").classList.toggle("avatar--guest", !user);
  $("#pName").textContent = named;
  $("#pMail").textContent = user ? user.email : "";
  $("#mXp").textContent = S.xp;            $("#mXpCap").textContent = L().totalXp;
  $("#mStreak").textContent = S.streak;    $("#mStreakCap").textContent = L().dayStreak;
  $("#mWords").textContent = learnedCount(); $("#mWordsCap").textContent = L().wordsLearned;
  $("#mUnits").textContent = unitsDone();  $("#mUnitsCap").textContent = L().unitsDone;
  $("#setThemeT").textContent = L().theme; $("#setThemeS").textContent = L().themeSub;
  $("#setSoundT").textContent = L().sound; $("#setSoundS").textContent = L().soundSub;
  $("#setLangT").textContent = L().uiLang; $("#setLangS").textContent = L().uiLangSub;
  $("#btnSound2").textContent = S.muted ? L().off : L().on;
  $("#btnAuthAction").textContent = user ? L().signOut : L().signInCta;
  applyTheme(); paintTop(); show("scProfile");
}
$("#btnProfile").onclick = renderProfile;
$("#pBack").onclick = renderHome;
$("#btnTheme").onclick = () => {
  S.theme = { auto:"light", light:"dark", dark:"auto" }[S.theme];
  save(); applyTheme();
};
$("#btnSound2").onclick = () => {
  S.muted = !S.muted; save(); paintTop();
  $("#btnSound2").textContent = S.muted ? L().off : L().on;
  if (!S.muted) { ac(); sfxTap(); }
};
$("#btnAuthAction").onclick = async () => {
  if (user) {
    await Auth.signOut(); user = null;
    guestMode = false; localStorage.removeItem("tilashar.guest");
    await loadState(); applyTheme(); paintAuth(); show("scAuth"); toast(L().signedOut);
  } else { paintAuth(); show("scAuth"); }
};

/* ---------------- global controls ---------------- */
$$("#langtog button, #langtog2 button").forEach(b => b.onclick = () => {
  S.lang = b.dataset.l; save(); paintTop(); paintAuth();
  if (!$("#scProfile").classList.contains("hidden")) renderProfile(); else renderHome();
});
$("#btnSound").onclick = () => {
  S.muted = !S.muted; save(); paintTop();
  if (!S.muted) { ac(); sfxTap(); }
};
$("#btnQuit").onclick = renderHome;

/* ---------------- boot ---------------- */
(async function boot(){
  await Auth.init();
  user = Auth.user();
  if (user) { guestMode = false; localStorage.removeItem("tilashar.guest"); }
  await loadState();
  applyTheme();
  paintTop();
  await initAudio();
  if (user || guestMode) renderHome();
  else { paintAuth(); show("scAuth"); }
})();

/* A debounced save must not be lost when the tab is closed mid-lesson. */
addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") Auth.flush(); });
addEventListener("pagehide", () => Auth.flush());
