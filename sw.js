/* =====================================================================
   Tілашар — service worker.

   Makes the app installable and usable with no connection: a student on
   the bus with no signal still gets their lesson and hears the words.

   Strategy per kind of file, chosen so an update can never get stuck:
     · HTML            network-first  -> a deploy is picked up immediately
     · assets/ + icons stale-while-revalidate -> instant, refreshed in the background
     · audio/          cache-first    -> clip bytes never change under a name
     · audio-manifest  network-first  -> new clips must be noticed
   Bump VERSION on any change here; old caches are deleted on activate.
   ===================================================================== */
const VERSION = "tilashar-v3.1";
const SHELL = `${VERSION}-shell`;
const MEDIA = `${VERSION}-media`;

const PRECACHE = [
  "./", "./index.html", "./app.html",
  "./assets/ui.css", "./assets/landing.css", "./assets/app.css",
  "./assets/mascot.js", "./assets/content.js", "./assets/auth.js",
  "./assets/app.js", "./assets/supabase-config.js",
  "./manifest.webmanifest", "./favicon.svg",
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    // One bad URL must not fail the whole install.
    await Promise.all(PRECACHE.map(u => c.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (e) {
    const hit = await cache.match(req);
    if (hit) return hit;
    if (req.mode === "navigate") {
      return (await cache.match("./app.html")) || (await cache.match("./index.html")) ||
             new Response("Офлайн", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }
    throw e;
  }
}
async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone());
  return res;
}
async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req);
  const net = fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
  return hit || (await net) || Response.error();
}

self.addEventListener("fetch", e => {
  const { request } = e;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;   // CDN, Supabase, fonts: leave alone

  if (request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname === "/") {
    e.respondWith(networkFirst(request, SHELL));
  } else if (url.pathname.includes("/audio-manifest.json")) {
    e.respondWith(networkFirst(request, SHELL));
  } else if (url.pathname.startsWith("/audio/")) {
    e.respondWith(cacheFirst(request, MEDIA));
  } else if (url.pathname.startsWith("/assets/") || url.pathname.endsWith(".svg") ||
             url.pathname.endsWith(".png") || url.pathname.endsWith(".webmanifest")) {
    e.respondWith(staleWhileRevalidate(request, SHELL));
  }
});

/* The app asks for this after a lesson, so the words a learner is actually
   working on are on the device before the signal drops. */
self.addEventListener("message", e => {
  const d = e.data || {};
  if (d.type === "cache-audio" && Array.isArray(d.urls)) {
    e.waitUntil(caches.open(MEDIA).then(c =>
      Promise.all(d.urls.map(u => c.match(u).then(hit => hit || c.add(u).catch(() => {}))))));
  }
});
