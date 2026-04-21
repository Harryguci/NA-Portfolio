import { Link } from "react-router-dom";
import "./WindowHeader.scss";

interface WindowHeaderProps {
  title: string;
}

const WindowHeader = ({ title }: WindowHeaderProps) => {
  return (
    <header className="window-header">
      <div className="window-header__left">
        <div className="window-header__dots">
          <span className="dot dot--blue"></span>
          <span className="dot dot--pink"></span>
          <span className="dot dot--yellow"></span>
        </div>
        <h2 className="window-header__title">{title}</h2>
      </div>

      <nav className="window-header__nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="#works" className="nav-link">
          Works
        </Link>
        <Link to="#contact" className="nav-link">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default WindowHeader;
