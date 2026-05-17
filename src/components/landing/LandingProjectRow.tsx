import type { CSSProperties } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./LandingDetail.scss";

export type LandingProjectRowProps = {
  title: string;
  image: string;
  imageAlt: string;
  href?: string;
  reverse?: boolean;
  revealDelayMs?: number;
};

const LandingProjectRow = ({
  title,
  image,
  imageAlt,
  href,
  reverse = false,
  revealDelayMs = 0,
}: LandingProjectRowProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const style = {
    ["--landing-detail-reveal-delay"]: `${revealDelayMs}ms`,
  } as CSSProperties;

  const cta = href ? (
    <a
      className="landing-detail__cta"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>View landing page</span> <span className="landing-detail__cta-arrow">→</span>
    </a>
  ) : (
    <span className="landing-detail__cta">
      <span>View landing page</span> <span className="landing-detail__cta-arrow">→</span>
    </span>
  );

  return (
    <div
      ref={ref}
      className={`landing-detail__row ${reverse ? "landing-detail__row--reverse" : ""} ${isVisible ? "landing-detail__row--visible" : ""}`}
      style={style}
    >
      <div className="landing-detail__copy">
        <h3 className="landing-detail__title">{title}</h3>
        {cta}
      </div>
      <figure className="landing-detail__media">
        <img src={image} alt={imageAlt} loading="lazy" />
      </figure>
    </div>
  );
};

export default LandingProjectRow;
