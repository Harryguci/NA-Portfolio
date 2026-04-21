import { Link } from "react-router-dom";
import WindowFrame from "./WindowFrame";

interface RoutePlaceholderProps {
  title: string;
  description: string;
}

const RoutePlaceholder = ({ title, description }: RoutePlaceholderProps) => {
  return (
    <main className="relative flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="dream-water-bg absolute inset-0" />
      <div className="dream-water-overlay absolute inset-0" />

      <WindowFrame title={`${title}.html`} className="relative z-10 w-full max-w-3xl">
        <div className="space-y-5 text-center">
          <h1 className="font-script text-5xl text-dream-text sm:text-6xl">{title}</h1>
          <p className="mx-auto max-w-xl font-rounded text-base text-dream-text/85 sm:text-lg">
            {description}
          </p>
          <p className="font-pixel text-sm uppercase tracking-widest text-dream-text/70">
            New content will be rebuilt next.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex rounded-full border border-dream-text/45 bg-white/70 px-6 py-2.5 font-pixel text-xl text-dream-text transition hover:-translate-y-0.5 hover:bg-dream-blue/35"
            >
              Back Home
            </Link>
          </div>
        </div>
      </WindowFrame>
    </main>
  );
};

export default RoutePlaceholder;
