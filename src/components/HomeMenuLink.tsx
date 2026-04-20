import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./HomeMenuLink.scss";

interface HomeMenuLinkProps {
  to: string;
  src: string;
  alt: string;
  isAnchor?: boolean;
}

const HomeMenuLink = ({ to, src, alt, isAnchor }: HomeMenuLinkProps) => {
  const content = (
    <motion.img
      whileHover={{ scale: 1.1, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      src={src}
      alt={alt}
      className="home-menu-link__image"
    />
  );

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      className="home-menu-link"
    >
      {isAnchor ? (
        <a href={to} className="home-menu-link__anchor">
          {content}
        </a>
      ) : (
        <Link to={to} className="home-menu-link__anchor">
          {content}
        </Link>
      )}
    </motion.div>
  );
};

export default HomeMenuLink;
