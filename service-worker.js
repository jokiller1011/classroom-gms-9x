self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("crg9x-cache").then(cache =>
      cache.addAll([
        "/",
        "/index.html",
        "/offline.html"
      ])
    )
  );
});
