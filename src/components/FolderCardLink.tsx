import { Link } from "react-router-dom";

interface FolderCardLinkProps {
  to: string;
  label: string;
  previewSrc: string;
  previewAlt: string;
}

const FolderCardLink = ({
  to,
  label,
  previewSrc,
  previewAlt,
}: FolderCardLinkProps) => {
  return (
    <Link
      to={to}
      className="folder-card group relative block w-[170px] sm:w-[220px] md:w-[250px] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03]"
      aria-label={`Open ${label}`}
    >
      <div className="rounded-t-[12px] border border-white/65 border-b-0 bg-white/45 px-3 py-1.5 text-left shadow-sm">
        <span className="font-rounded text-xs text-dream-text/70">Folder</span>
      </div>
      <div className="overflow-hidden rounded-b-[20px] rounded-tr-[20px] border border-white/65 bg-white/30 p-2 shadow-dream blur-backdrop">
        <div className="overflow-hidden rounded-xl border border-white/40 bg-white/55">
          <img
            src={previewSrc}
            alt={previewAlt}
            className="h-[110px] w-full object-cover sm:h-[130px] md:h-[150px]"
            loading="lazy"
          />
        </div>
        <p className="pt-3 text-center font-pixel text-[28px] leading-none tracking-wider text-white drop-shadow-folder">
          {label}
        </p>
      </div>
    </Link>
  );
};

export default FolderCardLink;
