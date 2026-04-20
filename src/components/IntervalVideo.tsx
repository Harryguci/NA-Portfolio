import React, { useEffect, useRef } from "react";

interface IntervalVideoProps {
  src: string;
  interval: number; // interval in milliseconds
  className?: string;
  autoPlay?: boolean;
  title?: string;
}

const IntervalVideo: React.FC<IntervalVideoProps> = ({
  src,
  interval,
  className = "",
  autoPlay = true,
  title,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !autoPlay) return;

    const video = videoRef.current;
    let monitorIntervalId: number | undefined;
    let replayIntervalId: number | undefined;

    const startInterval = () => {
      monitorIntervalId = window.setInterval(() => {
        if (video.currentTime >= video.duration - 0.1) {
          video.currentTime = 0;
          void video.play();
        }
      }, 100);

      replayIntervalId = window.setInterval(() => {
        if (video.paused) {
          void video.play();
        }
      }, interval);
    };

    const handleVideoEnd = () => {
      video.currentTime = 0;
      void video.play();
    };

    video.addEventListener("ended", handleVideoEnd);

    if (autoPlay) {
      startInterval();
    }

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      if (monitorIntervalId) {
        clearInterval(monitorIntervalId);
      }
      if (replayIntervalId) {
        clearInterval(replayIntervalId);
      }
    };
  }, [interval, autoPlay]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        className="h-auto w-full object-cover"
        autoPlay={autoPlay}
        muted
        playsInline
        loop={true}
        preload="auto"
        title={title}
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default IntervalVideo;
