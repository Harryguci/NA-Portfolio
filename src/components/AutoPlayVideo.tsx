import React, { useEffect, useRef } from "react";

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
}

const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({
  src,
  className,
  title,
  ariaLabel,
  threshold = 0.6,
  controls = true,
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
    } catch {}

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
      obs.disconnect();
    };
  }, [threshold]);

  return (
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
      preload={poster ? "metadata" : "auto"}
      title={title}
      aria-label={ariaLabel}
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default AutoPlayVideo;
