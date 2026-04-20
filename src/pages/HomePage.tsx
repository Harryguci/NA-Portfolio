import HomeMenuLink from "../components/HomeMenuLink";
import FloatingDecor from "../components/FloatingDecor";
import homeHeroVideo from "../assets/bia.mp4";
import waterBackground from "../assets/background_water.png";
import resumeButton from "../assets/Resume_Button.png";
import worksButton from "../assets/works_button.png";
import contactButton from "../assets/contact_button.png";
import "./HomePage.scss";

const homeFolders = [
  {
    to: "/resume",
    src: resumeButton,
    alt: "Resume button",
  },
  {
    to: "/works",
    src: worksButton,
    alt: "Works button",
  },
  {
    to: "/contact",
    src: contactButton,
    alt: "Contact button",
  },
];

const HomePage = () => {
  return (
    <main className="home-page">
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
        <FloatingDecor />
        <div className="home-page__container">
          <section className="home-page__folders">
            {homeFolders.map((folder) => (
              <HomeMenuLink key={folder.to} {...folder} />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
