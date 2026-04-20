import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./FolderCardLink.scss";

interface FolderCardLinkProps {
  to: string;
  label: string;
  previewSrc: string;
  previewAlt: string;
  themeColor?: string;
}

const FolderCardLink = ({
  to,
  label,
  previewSrc,
  previewAlt,
  themeColor = "#0081FF",
}: FolderCardLinkProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const flapGradient = useMemo(
    () =>
      `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${themeColor} 180%)`,
    [themeColor],
  );

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      className="folder-card__wrapper"
    >
      <Link to={to} className="folder-card" aria-label={`Open ${label}`}>
        {/* Preview Card (Pops out) */}
        <motion.div
          initial={{ y: 40, scale: 0.94, opacity: 0 }}
          whileHover={{ y: -100, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="folder-card__preview"
        >
          {/* Window Header */}
          <div className="folder-card__preview-header">
            <div className="folder-card__preview-dots">
              <span className="folder-card__preview-dots-dot folder-card__preview-dots-dot--red" />
              <span className="folder-card__preview-dots-dot folder-card__preview-dots-dot--yellow" />
              <span className="folder-card__preview-dots-dot folder-card__preview-dots-dot--green" />
            </div>
            <span className="folder-card__preview-label">{label}_PORT.JPG</span>
          </div>
          {/* Preview Image */}
          <div className="folder-card__preview-image-container">
            {!hasImageError && (
              <img
                src={previewSrc}
                alt={previewAlt}
                className="folder-card__preview-image"
                loading="lazy"
                onError={() => setHasImageError(true)}
              />
            )}
          </div>
        </motion.div>

        {/* Folder Construction */}
        <div className="folder-card__construction">
          {/* Folder Body */}
          <motion.div
            whileHover={{ scale: 0.99, opacity: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="folder-card__construction__body"
          >
            {/* Gloss Reflection */}
            <div className="folder-card__reflection" />

            {/* Inner Flap/Gradient */}
            <div
              className="folder-card__flap"
              style={{ background: flapGradient }}
            />

            {/* Folder Label */}
            <p className="folder-card__label">{label}</p>
          </motion.div>
        </div>
      </Link>

      {/* SVG Clip Path Definition */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="folder-clip-path" clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.0042918455, 0.0051813472)"
              d="M117.943 20.1167C119.325 24.7917 123.618 28 128.493 28H222C228.075 28 233 32.9249 233 39V182C233 188.075 228.075 193 222 193H11C4.92486 193 0 188.075 0 182V11C0 4.92486 4.92487 0 11 0H103.78C108.655 0 112.948 3.20833 114.329 7.88328L117.943 20.1167Z"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export default FolderCardLink;
