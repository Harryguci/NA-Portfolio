import "./App.css";
import { useEffect, useState } from "react";
import IntervalVideo from "./components/IntervalVideo";
import CachedAutoPlayVideo from "./components/CachedAutoPlayVideo";
import CachedRemoteImg from "./components/CachedRemoteImg";
import { useCachedBlobUrl } from "./utils/cachedBlobUrl";
import assertsJson from "./assert_urls.json";
const [
  image10,
  biaVideo,
  vid1Video,
  vid2Video,
  gif3Video,
  vid4Video,
  image4,
  motionVid1,
  motionVid2,
  motionVid3,
  labeileSection,
] = assertsJson.asserts as string[];
import Loading from "./components/Loading";
import DeferredSection from "./components/DeferredSection";
import resume from "./assets/resume.png";
import image3 from "./assets/3.png";
// import image3p2 from "./assets/3p2.png";
// import motionGraphicTitle from "./assets/motion_graphic_title.png";
import labeilleLandingPageNavigation from "./assets/landing_labelle_bg.png";
import image5 from "./assets/5.png";
import image5p2 from "./assets/5_p2.png";
// import image6 from "./assets/6.png";
import image7 from "./assets/7.png";
import image8 from "./assets/8.png";
import image9 from "./assets/9.png";
import image11 from "./assets/11.png";
import image12 from "./assets/12.jpg";
import motionGraphicFrame from "./assets/motion_graphic_frame.png";
import motionGraphicFrameSquare from "./assets/motion_graphic_frame_square.png";
import FloatNav from "./components/FloatNav";
import PrimaryButton from "./components/PrimaryButton";
import labeilleLandingPageTextBtn from "./assets/landing_labelle_text-btn.png";
import vietisLandingPageNavigation from "./assets/landing_vietis_bg.png";
import vietisLandingPageTextBtn from "./assets/landing_vietis_text-btn.png";

function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const biaResolved = useCachedBlobUrl(biaVideo);

  useEffect(() => {
    if (!biaResolved) return;

    const loadHeroVideo = (url: string) =>
      new Promise<void>((resolve) => {
        const video = document.createElement("video");
        video.preload = "auto";
        video.muted = true;
        const finish = () => resolve();
        video.addEventListener("canplaythrough", finish, { once: true });
        video.addEventListener("canplay", finish, { once: true });
        video.addEventListener("error", finish, { once: true });
        setTimeout(finish, 12000);
        video.src = url;
      });

    loadHeroVideo(biaResolved).then(() => setAssetsLoaded(true));
  }, [biaResolved]);

  useEffect(() => {
    // Observe window width
    const observer = new ResizeObserver((entries) => {
      setWindowWidth(entries[0].contentRect.width);
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);
  const getResidualHeight = () => {
    const wWidth = window.innerWidth;
    if (wWidth < 550) {
      return 45;
    } else if (wWidth < 900) {
      return 70;
    } else if (wWidth > 900) {
      return 90;
    }
    return 100;
  };

  const getThresholdMinHeight = () => {
    const wWidth = window.innerWidth;
    if (wWidth < 700) {
      return 700;
    } else if (wWidth < 1200) {
      return 350;
    } else if (wWidth < 1400) {
      return 400;
    } else if (wWidth > 1400 && wWidth <= 1600) {
      return 500;
    } else if (wWidth > 1600) {
      return 550;
    }
    return 1000;
  };

  const thresholdHeight = Math.min(
    windowWidth / 2 - getResidualHeight(),
    getThresholdMinHeight()
  );
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
          {biaResolved ? (
            <IntervalVideo
              src={biaResolved}
              interval={12000} // 5 seconds interval
              className="w-full h-auto"
              title="Introduction video - Giới thiệu portfolio"
            />
          ) : null}
        </section>
        <section id="resume" className="bg-white" title="Hồ sơ - Resume">
          <DeferredSection>
            <img
              src={resume}
              alt="Professional resume and portfolio overview"
              title="Resume - Hồ sơ"
              className="w-full h-auto"
              decoding="async"
            />
          </DeferredSection>
        </section>
        <section
          id="labeille-global"
          className="bg-white w-full"
          title="L'Abeille Global Project"
        >
          <DeferredSection placeholderClassName="w-full min-h-[280px] sm:min-h-[360px] bg-neutral-100/90 animate-pulse rounded-sm">
            <CachedRemoteImg
              src={labeileSection}
              alt="L'Abeille Global project showcase and design work"
              title="L'Abeille Global Project"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />

            {/* Motion graphic frames : 3 columns, content of frame is a video  */}
            <div className="mt-[30px] sm:mt-[50px] grid grid-cols-3 gap-[5px] md:gap-4 px-[24px] sm:px-[50px] lg:px-[60px] mb-10">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "547 / 672" }}
            >
              {/* Frame overlay */}
              <img
                src={motionGraphicFrame}
                alt="Motion graphic frame"
                title="Motion Graphic Frame"
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                loading="lazy"
                decoding="async"
              />
              <div className="w-full h-full p-[3px] md:p-[8px] lg:p-[10px]">
                <CachedAutoPlayVideo
                  src={motionVid1}
                  className="w-full h-full object-cover"
                  title="L'Abeille Global motion graphic 1"
                  ariaLabel="L'Abeille Global motion graphic video 1"
                  controls={false}
                />
              </div>
            </div>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "1 / 1" }}
            >
              <img
                src={motionGraphicFrameSquare}
                alt="Motion graphic frame"
                title="Motion Graphic Frame"
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                loading="lazy"
                decoding="async"
              />
              <div className="w-full h-full p-[3px] md:p-[8px] lg:p-[10px]">
                <CachedAutoPlayVideo
                  src={motionVid2}
                  className="w-full h-full object-cover"
                  title="L'Abeille Global motion graphic 2"
                  ariaLabel="L'Abeille Global motion graphic video 2"
                  controls={false}
                />
              </div>
            </div>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "547 / 672" }}
            >
              <img
                src={motionGraphicFrame}
                alt="Motion graphic frame"
                title="Motion Graphic Frame"
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                loading="lazy"
                decoding="async"
              />
              <div className="w-full h-full p-[3px] md:p-[8px] lg:p-[10px]">
                <CachedAutoPlayVideo
                  src={motionVid3}
                  className="w-full h-full object-cover"
                  title="L'Abeille Global motion graphic 3"
                  ariaLabel="L'Abeille Global motion graphic video 3"
                  controls={false}
                />
              </div>
            </div>
          </div>

          {/* Landing page navigation hero: */}
          <div className="px-[24px] sm:px-[50px] lg:px-[50px]">
            <div className="w-full relative mt-10 mb-10">
              {/* Background image */}
              <img
                src={labeilleLandingPageNavigation}
                alt="L'Abeille Global landing page navigation design"
                title="L'Abeille Global Landing Page Navigation"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />

              {/* Text and button overlay - positioned at center-right */}
              <div className="absolute inset-0 flex items-center justify-start pl-0 lg:pl-[24px]">
                <div className="flex flex-col items-center gap-4 md:gap-6">
                  {/* Title text from image */}
                  <img
                    src={labeilleLandingPageTextBtn}
                    alt="Landing page - Danton Biotin"
                    className="w-[100px] md:w-[180px] lg:w-[300px] h-auto"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Interactive button */}
                  <PrimaryButton
                    href="http://www.labeilleglobal.vn/biotin"
                    showArrow={true}
                    title="Open L'Abeille Global landing page"
                    ariaLabel="Open L'Abeille Global landing page on Behance"
                    className="text-[8px] md:text-base lg:text-[20px] px-[7px] md:px-8 lg:px-10 py-[5px] md:py-4 lg:py-5"
                  >
                    Open landing page
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
          </DeferredSection>
        </section>
        <section
          id="comem-lab"
          className="bg-white w-full"
          title="Cỏ mềm - Comem Lab Project"
        >
          <DeferredSection placeholderClassName="w-full min-h-[260px] bg-neutral-100/90 animate-pulse rounded-sm">
            <img
              src={image3}
              alt="Cỏ mềm project showcase and design work"
              title="Cỏ mềm Project"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          {/* <p className="text-right text-sm px-5 pt-0 pb-10 pr-[12px] md:pr-[50px] pl-[12px] md:text-3xl">
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
          </p> */}
          </DeferredSection>
        </section>
        <section
          id="comem-lab-2"
          className="bg-white mb-[30px]"
          title="Cỏ mềm Lab - Additional Project Details"
        >
          <DeferredSection placeholderClassName="w-full min-h-[200px] bg-neutral-100/90 animate-pulse rounded-sm">
          <div className="mx-auto h-auto relative w-full px-[24px] sm:px-[50px] lg:px-[50px]">
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
                  <CachedAutoPlayVideo
                    src={vid1Video}
                    className="w-full h-full"
                    title="Cỏ mềm project video 1"
                    ariaLabel="Cỏ mềm project video 1"
                    controls={false}
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
                  <CachedAutoPlayVideo
                    src={vid2Video}
                    className="w-full h-full"
                    title="Cỏ mềm project video 2"
                    ariaLabel="Cỏ mềm project video 2"
                    controls={false}
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
                  <CachedRemoteImg
                    src={gif3Video}
                    alt="Cỏ mềm project animation and interactive design"
                    title="Cỏ mềm Project Animation"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
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
                  <CachedAutoPlayVideo
                    src={vid4Video}
                    className="w-full h-full"
                    title="Cỏ mềm project video 4"
                    ariaLabel="Cỏ mềm project video 4"
                    controls={false}
                  />
                </button>
              </div>
            </div>
          </div>
          </DeferredSection>
        </section>
        <section
          id="viet-education"
          className="bg-white"
          title="Vietis Education Project"
        >
          <DeferredSection placeholderClassName="w-full min-h-[280px] bg-neutral-100/90 animate-pulse rounded-sm">
            <CachedRemoteImg
              src={image4}
              alt="Vietis Education project showcase and design portfolio"
              title="Vietis Education Project"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          {/* Vietis Landing page navigation hero: */}
          <div className="px-[24px] sm:px-[50px] lg:px-[50px]">
            <div className="w-full relative mt-2 mb-3 md:mt-10 md:mb-10">
              {/* Background image */}
              <img
                src={vietisLandingPageNavigation}
                alt="Vietis Education landing page navigation design"
                title="Vietis Education Landing Page Navigation"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />

              {/* Text and button overlay - positioned at center-left */}
              <div className="absolute inset-0 flex items-center justify-start">
                <div className="flex flex-col items-center gap-4 md:gap-6 lg:pl-[24px]">
                  {/* Title text from image */}
                  <img
                    src={vietisLandingPageTextBtn}
                    alt="Landing page - Vietis Education"
                    className="w-[100px] md:w-[180px] lg:w-[300px] h-auto"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Interactive button */}
                  <PrimaryButton
                    href="https://www.vietis.edu.vn/khoa-hoc-dao-tao-pre-brse-thuc-chien/"
                    showArrow={true}
                    title="Open Vietis Education landing page"
                    ariaLabel="Open Vietis Education landing page on Behance"
                    className="text-[8px] md:text-base lg:text-[20px] px-[7px] md:px-8 lg:px-10 py-[5px] md:py-4 lg:py-5 bg-secondary-reverse"
                  >
                    Open landing page
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
          </DeferredSection>
        </section>
        <section
          id="social-media-posts-1"
          className="bg-white"
          title="Social Media Posts - Part 1"
        >
          <DeferredSection placeholderClassName="w-full min-h-[280px] bg-neutral-100/90 animate-pulse rounded-sm">
            <img
              src={image5}
              alt="Social media posts design portfolio and creative work"
              title="Social Media Posts Portfolio"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
            <img
              src={image5p2}
              alt="Social media posts design portfolio and creative work part 2"
              title="Social Media Posts Portfolio Part 2"
              className="w-full h-auto object-cover mt-5"
              loading="lazy"
              decoding="async"
            />
          </DeferredSection>
        </section>
        <section id="kidulties" className="bg-white" title="Kidulties Project">
          <DeferredSection>
            <img
              src={image7}
              alt="Kidulties project showcase and brand design"
              title="Kidulties Project"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </DeferredSection>
        </section>
        <section
          id="nungning-garden"
          className="bg-white"
          title="Nungning Garden Project"
        >
          <DeferredSection>
            <img
              src={image8}
              alt="Nungning Garden project showcase and design work"
              title="Nungning Garden Project"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </DeferredSection>
        </section>
        <section id="others" className="bg-white" title="Other Projects">
          <DeferredSection>
            <img
              src={image9}
              alt="Additional portfolio projects and design work"
              title="Other Projects Portfolio"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </DeferredSection>
        </section>
        <section
          id="others-1"
          className="bg-white px-[24px] sm:px-[32px] lg:px-[100px] xl:px-[140px]"
          title="Additional Portfolio Work - Part 1"
        >
          <DeferredSection placeholderClassName="w-full min-h-[200px] bg-neutral-100/90 animate-pulse rounded-sm">
            <CachedRemoteImg
              src={image10}
              alt="Additional portfolio showcase and creative design work"
              title="Additional Portfolio Work"
              className="w-full h-auto object-cover rounded-[15px] md:rounded-[40px]"
              loading="lazy"
              decoding="async"
            />
          </DeferredSection>
        </section>
        <section
          id="others-2"
          className="bg-white px-[24px] sm:px-[32px] lg:px-[100px] xl:px-[140px]"
          title="Additional Portfolio Work - Part 2"
        >
          <DeferredSection placeholderClassName="w-full min-h-[200px] bg-neutral-100/90 animate-pulse rounded-sm">
            <img
              src={image12}
              alt="Additional portfolio showcase and creative design work part 2"
              title="Additional Portfolio Work Part 2"
              className="w-full h-auto object-cover rounded-[15px] md:rounded-[40px]"
              loading="lazy"
              decoding="async"
            />
          </DeferredSection>
        </section>
        <section
          id="footer"
          className="bg-white"
          title="Footer - Contact and Information"
        >
          <DeferredSection>
            <img
              src={image11}
              alt="Portfolio footer with contact information and branding"
              title="Portfolio Footer"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </DeferredSection>
        </section>
      </div>
      <FloatNav />
    </>
  );
}

export default App;
