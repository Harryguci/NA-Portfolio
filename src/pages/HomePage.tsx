import FolderCardLink from "../components/FolderCardLink";
import FloatingDecor from "../components/FloatingDecor";
import assetsData from "../assert_urls.json";
import homeHeroVideo from "../assets/bia.mp4";
import waterBackground from "../assets/background_water.png";

const [folderPreviewResume, , , , folderPreviewWorks, , , , , , folderPreviewContact] =
  assetsData.asserts as string[];

const homeFolders = [
  {
    to: "/resume",
    label: "RESUME",
    previewSrc: folderPreviewResume,
    previewAlt: "Resume preview card",
  },
  {
    to: "/works",
    label: "WORKS",
    previewSrc: folderPreviewWorks,
    previewAlt: "Works preview card",
  },
  {
    to: "/contact",
    label: "CONTACT",
    previewSrc: folderPreviewContact,
    previewAlt: "Contact preview card",
  },
];

const HomePage = () => {
  return (
    <main className="isolate min-h-dvh overflow-x-hidden">
      <section className="relative flex min-h-dvh items-center justify-center">
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          aria-label="Home intro background video"
        >
          <source src={homeHeroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-white/8" />
      </section>

      <section
        className="relative flex min-h-[380px] items-end px-4 pb-7 pt-4 sm:px-6 md:px-10"
        style={{
          backgroundImage: `url(${waterBackground})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[#244f86]/20" />
        <FloatingDecor />
        <div className="relative mx-auto w-full max-w-6xl">
          <section className="relative mx-auto flex flex-wrap items-end justify-center gap-5 md:gap-7">
            {homeFolders.map((folder) => (
              <FolderCardLink key={folder.to} {...folder} />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
