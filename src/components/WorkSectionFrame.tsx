import { useId, type ReactNode } from "react";
import "./WorkSectionFrame.scss";

export type WorkSectionFrameTone = "ecom" | "social" | "landing";

export interface WorkSectionFrameProps {
  title: string;
  children: ReactNode;
  tone?: WorkSectionFrameTone;
  className?: string;
}

const WorkSectionFrame = ({
  title,
  children,
  tone = "ecom",
  className = "",
}: WorkSectionFrameProps) => {
  const headingId = useId();
  const toneClass =
    tone === "social"
      ? "work-section-frame--social"
      : tone === "landing"
        ? "work-section-frame--landing"
        : "work-section-frame--ecom";

  return (
    <section
      className={`work-section-frame ${toneClass} ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="work-section-frame__pill">
        <span className="work-section-frame__pill-text">{title}</span>
      </h2>
      <div className="work-section-frame__body">{children}</div>
    </section>
  );
};

export default WorkSectionFrame;
