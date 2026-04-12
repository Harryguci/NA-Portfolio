import { useEffect, useState } from "react";

const CACHE_NAME = "na-portfolio-cdn-v1";

/** Original URL → blob: object URL (session lifetime, shared across components) */
const blobUrlByOriginal = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

/**
 * Returns a blob: URL backed by the Cache API when possible, so reloads avoid
 * re-downloading the same remote asset. Falls back to the original URL on failure.
 */
export async function resolveCachedBlobUrl(url: string): Promise<string> {
  if (!url || url.startsWith("blob:") || url.startsWith("data:")) {
    return url;
  }

  const cached = blobUrlByOriginal.get(url);
  if (cached) return cached;

  const pending = inflight.get(url);
  if (pending) return pending;

  const promise = (async () => {
    try {
      if ("caches" in globalThis) {
        const cache = await caches.open(CACHE_NAME);
        let response = await cache.match(url);

        if (!response) {
          response = await fetch(url, { mode: "cors", credentials: "omit" });
          if (response.ok) {
            try {
              await cache.put(url, response.clone());
            } catch {
              /* opaque or non-cacheable CORS — still use this response once */
            }
          }
        }

        if (response && response.ok) {
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          blobUrlByOriginal.set(url, objectUrl);
          return objectUrl;
        }
      }
    } catch {
      /* network, CORS, or Cache API unavailable */
    }

    return url;
  })();

  inflight.set(url, promise);
  try {
    return await promise;
  } finally {
    inflight.delete(url);
  }
}

/**
 * Resolves a remote URL to a cached blob URL. Returns null until the first
 * resolution completes (avoids a duplicate fetch from using the raw URL first).
 */
export function useCachedBlobUrl(url: string): string | null {
  const [resolved, setResolved] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    resolveCachedBlobUrl(url).then((u) => {
      if (!cancelled) setResolved(u);
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return resolved;
}
