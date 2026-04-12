import { useEffect, useRef, useState, type ReactNode } from "react";

export interface DeferredSectionProps {
  children: ReactNode;
  /** Extra margin around the viewport to start loading before the user reaches the section */
  rootMargin?: string;
  className?: string;
  placeholderClassName?: string;
}

export default function DeferredSection({
  children,
  rootMargin = "320px",
  className = "w-full",
  placeholderClassName = "w-full min-h-[240px] bg-neutral-100/90 animate-pulse rounded-sm",
}: DeferredSectionProps) {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShow(true);
      },
      { rootMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={rootRef} className={className}>
      {show ? children : <div className={placeholderClassName} aria-hidden />}
    </div>
  );
}
