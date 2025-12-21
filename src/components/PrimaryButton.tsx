import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  title?: string;
  ariaLabel?: string;
  showArrow?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  href,
  className = "",
  title,
  ariaLabel,
  showArrow = false,
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-1 md:gap-3
    px-8 py-4 md:px-12 md:py-6
    font-medium
    text-[#464021]
    bg-primary-reverse
    border-[1px] border-[#464021]
    rounded-full
    transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-lg
    focus:outline-none focus:ring-4 focus:ring-[#464021]/30
    active:scale-95
    cursor-pointer
  `;

  const content = (
    <>
      {children}
      {showArrow && (
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className} group`}
        title={title || ariaLabel}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${className} group`}
      title={title || ariaLabel}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};

export default PrimaryButton;
