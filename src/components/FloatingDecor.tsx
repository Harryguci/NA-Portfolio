const FloatingDecor = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className="float-soft absolute left-[5%] top-[20%] text-6xl text-dream-yellow/80">
        ★
      </span>
      <span className="float-soft-delayed absolute right-[9%] top-[12%] text-7xl text-white/80">
        ☆
      </span>
      <span className="float-soft absolute left-[14%] bottom-[31%] text-5xl text-dream-yellow/65">
        ★
      </span>
      <span className="float-soft-delayed absolute right-[14%] bottom-[22%] text-6xl text-white/75">
        ☆
      </span>
    </div>
  );
};

export default FloatingDecor;
