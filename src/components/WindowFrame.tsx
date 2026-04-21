import type { ReactNode } from "react";

interface WindowFrameProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const WindowFrame = ({ title, children, className = "" }: WindowFrameProps) => {
  return (
    <section
      className={`overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-dream blur-backdrop ${className}`}
      aria-label={title}
    >
      <header className="flex items-center gap-2 border-b border-dream-pink/45 bg-dream-pink/65 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-dream-pink ring-1 ring-dream-text/25" />
        <span className="h-3 w-3 rounded-full bg-dream-yellow ring-1 ring-dream-text/25" />
        <span className="h-3 w-3 rounded-full bg-dream-blue ring-1 ring-dream-text/25" />
        <p className="ml-2 font-pixel text-sm text-dream-text/80">{title}</p>
      </header>
      <div className="p-4 sm:p-6 md:p-8">{children}</div>
    </section>
  );
};

export default WindowFrame;
