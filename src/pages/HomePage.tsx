import { useEffect } from "react";
import HomeMenuLink from "../components/HomeMenuLink";
import homeHeroVideo from "../assets/bia.mp4";
import waterBackground from "../assets/background_water.png";
import resumeButton from "../assets/Resume_Button.png";
import worksButton from "../assets/works_button.png";
import contactButton from "../assets/contact_button.png";
import ResumePage from "./ResumePage";
import WorksPage from "./WorksPage";
import ContactPage from "./ContactPage";
import "./HomePage.scss";

const homeFolders = [
  {
    to: "#resume",
    src: resumeButton,
    alt: "Resume button",
  },
  {
    to: "#works",
    src: worksButton,
    alt: "Works button",
  },
  {
    to: "#contact",
    src: contactButton,
    alt: "Contact button",
  },
];

const HomePage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-scroll-container">
      <main className="home-page section" id="home">
        <section className="home-page__hero">
          <video
            className="home-page__hero-video"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            aria-label="Home intro background video"
          >
            <source src={homeHeroVideo} type="video/mp4" />
          </video>
          <div className="home-page__hero-overlay" />
        </section>

        <section
          className="home-page__bottom"
          style={{
            backgroundImage: `url(${waterBackground})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="home-page__bottom-overlay" />
          <div className="home-page__container">
            <section className="home-page__folders">
              {homeFolders.map((folder) => (
                <HomeMenuLink key={folder.to} {...folder} isAnchor />
              ))}
            </section>
          </div>
        </section>
      </main>

      <section id="resume" className="section">
        <ResumePage />
      </section>

      <section id="works" className="section">
        <WorksPage />
      </section>

      <section id="contact" className="section">
        <ContactPage />
      </section>
    </div>
  );
};

export default HomePage;
