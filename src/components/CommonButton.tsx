import { Link } from "react-router-dom";
import "./CommonButton.scss";

interface CommonButtonProps {
  text: string;
  to: string;
  className?: string;
}

const CommonButton = ({ text, to, className = "" }: CommonButtonProps) => {
  return (
    <Link to={to} className={`common-button ${className}`}>
      <span className="common-button__text">{text}</span>
      <span className="common-button__arrow">→</span>
    </Link>
  );
};

export default CommonButton;
