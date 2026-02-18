const CACHE = "crg9x-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/offline.html",
  "/css/classroom.css",
  "/js/storage.js",
  "/js/auth.js",
  "/js/dashboard.js",
  "/games/dino/index.html",
  "/games/dino/game.js",
  "/games/brick/index.html",
  "/games/brick/game.js",
  "/games/flappy/index.html",
  "/games/flappy/game.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request).then(res => res || caches.match("/offline.html"))
    )
  );
});
