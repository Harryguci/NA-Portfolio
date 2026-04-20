import "./WindowHeader.scss";

interface WindowHeaderProps {
  title: string;
}

const WindowHeader = ({ title }: WindowHeaderProps) => {
  return (
    <header className="window-header">
      <div className="window-header__dots">
        <span className="dot dot--pink"></span>
        <span className="dot dot--yellow"></span>
        <span className="dot dot--blue"></span>
      </div>
      <h2 className="window-header__title">{title}</h2>
    </header>
  );
};

export default WindowHeader;
