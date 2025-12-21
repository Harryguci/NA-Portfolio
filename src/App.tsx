import "./App.css";
import { useEffect, useState } from "react";
import IntervalVideo from "./components/IntervalVideo";
import AutoPlayVideo from "./components/AutoPlayVideo";
import assertsJson from "./assert_urls.json";
const [image10, biaVideo, vid1Video, vid2Video, gif3Video, vid4Video, image4] =
  assertsJson.asserts as string[];
import Loading from "./components/Loading";
import resume from "./assets/resume.png";
import image3 from "./assets/3.png";
import image3p2 from "./assets/3p2.png";
import image5 from "./assets/5.png";
import image5p2 from "./assets/5_p2.png";
import image6 from "./assets/6.png";
import image7 from "./assets/7.png";
import image8 from "./assets/8.png";
import image9 from "./assets/9.png";
import image11 from "./assets/11.png";
import image12 from "./assets/12.jpg";
import FloatNav from "./components/FloatNav";

function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const imageUrls = [image10];
    const videoUrls = [
      biaVideo,
      // resume1Video,
      vid1Video,
      vid2Video,
      gif3Video,
      vid4Video,
    ];

    const loadImage = (url: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
      });

    const loadVideo = (url: string) =>
      new Promise<void>((resolve) => {
        const video = document.createElement("video");
        video.preload = "auto";
        video.muted = true;
        const finish = () => resolve();
        video.addEventListener("canplaythrough", finish, { once: true });
        video.addEventListener("error", finish, { once: true });
        // Fallback timeout in case events never fire
        setTimeout(finish, 8000);
        video.src = url;
      });

    Promise.any([
      ...imageUrls.map(loadImage),
      ...videoUrls.map(loadVideo),
    ]).then(() => setAssetsLoaded(true));
  }, []);

  useEffect(() => {
    // Observe window width
    const observer = new ResizeObserver((entries) => {
      setWindowWidth(entries[0].contentRect.width);
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  const thresholdHeight = Math.min(windowWidth / 2 - 50, 500);
  const comemFrameHeight = thresholdHeight + "px";
  const comemFrameHeight2 = thresholdHeight * 1.347 + "px";

  return (
    <>
      {!assetsLoaded && (
        <div className="fixed top-0 left-0 w-full h-full p-3 lg:p-5 bg-white z-50 flex justify-center items-center">
          <Loading />
        </div>
      )}
      <div className="flex flex-col max-w-[2500px] mx-auto px-0 lg:px-[100px] xl:px-[120px] 2xl:px-[300px]">
        <section
          id="hero"
          className="text-white"
          title="Giới thiệu - Introduction"
        >
          <IntervalVideo
            src={biaVideo}
            interval={12000} // 5 seconds interval
            className="w-full h-auto"
            title="Introduction video - Giới thiệu portfolio"
          />
        </section>
        <section id="resume" className="bg-white" title="Hồ sơ - Resume">
          <img
            src={resume}
            alt="Professional resume and portfolio overview"
            title="Resume - Hồ sơ"
            className="w-full h-auto"
          />
        </section>
        <section
          id="labeille-global"
          className="bg-white w-full"
          title="L'Abeille Global Project"
        >
          <img
            src={image3p2}
            alt="L'Abeille Global project showcase and design work"
            title="L'Abeille Global Project"
            className="w-full h-auto object-cover"
          />
        </section>
        <section
          id="comem-lab"
          className="bg-white w-full"
          title="Cỏ mềm - Comem Lab Project"
        >
          <img
            src={image3}
            alt="Cỏ mềm project showcase and design work"
            title="Cỏ mềm Project"
            className="w-full h-auto object-cover"
          />
          <p className="text-right text-sm px-5 pt-0 pb-10 pr-[12px] md:pr-[50px] pl-[12px] md:text-3xl">
            View more on my behance:{" "}
            <a
              href="https://www.behance.net/phanthngcanh/projects"
              target="_blank"
              rel="noopener noreferrer"
              title="View more projects on Behance"
              className="text-blue-500 inline-block w-full overflow-x-hidden overflow-y-hidden h-full"
            >
              https://www.behance.net/phanthngcanh/projects
            </a>
          </p>
        </section>
        <section
          id="comem-lab-2"
          className="bg-white mb-[30px]"
          title="Cỏ mềm Lab - Additional Project Details"
        >
          <div className="mx-auto h-auto relative w-full">
            <img
              src="/video/hoa_1.png"
              alt="Cỏ mềm decorative element - flower design 1"
              title="Cỏ mềm Decorative Element"
              className="comem-effect index-1 aspect-square object-cover w-[70px] h-[70px] md:w-[100px] md:h-[100px] lg:w-[200px] lg:h-[200px] absolute left-0 overflow-visible"
              style={{
                zIndex: "100",
              }}
            />
            <img
              src="/video/hoa_2.png"
              alt="Cỏ mềm decorative element - flower design 2"
              title="Cỏ mềm Decorative Element"
              className="comem-effect index-2 aspect-square object-cover w-[70px] h-[70px] md:w-[100px] md:h-[100px] lg:w-[200px] lg:h-[200px] absolute right-0 overflow-visible"
              style={{
                top: "60px",
                zIndex: "100",
              }}
            />
            <img
              src="/video/hoa_3.png"
              alt="Cỏ mềm decorative element - flower design 3"
              title="Cỏ mềm Decorative Element"
              className="comem-effect index-3 aspect-square object-cover w-[140px] h-[70px] md:w-[200px] md:h-[100px] lg:w-[400px] lg:h-[200px] absolute right-0 overflow-visible"
              style={{
                zIndex: "100",
              }}
            />
            <div className="comem__frame flex flex-nowrap justify-center w-full h-auto">
              <div
                className="comem__frame-btn aspect-square h-full flex justify-center items-center relative mr-[15px] md:mr-[25px]"
                style={{ height: comemFrameHeight }}
              >
                <div className="comem_frame-btn__square index-1"></div>
                <div className="comem_frame-btn__square index-2"></div>
                <div className="comem_frame-btn__square index-3"></div>
                <div className="comem_frame-btn__square index-4"></div>
                <button
                  className="btn"
                  title="Play Cỏ mềm project video 1"
                  aria-label="Play Cỏ mềm project video 1"
                >
                  <AutoPlayVideo
                    src={vid1Video}
                    className="w-full h-full"
                    title="Cỏ mềm project video 1"
                    ariaLabel="Cỏ mềm project video 1"
                  />
                </button>
              </div>
              <div
                className="comem__frame-btn aspect-square h-full flex justify-center items-center relative ml-[15px] md:ml-[25px]"
                style={{ height: comemFrameHeight }}
              >
                <div className="comem_frame-btn__square index-1"></div>
                <div className="comem_frame-btn__square index-2"></div>
                <div className="comem_frame-btn__square index-3"></div>
                <div className="comem_frame-btn__square index-4"></div>

                <button
                  className="btn"
                  title="Play Cỏ mềm project video 2"
                  aria-label="Play Cỏ mềm project video 2"
                >
                  <AutoPlayVideo
                    src={vid2Video}
                    className="w-full h-full"
                    title="Cỏ mềm project video 2"
                    ariaLabel="Cỏ mềm project video 2"
                  />
                </button>
              </div>
            </div>
            <div className="mt-[30px] md:mt-[70px] comem__frame flex flex-nowrap justify-center w-full h-auto">
              <div
                className="comem__frame-btn aspect-1-1-347 h-full flex justify-center items-center relative mr-[15px] md:mr-[25px]"
                style={{ height: comemFrameHeight2 }}
              >
                <div className="comem_frame-btn__square index-1"></div>
                <div className="comem_frame-btn__square index-2"></div>
                <div className="comem_frame-btn__square index-3"></div>
                <div className="comem_frame-btn__square index-4"></div>
                <button
                  className="btn w-full h-full overflow-hidden"
                  title="View Cỏ mềm project animation"
                  aria-label="View Cỏ mềm project animation"
                >
                  <img
                    src={gif3Video}
                    alt="Cỏ mềm project animation and interactive design"
                    title="Cỏ mềm Project Animation"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
              <div
                className="comem__frame-btn aspect-square h-full flex justify-center items-center relative ml-[15px] md:ml-[25px]"
                style={{ height: comemFrameHeight }}
              >
                <div className="comem_frame-btn__square index-1"></div>
                <div className="comem_frame-btn__square index-2"></div>
                <div className="comem_frame-btn__square index-3"></div>
                <div className="comem_frame-btn__square index-4"></div>
                <button
                  className="btn w-full h-full overflow-hidden"
                  title="Play Cỏ mềm project video 4"
                  aria-label="Play Cỏ mềm project video 4"
                >
                  <AutoPlayVideo
                    src={vid4Video}
                    className="w-full h-full"
                    title="Cỏ mềm project video 4"
                    ariaLabel="Cỏ mềm project video 4"
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="viet-education"
          className="bg-white"
          title="Vietis Education Project"
        >
          <img
            src={image4}
            alt="Vietis Education project showcase and design portfolio"
            title="Vietis Education Project"
            className="w-full h-auto object-cover"
          />
        </section>
        <section
          id="social-media-posts-1"
          className="bg-white"
          title="Social Media Posts - Part 1"
        >
          <img
            src={image5}
            alt="Social media posts design portfolio and creative work"
            title="Social Media Posts Portfolio"
            className="w-full h-auto object-cover"
          />
          <img
            src={image5p2}
            alt="Social media posts design portfolio and creative work part 2"
            title="Social Media Posts Portfolio Part 2"
            className="w-full h-auto object-cover mt-5"
          />
        </section>
        {/* <section
          id="social-media-posts-2"
          className="bg-white"
          title="Social Media Posts - Part 2"
        >
          <img
            src={image6}
            alt="Social media posts design portfolio and creative work part 2"
            title="Social Media Posts Portfolio Part 2"
            className="w-full h-auto object-cover"
          />
        </section> */}
        <section id="kidulties" className="bg-white" title="Kidulties Project">
          <img
            src={image7}
            alt="Kidulties project showcase and brand design"
            title="Kidulties Project"
            className="w-full h-auto object-cover"
          />
        </section>
        <section
          id="nungning-garden"
          className="bg-white"
          title="Nungning Garden Project"
        >
          <img
            src={image8}
            alt="Nungning Garden project showcase and design work"
            title="Nungning Garden Project"
            className="w-full h-auto object-cover"
          />
        </section>
        <section id="others" className="bg-white" title="Other Projects">
          <img
            src={image9}
            alt="Additional portfolio projects and design work"
            title="Other Projects Portfolio"
            className="w-full h-auto object-cover"
          />
        </section>
        <section
          id="others-1"
          className="bg-white px-[24px] sm:px-[32px] lg:px-[100px] xl:px-[140px]"
          title="Additional Portfolio Work - Part 1"
        >
          <img
            src={image10}
            alt="Additional portfolio showcase and creative design work"
            title="Additional Portfolio Work"
            className="w-full h-auto object-cover rounded-[15px] md:rounded-[40px]"
          />
        </section>
        <section
          id="others-2"
          className="bg-white px-[24px] sm:px-[32px] lg:px-[100px] xl:px-[140px]"
          title="Additional Portfolio Work - Part 2"
        >
          <img
            src={image12}
            alt="Additional portfolio showcase and creative design work part 2"
            title="Additional Portfolio Work Part 2"
            className="w-full h-auto object-cover rounded-[15px] md:rounded-[40px]"
          />
        </section>
        <section
          id="footer"
          className="bg-white"
          title="Footer - Contact and Information"
        >
          <img
            src={image11}
            alt="Portfolio footer with contact information and branding"
            title="Portfolio Footer"
            className="w-full h-auto object-cover"
          />
        </section>
      </div>
      <FloatNav />
    </>
  );
}

export default App;
