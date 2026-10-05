/**
 * Intelligent API Cache & SWR (Stale-While-Revalidate) utility.
 * Caches API responses in localStorage and memory with TTL.
 * Deduplicates in-flight requests.
 */

const memoryCache = new Map();
const inFlightRequests = new Map();

const DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes

/**
 * Read cached payload from localStorage
 */
export const getCachedData = (key) => {
  if (typeof window === "undefined") return null;

  // 1. Check in-memory cache first
  if (memoryCache.has(key)) {
    const memItem = memoryCache.get(key);
    if (Date.now() - memItem.timestamp < memItem.ttl) {
      return memItem.data;
    }
  }

  // 2. Check localStorage
  try {
    const itemStr = localStorage.getItem(`cache_${key}`);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    if (Date.now() - item.timestamp < (item.ttl || DEFAULT_TTL)) {
      memoryCache.set(key, item);
      return item.data;
    }
  } catch (e) {
    console.warn(`[apiCache] Error reading cache for ${key}:`, e);
  }
  return null;
};

/**
 * Save data to cache (memory & localStorage)
 */
export const setCachedData = (key, data, ttl = DEFAULT_TTL) => {
  if (typeof window === "undefined" || !data) return;

  const payload = {
    data,
    timestamp: Date.now(),
    ttl
  };

  memoryCache.set(key, payload);

  try {
    localStorage.setItem(`cache_${key}`, JSON.stringify(payload));
  } catch (e) {
    // If localStorage quota exceeded, clear old caches
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith("cache_")) {
          localStorage.removeItem(k);
        }
      }
      localStorage.setItem(`cache_${key}`, JSON.stringify(payload));
    } catch {
      // Ignore fallback errors
    }
  }
};

/**
 * Fetch with automatic caching, request deduplication, and SWR
 */
export const fetchWithCache = async (url, options = {}, { key = url, ttl = DEFAULT_TTL, forceRefresh = false } = {}) => {
  // If not forcing refresh, check if we have fresh cached data
  if (!forceRefresh) {
    const cached = getCachedData(key);
    if (cached !== null) {
      // Revalidate in background if older than half TTL
      try {
        const itemStr = localStorage.getItem(`cache_${key}`);
        if (itemStr) {
          const item = JSON.parse(itemStr);
          if (Date.now() - item.timestamp > ttl / 2) {
            triggerBackgroundRevalidate(url, options, key, ttl);
          }
        }
      } catch {
        // Ignore
      }
      return cached;
    }
  }

  // Deduplicate in-flight promises
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key);
  }

  const fetchPromise = (async () => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        console.warn(`[apiCache] HTTP ${res.status} for ${key}`);
        const stale = getCachedData(key);
        if (stale !== null) return stale;
        return null;
      }
      const data = await res.json();
      setCachedData(key, data, ttl);
      return data;
    } catch (error) {
      // If network fails, return expired cached data if available as fallback
      const stale = getCachedData(key);
      if (stale !== null) return stale;
      console.warn(`[apiCache] Request failed for ${key}:`, error.message);
      return null;
    } finally {
      inFlightRequests.delete(key);
    }
  })();

  inFlightRequests.set(key, fetchPromise);
  return fetchPromise;
};

const triggerBackgroundRevalidate = async (url, options, key, ttl) => {
  if (inFlightRequests.has(key)) return;
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      const data = await res.json();
      setCachedData(key, data, ttl);
    }
  } catch {
    // Silent fail in background
  }
};
