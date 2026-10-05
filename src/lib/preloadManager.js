import { projects, certificates, testimonials, iconImages, githubUsername, leetcodeUsername } from "@/data";
import { journeyImages } from "@/data/journeyImages";
import { fetchWithCache } from "./apiCache";

/**
 * Preload an image and trigger decode() for instant GPU rendering
 */
const preloadImage = (src) => {
  if (!src) return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if ("decode" in img) {
        img.decode().then(resolve).catch(resolve);
      } else {
        resolve();
      }
    };
    img.onerror = () => resolve(); // Always resolve so one missing asset doesn't stall boot
    img.src = src;
  });
};

/**
 * Run a pool of async tasks with concurrency limit
 */
const runConcurrent = async (items, fn, limit = 4, onItemDone) => {
  const results = [];
  const executing = [];
  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item)).then((res) => {
      if (onItemDone) onItemDone();
      return res;
    });
    results.push(p);

    if (limit <= items.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.allSettled(results);
};

/**
 * Preload all lazy-loaded React component bundles
 */
export const preloadComponentBundles = () => {
  return Promise.allSettled([
    import("@/components/SkillsSection"),
    import("@/components/TimelineSection"),
    import("@/components/EducationToProjectsMorph"),
    import("@/components/CertificatesSection"),
    import("@/components/GithubStatsSection"),
    import("@/components/GithubStarredSection"),
    import("@/components/LeetCodeStatsSection"),
    import("@/components/Testimonial"),
    import("@/components/ContactSection"),
    import("@/components/Footer")
  ]);
};

/**
 * Prefetch and cache all external APIs
 */
export const prefetchExternalApis = async (onApiDone) => {
  const ghUser = githubUsername || "ayanmanna123";
  const ltUser = leetcodeUsername || "ayanmanna123";

  const apiTasks = [
    // GitHub Contributions
    fetchWithCache(
      `https://github-contributions-api.jogruber.de/v4/${ghUser}?y=last`,
      {},
      { key: `gh_contributions_${ghUser}`, ttl: 60 * 60 * 1000 }
    ).then(() => onApiDone?.()),

    // GitHub User info
    fetchWithCache(
      `https://api.github.com/users/${ghUser}`,
      {},
      { key: `gh_user_${ghUser}`, ttl: 60 * 60 * 1000 }
    ).then(() => onApiDone?.()),

    // GitHub Starred Repos
    fetchWithCache(
      `https://api.github.com/users/${ghUser}/starred?per_page=100&sort=created&direction=desc`,
      {},
      { key: `gh_starred_${ghUser}`, ttl: 60 * 60 * 1000 }
    ).then(() => onApiDone?.()),

    // LeetCode Stats
    fetchWithCache(
      `https://leetcode-api-faisalshohag.vercel.app/${ltUser}`,
      {},
      { key: `leetcode_stats_${ltUser}`, ttl: 60 * 60 * 1000 }
    ).then((data) => {
      if (data && typeof window !== "undefined") {
        try {
          let acceptanceRate = "98.75";
          if (data.matchedUserStats?.acSubmissionNum?.[0]?.count && data.matchedUserStats?.totalSubmissionNum?.[0]?.count) {
            acceptanceRate = (data.matchedUserStats.acSubmissionNum[0].count / data.matchedUserStats.totalSubmissionNum[0].count * 100).toFixed(2);
          }
          const statsPayload = {
            totalSolved: data.totalSolved,
            totalQuestions: data.totalQuestions,
            easySolved: data.easySolved,
            totalEasy: data.totalEasy,
            mediumSolved: data.mediumSolved,
            totalMedium: data.totalMedium,
            hardSolved: data.hardSolved,
            totalHard: data.totalHard,
            ranking: data.ranking,
            acceptanceRate: acceptanceRate
          };
          localStorage.setItem("leetcode_data", JSON.stringify({
            data: { stats: statsPayload, submissionCalendar: data.submissionCalendar || {} },
            timestamp: Date.now()
          }));
        } catch (e) {
          // Ignore cache write error
        }
      }
      onApiDone?.();
    }),

    // LeetCode Badges (graceful fallback)
    fetchWithCache(
      `https://alfa-leetcode-api.onrender.com/${ltUser}/badges`,
      {},
      { key: `leetcode_badges_${ltUser}`, ttl: 60 * 60 * 1000 }
    ).catch(() => null).finally(() => onApiDone?.())
  ];

  return Promise.allSettled(apiTasks);
};

/**
 * Gather list of all images across the portfolio
 */
export const getAllAssetImages = () => {
  const imageSet = new Set();

  // Branding & Core
  imageSet.add("/profile-logo.jpeg");
  imageSet.add("/logo.svg");
  imageSet.add("/icon-192.png");
  imageSet.add("/favicon-48x48.png");

  // Project Covers & Screenshots
  (projects || []).forEach((p) => {
    if (p.image) imageSet.add(p.image);
    if (p.details?.screenshots?.desktop) {
      p.details.screenshots.desktop.forEach((img) => imageSet.add(img));
    }
    if (p.details?.screenshots?.mobile) {
      p.details.screenshots.mobile.forEach((img) => imageSet.add(img));
    }
  });

  // Certificates
  (certificates || []).forEach((c) => {
    if (c.image) imageSet.add(c.image);
  });

  // Testimonials
  (testimonials || []).forEach((t) => {
    if (t.image) imageSet.add(t.image);
  });

  // Journey
  (journeyImages || []).forEach((img) => {
    if (img) imageSet.add(img);
  });

  // Skill Icons
  if (iconImages) {
    Object.values(iconImages).forEach((icon) => {
      if (typeof icon === "string") imageSet.add(icon);
    });
  }

  return Array.from(imageSet).filter(Boolean);
};

/**
 * Main Orchestrator: Preloads all JS, CSS chunks, images, and APIs.
 * Tracks progress smoothly from 15% to 100%.
 */
let preloadingPromise = null;

export const startPreloadPipeline = (onProgress) => {
  if (preloadingPromise) {
    return preloadingPromise;
  }

  preloadingPromise = new Promise(async (resolve) => {
    const images = getAllAssetImages();
    const totalImages = images.length || 1;
    const totalApis = 5;
    const totalComponents = 10;

    let loadedImages = 0;
    let loadedApis = 0;
    let loadedBundles = 0;

    const updateCalculatedProgress = (statusMsg) => {
      // Weighting:
      // Bundles: 30%
      // APIs: 25%
      // Images: 45%
      const bundlePct = (loadedBundles / totalComponents) * 30;
      const apiPct = (loadedApis / totalApis) * 25;
      const imagePct = (loadedImages / totalImages) * 45;

      const totalPct = Math.min(100, Math.round(15 + (bundlePct + apiPct + imagePct) * 0.85));
      if (onProgress) {
        onProgress(totalPct, statusMsg);
      }
    };

    // Safety timeout: Never hang boot screen longer than 4.2 seconds even on slow networks
    const fallbackTimer = setTimeout(() => {
      if (onProgress) onProgress(100, "Portfolio Ready!");
      resolve();
    }, 4200);

    try {
      // 1. Preload Component Bundles in parallel
      updateCalculatedProgress("Initializing Architecture & Bundles...");
      const bundlePromise = preloadComponentBundles().then(() => {
        loadedBundles = totalComponents;
        updateCalculatedProgress("Code Modules Loaded");
      });

      // 2. Prefetch APIs in parallel
      const apiPromise = prefetchExternalApis(() => {
        loadedApis++;
        updateCalculatedProgress("Syncing API Streams...");
      });

      // 3. Preload all static images with 4-concurrency pool
      const imagePromise = runConcurrent(
        images,
        preloadImage,
        4,
        () => {
          loadedImages++;
          updateCalculatedProgress(`Caching Assets (${loadedImages}/${totalImages})...`);
        }
      );

      await Promise.allSettled([bundlePromise, apiPromise, imagePromise]);
      clearTimeout(fallbackTimer);
      if (onProgress) onProgress(100, "All Systems Initialized");
      resolve();
    } catch {
      clearTimeout(fallbackTimer);
      if (onProgress) onProgress(100, "Ready");
      resolve();
    }
  });

  return preloadingPromise;
};
