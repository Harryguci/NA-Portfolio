import type { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import posmIntro from "../assets/posm_section1.png";
import menuTitle from "../assets/menu_item.png";
import profileTitle from "../assets/profile_item.png";
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
    !isPosm &&
    framedSections != null &&
    framedSections.length > 0;

  const topbarTheme =
    id === "ecommerce"
      ? "works-detail__topbar--ecom"
      : id === "socialads"
        ? "works-detail__topbar--social"
        : id === "posm"
          ? "works-detail__topbar--posm"
          : "works-detail__topbar--landing";
  const heroTitle = isPosm
    ? "POSM"
    : id === "socialads"
      ? "SOCIAL ADS"
      : "DETAIL";

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
        {isPosm ? (
          <>
            <div className="works-detail__hero-region">
              <figure className="works-detail__hero-art">
                <img
                  src={posmIntro}
                  alt={`${heroTitle} detail visual`}
                  loading="eager"
                />
              </figure>
            </div>

            <div className="works-detail__below-fold">
              <section className="works-detail__panel">
                <img
                  src={menuTitle}
                  alt="Menu"
                  className="works-detail__section-title-image"
                />

                <div className="works-detail__frame">
                  <div className="works-detail__iframe-stack">
                    <iframe
                      allowFullScreen
                      allow="clipboard-write"
                      scrolling="no"
                      className="works-detail__iframe"
                      title="Menu preview 1"
                      src="https://heyzine.com/flip-book/d4e9eed543.html"
                    />
                    <iframe
                      allowFullScreen
                      allow="clipboard-write"
                      scrolling="no"
                      className="works-detail__iframe"
                      title="Menu preview 2"
                      src="https://heyzine.com/flip-book/ef934515a1.html"
                    />
                  </div>
                </div>
              </section>

              <section className="works-detail__panel">
                <img
                  src={profileTitle}
                  alt="Profile"
                  className="works-detail__section-title-image"
                />

                <div className="works-detail__frame">
                  <div className="works-detail__iframe-stack">
                    <iframe
                      allowFullScreen
                      allow="clipboard-write"
                      scrolling="no"
                      className="works-detail__iframe"
                      title="Profile preview 1"
                      src="https://heyzine.com/flip-book/475479de27.html"
                    />
                    <iframe
                      allowFullScreen
                      allow="clipboard-write"
                      scrolling="no"
                      className="works-detail__iframe"
                      title="Profile preview 2"
                      src="https://heyzine.com/flip-book/6817b8a0f3.html"
                    />
                  </div>
                </div>
              </section>
            </div>
          </>
        ) : useFramedLayout && firstFramed ? (
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
