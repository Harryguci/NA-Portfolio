import { Link, useParams } from "react-router-dom";
import posmIntro from "../assets/posm_section1.png";
import menuTitle from "../assets/menu_item.png";
import profileTitle from "../assets/profile_item.png";
import ecommercePoster from "../assets/ecommerce_main.png";
import socialPoster from "../assets/social_main.png";
import landingPage1 from "../assets/landing_main1.png";

import "./WorksDetailPage.scss";

const WorksDetailPage = () => {
  const { id } = useParams();
  const isPosm = id === "posm";
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
  const heroImage = isPosm
    ? posmIntro
    : id === "ecommerce"
      ? ecommercePoster
      : id === "socialads"
        ? socialPoster
        : id === "landing"
          ? landingPage1
          : "";

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
        {/* <div className="works-detail__hero-pill">{heroTitle}</div> */}

        <figure className="works-detail__hero-art">
          <img
            src={heroImage}
            alt={`${heroTitle} detail visual`}
            loading="eager"
          />
        </figure>

        {isPosm ? (
          <>
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
                  ></iframe>
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
                    title="Profile preview"
                    src="https://heyzine.com/flip-book/d4e9eed543.html"
                  ></iframe>
                  <iframe
                    allowFullScreen
                    allow="clipboard-write"
                    scrolling="no"
                    className="works-detail__iframe"
                    src="https://heyzine.com/flip-book/6817b8a0f3.html"
                  ></iframe>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </section>
    </main>
  );
};

export default WorksDetailPage;
