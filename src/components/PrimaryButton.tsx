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
    inline-flex items-center justify-center gap-3
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
