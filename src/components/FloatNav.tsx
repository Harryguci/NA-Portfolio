const FloatNav = () => {
  return (
    <div
      className="fixed flex flex-column right-[15px] lg:right-[30px]"
      style={{
        zIndex: 200,
        bottom: "10vh",
      }}
    >
      <button
        type="button"
        className="circle-btn flex justify-center items-center shadow"
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
