import type { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import WorkSectionFrame from "../components/WorkSectionFrame";
import {
  getFramedWorkDetailSections,
  type WorkDetailSectionSpec,
} from "../data/workDetailSections";
import { useScrollReveal } from "../hooks/useScrollReveal";

import "./WorksDetailPage.scss";

function RevealingFramedSection({
  spec,
  staggerIndex,
}: {
  spec: WorkDetailSectionSpec;
  staggerIndex: number;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const style = {
    ["--works-detail-reveal-delay"]: `${staggerIndex * 75}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`works-detail__frame-reveal ${isVisible ? "works-detail__frame-reveal--visible" : ""}`}
      style={style}
    >
      <WorkSectionFrame title={spec.title} tone={spec.tone}>
        {spec.body}
      </WorkSectionFrame>
    </div>
  );
}

const WorksDetailPage = () => {
  const { id } = useParams();
  const isPosm = id === "posm";
  const framedSections = getFramedWorkDetailSections(id);
  const useFramedLayout =
    framedSections != null && framedSections.length > 0;

  const topbarTheme =
    id === "ecommerce"
      ? "works-detail__topbar--ecom"
      : id === "socialads"
        ? "works-detail__topbar--social"
        : id === "posm"
          ? "works-detail__topbar--posm"
          : "works-detail__topbar--landing";
  const firstFramed = framedSections?.[0];
  const restFramed = framedSections?.slice(1) ?? [];

  return (
    <main className={`works-detail ${isPosm ? "works-detail--posm" : ""}`}>
      <div className="works-detail__background" />

      <header className={`works-detail__topbar ${topbarTheme}`}>
        <Link to="/works" className="works-detail__topbar-back">
          ← Table of contents
        </Link>

        <nav
          className="works-detail__topbar-nav"
          aria-label="Detail page links"
        >
          <Link to="/">Home</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <section className="works-detail__content">
        {useFramedLayout && firstFramed ? (
          <>
            <div className="works-detail__hero-region">
              <RevealingFramedSection
                key={`${id ?? ""}-framed-0`}
                spec={firstFramed}
                staggerIndex={0}
              />
            </div>

            <div className="works-detail__below-fold works-detail__below-fold--framed">
              {restFramed.map((spec, index) => (
                <RevealingFramedSection
                  key={`${id ?? ""}-${spec.title}-${String(index)}`}
                  spec={spec}
                  staggerIndex={index + 1}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="works-detail__unknown">
            This work is not available.{" "}
            <Link to="/works">Back to table of contents</Link>
          </p>
        )}
      </section>
    </main>
  );
};

export default WorksDetailPage;
