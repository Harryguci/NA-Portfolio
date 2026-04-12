import React, { useEffect, useRef, useState } from "react";

export interface AutoPlayVideoProps {
  src: string;
  className?: string;
  title?: string;
  ariaLabel?: string;
  // Fraction of the element that should be visible to trigger play
  threshold?: number;
  // Whether to show default controls
  controls?: boolean;
  // Optional poster image
  poster?: string;
  /** When true, the video source is not set until the element is near the viewport */
  deferLoad?: boolean;
  /** Margin passed to IntersectionObserver when deferLoad is true */
  loadRootMargin?: string;
}

const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({
  src,
  className,
  title,
  ariaLabel,
  threshold = 0.6,
  controls = true,
  poster,
  deferLoad = true,
  loadRootMargin = "300px",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const loadSentinelRef = useRef<HTMLDivElement | null>(null);
  const [mediaReady, setMediaReady] = useState(!deferLoad);

  useEffect(() => {
    if (!deferLoad) {
      setMediaReady(true);
      return;
    }
    const el = loadSentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setMediaReady(true);
      },
      { rootMargin: loadRootMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [deferLoad, loadRootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mediaReady) return;

    // Ensure inline playback on iOS Safari and reduce chances of fullscreen
    try {
      video.setAttribute("playsinline", "true");
      // Non-standard but widely used attrs for various mobile browsers
      video.setAttribute("webkit-playsinline", "true");
      video.setAttribute("x5-playsinline", "true");
      video.setAttribute("x5-video-player-type", "h5");
      // Hint to hide/disable fullscreen/PiP where supported
      video.setAttribute("disablePictureInPicture", "true");
      video.setAttribute("controlsList", "nofullscreen noplaybackrate");
    } catch {
      /* setAttribute may throw in rare DOM environments */
    }

    // Auto-blur when video receives focus (prevents focus during autoplay)
    const handleFocus = () => {
      if (video && document.activeElement === video) {
        video.blur();
      }
    };

    video.addEventListener("focus", handleFocus);

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!video) return;
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          // Autoplay requires muted on mobile
          video.muted = true;
          const playPromise = video.play();
          if (playPromise && typeof playPromise.then === "function") {
            playPromise.catch(() => {
              // swallow autoplay errors
            });
          }
          // Blur immediately after autoplay to prevent focus
          if (document.activeElement === video) {
            video.blur();
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: [0, threshold, 1] }
    );

    obs.observe(video);
    return () => {
      video.removeEventListener("focus", handleFocus);
      obs.disconnect();
    };
  }, [threshold, mediaReady]);

  const preload: "none" | "metadata" | "auto" = !mediaReady
    ? "none"
    : poster
      ? "metadata"
      : "auto";

  return (
    <div ref={loadSentinelRef} className="w-full h-full min-h-0">
      <video
        ref={videoRef}
        className={className}
        // Keep controls for accessibility
        controls={controls}
        // Inline playback is crucial on iOS to avoid fullscreen
        playsInline
        muted
        // Smooth UX for short clips
        loop
        preload={preload}
        title={title}
        aria-label={ariaLabel}
        poster={poster}
      >
        {mediaReady ? <source src={src} type="video/mp4" /> : null}
      </video>
    </div>
  );
};

export default AutoPlayVideo;
