/**
 * Register Service Worker for PWA asset caching and offline support
 */
export function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  // In development mode (Vite dev server), unregister SW so it doesn't break HMR or source modules
  if (import.meta.env.DEV) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
    if ("caches" in window) {
      caches.keys().then((keys) => {
        for (const key of keys) {
          caches.delete(key);
        }
      });
    }
    return;
  }

  // In production mode, register Service Worker for instant offline/caching
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  console.log("[PWA] New content available; please refresh.");
                } else {
                  console.log("[PWA] Content cached for offline use.");
                }
              }
            };
          }
        };
      })
      .catch((error) => {
        console.warn("[PWA] Service Worker registration failed:", error);
      });
  });
}
