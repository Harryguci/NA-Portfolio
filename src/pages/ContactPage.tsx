import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import backgroundContact from "../assets/background_contact.png";
import typoContact from "../assets/typo_contact.png";
import "./ContactPage.scss";

const BEHANCE_URL = "https://www.behance.net/phanthngcanh";

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScOMBb_mkZH0RRDmjkhJBPgg5RYDbt941RkwvG0AkiWQv-mjA/formResponse";

const GOOGLE_FORM_VIEW =
  "https://docs.google.com/forms/d/e/1FAIpQLScOMBb_mkZH0RRDmjkhJBPgg5RYDbt941RkwvG0AkiWQv-mjA/viewform";

const GOOGLE_FORM_ENTRIES = {
  name: "entry.2005620554",
  message: "entry.839337160",
} as const;

const parseFbzx = (html: string) =>
  html.match(/name="fbzx" value="(-?\d+)"/)?.[1] ?? "";

const fetchFbzx = async () => {
  try {
    const html = await fetch(GOOGLE_FORM_VIEW).then((response) => response.text());
    return parseFbzx(html);
  } catch {
    return "";
  }
};

const postToGoogleForm = (
  trimmedName: string,
  trimmedMessage: string,
  fbzx: string,
) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = GOOGLE_FORM_ACTION;
  form.acceptCharset = "UTF-8";

  const fields: Record<string, string> = {
    [GOOGLE_FORM_ENTRIES.name]: trimmedName,
    [GOOGLE_FORM_ENTRIES.message]: trimmedMessage,
    fvv: "1",
    pageHistory: "0",
  };

  if (fbzx) {
    fields.fbzx = fbzx;
    fields.partialResponse = `[null,null,"${fbzx}"]`;
  }

  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = fieldName;
    input.value = fieldValue;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
};

const CONTACT_INFO = [
  {
    id: "email",
    href: "mailto:ptngocanh286@gmail.com",
    label: "Email",
    text: "ptngocanh286@gmail.com",
    isExternal: false,
  },
  {
    id: "phone",
    href: "tel:+84338605933",
    label: "Phone",
    text: "0338-605-933",
    isExternal: false,
  },
  {
    id: "behance",
    href: BEHANCE_URL,
    label: "Behance portfolio",
    text: "Behance: Ngọc Anh",
    isExternal: true,
  },
] as const;

const windowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const backHomeVariants: Variants = {
  hidden: { opacity: 0, x: -20, scale: 0.88 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 22, delay: 0.4 },
  },
};

const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M11 4L6 9L11 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconEnvelope = () => (
  <svg width="26" height="21" viewBox="0 0 22 18" fill="none" aria-hidden="true">
    <rect
      x="1"
      y="1"
      width="20"
      height="16"
      rx="2"
      stroke="#FFB7CE"
      strokeWidth="2"
    />
    <path
      d="M1 4L11 11L21 4"
      stroke="#FFB7CE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPhone = () => (
  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M5.5 2.5C5.2 2.5 5 2.7 5 3v1.2c0 .2.1.4.3.5l1.8 1.1c.2.1.2.4.1.6l-.9 1.6c-.1.2 0 .5.2.6 2.1 1.4 4.5 3.8 5.9 5.9.1.2.4.3.6.2l1.6-.9c.2-.1.5-.1.6.1l1.1 1.8c.1.2.3.3.5.3H17c.3 0 .5-.2.5-.5v-1.5c0-5.2-4.3-9.5-9.5-9.5H5.5z"
      stroke="#FFB7CE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconGlobe = () => (
  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.5" stroke="#FFB7CE" strokeWidth="2" />
    <ellipse cx="10" cy="10" rx="4" ry="8.5" stroke="#FFB7CE" strokeWidth="2" />
    <path d="M1.5 10H18.5" stroke="#FFB7CE" strokeWidth="2" />
    <path d="M3 6H17M3 14H17" stroke="#FFB7CE" strokeWidth="1.5" />
  </svg>
);

const infoIcons: Record<string, () => ReactElement> = {
  email: IconEnvelope,
  phone: IconPhone,
  behance: IconGlobe,
};

const ContactPage = () => {
  const { pathname } = useLocation();
  const isStandaloneRoute = pathname === "/contact";
  const prefersReducedMotion = useReducedMotion();
  const windowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(windowRef, { once: true, amount: 0.2 });

  const [error, setError] = useState("");
  const [fbzx, setFbzx] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAnimated = isInView || prefersReducedMotion;
  const motionState = isAnimated ? "visible" : "hidden";

  useEffect(() => {
    fetchFbzx().then(setFbzx);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem(
      GOOGLE_FORM_ENTRIES.name,
    ) as HTMLInputElement | null;
    const messageInput = form.elements.namedItem(
      GOOGLE_FORM_ENTRIES.message,
    ) as HTMLTextAreaElement | null;

    const trimmedName = nameInput?.value.trim() ?? "";
    const trimmedMessage = messageInput?.value.trim() ?? "";

    if (!trimmedName || !trimmedMessage) {
      setError("Please fill in your name and message.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const token = fbzx || (await fetchFbzx());
    window.alert(`Message sent! Thank you, ${trimmedName}.`);
    postToGoogleForm(trimmedName, trimmedMessage, token);
  };

  return (
    <main className="contact-page">
      {isStandaloneRoute && (
        <motion.div
          className="contact-page__back-home-wrap"
          variants={prefersReducedMotion ? undefined : backHomeVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
        >
          <motion.div
            className="contact-page__back-home-float"
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -5, 0] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <Link to="/" className="contact-page__back-home">
              <IconArrowLeft />
              <span>Back home</span>
            </Link>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="contact-page__background"
        style={{ backgroundImage: `url(${backgroundContact})` }}
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        ref={windowRef}
        className="contact-page__window"
        variants={prefersReducedMotion ? undefined : windowVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={prefersReducedMotion ? undefined : motionState}
      >
        <header className="contact-page__header">
          <motion.div
            className="contact-page__dots"
            variants={prefersReducedMotion ? undefined : staggerItem}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? undefined : motionState}
          >
            <span className="contact-page__dot contact-page__dot--blue" />
            <span className="contact-page__dot contact-page__dot--pink" />
            <span className="contact-page__dot contact-page__dot--white" />
          </motion.div>
          <motion.h1
            className="contact-page__title"
            variants={prefersReducedMotion ? undefined : staggerItem}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? undefined : motionState}
          >
            Contact.folder
          </motion.h1>
        </header>

        <div className="contact-page__body">
          <div className="contact-page__hero">
            <img
              src={typoContact}
              alt="Thank you! Let's get in touch"
              className="contact-page__typo"
              width={1734}
              height={444}
              loading="eager"
              decoding="async"
            />
          </div>

          <motion.div
            className="contact-page__grid"
            variants={prefersReducedMotion ? undefined : staggerContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? undefined : motionState}
          >
            <motion.div
              className="contact-page__info"
              variants={prefersReducedMotion ? undefined : staggerItem}
            >
              {CONTACT_INFO.map((item) => {
                const Icon = infoIcons[item.id];
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    className={`contact-page__info-row${item.id === "behance" ? " contact-page__info-row--link" : ""}`}
                    aria-label={item.label}
                    {...(item.isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    variants={prefersReducedMotion ? undefined : staggerItem}
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="contact-page__info-icon">
                      <Icon />
                    </span>
                    <span className="contact-page__info-text">{item.text}</span>
                  </motion.a>
                );
              })}
            </motion.div>

            <motion.div
              className="contact-page__form"
              variants={prefersReducedMotion ? undefined : staggerItem}
            >
              <form
                className="contact-page__form-inner"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="contact-page__field">
                  <label className="contact-page__label" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    className="contact-page__input"
                    type="text"
                    name={GOOGLE_FORM_ENTRIES.name}
                    placeholder="Name"
                    defaultValue=""
                    onInput={() => setError("")}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="contact-page__field">
                  <label
                    className="contact-page__label"
                    htmlFor="contact-message"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="contact-page__textarea"
                    name={GOOGLE_FORM_ENTRIES.message}
                    placeholder="Leave me a message...."
                    defaultValue=""
                    onInput={() => setError("")}
                    rows={3}
                    required
                  />
                </div>

                <motion.div
                  className="contact-page__form-actions"
                  variants={prefersReducedMotion ? undefined : staggerItem}
                >
                  {error && (
                    <p className="contact-page__error-msg" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="contact-page__send"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default ContactPage;
