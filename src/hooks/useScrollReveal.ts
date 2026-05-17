import { useEffect, useRef, useState } from "react";

/**
 * Toggles `isVisible` from viewport intersection: reveals on scroll-into-view, and
 * hides when the block leaves through the bottom of the root (typical “scroll up”
 * case). Leaving through the top (scrolled past downward) keeps it revealed.
 * Honors `prefers-reduced-motion` by showing immediately.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setIsVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Use threshold 0: tall blocks often never reach e.g. 12% intersection ratio
          // (ratio ≈ viewport height / element height), so higher thresholds never fire.
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            setIsVisible(true);
            continue;
          }

          const rb = entry.rootBounds;
          const rect = entry.boundingClientRect;
          const rootBottom = rb?.bottom ?? window.innerHeight;
          const exitedBelow = rect.top >= rootBottom - 1;
          if (exitedBelow) {
            setIsVisible(false);
          }
        }
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0,
      },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, isVisible };
}
