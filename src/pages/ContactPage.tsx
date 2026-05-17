import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactElement } from "react";
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

type SubmitStatus = "idle" | "submitting" | "success";

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
  const prefersReducedMotion = useReducedMotion();
  const windowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(windowRef, { once: true, amount: 0.2 });

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const isAnimated = isInView || prefersReducedMotion;
  const motionState = isAnimated ? "visible" : "hidden";

  useEffect(() => {
    if (status !== "success") return;
    const timer = window.setTimeout(() => {
      setName("");
      setMessage("");
      setStatus("idle");
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setError("Please fill in your name and message.");
      return;
    }

    setError("");
    setStatus("submitting");

    window.setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  const sendLabel =
    status === "submitting"
      ? "Sending..."
      : status === "success"
        ? "Sent!"
        : "Send";

  return (
    <main className="contact-page">
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

            <motion.form
              className="contact-page__form"
              onSubmit={handleSubmit}
              noValidate
              variants={prefersReducedMotion ? undefined : staggerItem}
            >
              <motion.div
                className="contact-page__field"
                variants={prefersReducedMotion ? undefined : staggerItem}
              >
                <label className="contact-page__label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  className="contact-page__input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "submitting"}
                  autoComplete="name"
                />
              </motion.div>

              <motion.div
                className="contact-page__field"
                variants={prefersReducedMotion ? undefined : staggerItem}
              >
                <label
                  className="contact-page__label"
                  htmlFor="contact-message"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  className="contact-page__textarea"
                  name="message"
                  placeholder="Leave me a message...."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === "submitting"}
                  rows={3}
                />
              </motion.div>

              <motion.div
                className="contact-page__form-actions"
                variants={prefersReducedMotion ? undefined : staggerItem}
              >
                {error && (
                  <p className="contact-page__error-msg" role="alert">
                    {error}
                  </p>
                )}
                {status === "success" && (
                  <p className="contact-page__success-msg" role="status">
                    Message sent! Thank you for reaching out.
                  </p>
                )}
                <motion.button
                  type="submit"
                  className={`contact-page__send${status === "success" ? " contact-page__send--success" : ""}`}
                  disabled={status === "submitting"}
                  whileHover={
                    prefersReducedMotion || status === "submitting"
                      ? undefined
                      : { scale: 1.04 }
                  }
                  whileTap={
                    prefersReducedMotion || status === "submitting"
                      ? undefined
                      : { scale: 0.96 }
                  }
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {status === "submitting" && (
                    <span className="contact-page__spinner" aria-hidden="true" />
                  )}
                  {sendLabel}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default ContactPage;
