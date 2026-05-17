import type { CSSProperties } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./LandingDetail.scss";

type MotionVideo = {
  src: string;
  label: string;
};

type LandingMotionGridProps = {
  videos: readonly MotionVideo[];
};

function MotionVideoSlot({
  video,
  revealDelayMs,
}: {
  video: MotionVideo;
  revealDelayMs: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const style = {
    ["--landing-detail-reveal-delay"]: `${revealDelayMs}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`landing-detail__motion-slot ${isVisible ? "landing-detail__motion-slot--visible" : ""}`}
      style={style}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={video.label}
      >
        <source src={video.src} type="video/mp4" />
      </video>
    </div>
  );
}

const LandingMotionGrid = ({ videos }: LandingMotionGridProps) => (
  <div className="landing-detail__motion-grid">
    {videos.map((video, index) => (
      <MotionVideoSlot
        key={video.src}
        video={video}
        revealDelayMs={index * 90}
      />
    ))}
  </div>
);

export default LandingMotionGrid;
