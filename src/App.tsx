import "./App.css";
import { useEffect, useState } from "react";
import IntervalVideo from "./components/IntervalVideo";
import assertsJson from "./assert_urls.json";
const [
  image10,
  biaVideo,
  resume1Video,
  vid1Video,
  vid2Video,
  gif3Video,
  vid4Video,
] = assertsJson.asserts as string[];
import Loading from "./components/Loading";
import image3 from "./assets/3.png";
import image4 from "./assets/4.png";
import image5 from "./assets/5.png";
import image6 from "./assets/6.png";
import image7 from "./assets/7.png";
import image8 from "./assets/8.png";
import image9 from "./assets/9.png";
import image11 from "./assets/11.png";
import FloatNav from "./components/FloatNav";

function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const imageUrls = [image10];
    const videoUrls = [
      biaVideo,
      resume1Video,
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
      <div className="flex flex-col max-w-[2500px] mx-auto">
        <div className="text-white">
          <IntervalVideo
            src={biaVideo}
            interval={12000} // 5 seconds interval
            className="w-full h-auto"
          />
        </div>
        <div className="bg-white">
          <IntervalVideo
            src={resume1Video}
            interval={5000} // 5 seconds interval
            className="w-full h-auto"
          />
        </div>
        <div className="bg-white w-full">
          <img src={image3} alt="logo" className="w-full h-auto object-cover" />
          <p className="text-right text-sm px-5 pt-0 pb-10 pr-[12px] md:pr-[50px] pl-[12px] lg:pr-[100px] lg:pl-[100px] md:text-3xl">
            View more on my behance:{" "}
            <a
              href="https://www.behance.net/phanthngcanh/projects"
              target="_blank"
              className="text-blue-500 inline-block w-full overflow-x-hidden overflow-y-hidden h-full"
            >
              https://www.behance.net/phanthngcanh/projects
            </a>
          </p>
        </div>
        <div className="bg-white mb-[30px]">
          <div className="mx-auto h-auto relative w-full">
            <img
              src="/video/hoa_1.png"
              alt="logo"
              className="comem-effect index-1 aspect-square object-cover w-[70px] h-[70px] md:w-[100px] md:h-[100px] lg:w-[200px] lg:h-[200px] absolute left-0 overflow-visible"
              style={{
                zIndex: "100",
              }}
            />
            <img
              src="/video/hoa_2.png"
              alt="logo"
              className="comem-effect index-2 aspect-square object-cover w-[70px] h-[70px] md:w-[100px] md:h-[100px] lg:w-[200px] lg:h-[200px] absolute right-0 overflow-visible"
              style={{
                top: "60px",
                zIndex: "100",
              }}
            />
            <img
              src="/video/hoa_3.png"
              alt="logo"
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
                <button className="btn">
                  <video className="w-full h-full" controls>
                    <source src={vid1Video} type="video/mp4" />
                  </video>
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

                <button className="btn">
                  <video className="w-full h-full" controls>
                    <source src={vid2Video} type="video/mp4" />
                  </video>
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
                <button className="btn w-full h-full overflow-hidden">
                  <img
                    src={gif3Video}
                    alt="logo"
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
                <button className="btn w-full h-full overflow-hidden">
                  <video className="w-full h-full" controls>
                    <source src={vid4Video} type="video/mp4" />
                  </video>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <img src={image4} alt="logo" className="w-full h-auto object-cover" />
        </div>
        <div className="bg-white">
          <img src={image5} alt="logo" className="w-full h-auto object-cover" />
        </div>
        <div className="bg-white">
          <img src={image6} alt="logo" className="w-full h-auto object-cover" />
        </div>
        <div className="bg-white">
          <img src={image7} alt="logo" className="w-full h-auto object-cover" />
        </div>
        <div className="bg-white">
          <img src={image8} alt="logo" className="w-full h-auto object-cover" />
        </div>
        <div className="bg-white">
          <img src={image9} alt="logo" className="w-full h-auto object-cover" />
        </div>
        <div className="bg-white px-[24px] sm:px-[32px] lg:px-[100px] xl:px-[140px]">
          <img
            src={image10}
            alt="logo"
            className="w-full h-auto object-cover rounded-[15px] md:rounded-[40px]"
          />
        </div>
        <div className="bg-white">
          <img
            src={image11}
            alt="logo"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <FloatNav />
    </>
  );
}

export default App;
