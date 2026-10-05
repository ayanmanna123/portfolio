const CACHE_NAME = "ayan-portfolio-cache-v1";

const CORE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/logo.svg",
  "/profile-logo.jpeg"
];

// Install: Cache core assets and activate immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn("[SW] Core asset caching partial error:", err);
      });
    })
  );
});

// Activate: Claim clients and purge old cache versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
    ])
  );
});

// Fetch Interceptor
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension / unsupported schemes
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // Never intercept Vite internal dev server requests or source code
  if (
    url.pathname.startsWith("/src/") ||
    url.pathname.startsWith("/@") ||
    url.pathname.includes("node_modules") ||
    url.search.includes("t=") ||
    url.search.includes("import")
  ) {
    return;
  }

  // 1. Navigation requests (HTML documents) -> Network-first with cache fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match("/index.html").then((fallback) => fallback || caches.match("/"));
        })
    );
    return;
  }

  // 2. Static Assets (Images, Fonts, Scripts, Styles) -> Cache-first with background revalidate
  const isStaticAsset =
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|gif|ico|woff|woff2|ttf|otf)$/i) ||
    url.hostname.includes("fonts.googleapis.com") ||
    url.hostname.includes("fonts.gstatic.com");

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Revalidate in background
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.ok) {
                const clone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }
});
