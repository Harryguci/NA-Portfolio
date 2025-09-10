import { useState, useEffect } from "react";

const FloatNav = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Giới thiệu" },
    { id: "resume", label: "Hồ sơ" },
    { id: "comem-lab", label: "Cỏ mềm" },
    { id: "viet-education", label: "Vietis Education" },
    { id: "social-media-posts-1", label: "Social Media Posts" },
    { id: "kidulties", label: "Kidulties" },
    { id: "nungning-garden", label: "Nungning Garden" },
    { id: "others", label: "Others" },
    { id: "footer", label: "Footer" },
  ];

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set active section

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isActive]);

  const getVisibleSections = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    const visibleSections = [];

    // Add previous section if exists
    if (currentIndex > 0) {
      visibleSections.push({ ...sections[currentIndex - 1], type: "prev" });
    }

    // Add current section
    visibleSections.push({ ...sections[currentIndex], type: "current" });

    // Add next section if exists
    if (currentIndex < sections.length - 1) {
      visibleSections.push({ ...sections[currentIndex + 1], type: "next" });
    }

    return visibleSections;
  };

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed flex flex-col right-[15px] lg:right-[30px]"
      style={{
        zIndex: 200,
        bottom: "10vh",
      }}
    >
      <nav className="flex flex-col gap-2 w-[100px]">
        {getVisibleSections().map((section) => (
          <div
            key={section.id}
            className={`transition-all duration-300 ${
              section.type === "current"
                ? "opacity-100 scale-100"
                : "opacity-60 scale-90"
            }`}
          >
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(section.id);
              }}
              className={`block px-3 py-2 rounded-lg text-center font-medium transition-all duration-200 text-[10px] ${
                section.type === "current"
                  ? "text-primary shadow-lg bg-primary"
                  : "text-[#464021] bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {section.label}
            </a>
          </div>
        ))}
      </nav>
      <button
        type="button"
        title="Back to top"
        className="mx-auto circle-btn flex justify-center items-center shadow mt-4"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32px"
          viewBox="0 -960 960 960"
          width="32px"
          fill="#464021"
        >
          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
        </svg>
      </button>
    </div>
  );
};

export default FloatNav;
