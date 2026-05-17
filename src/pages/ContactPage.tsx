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
  <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.23167 18.54C1.61796 18.54 1.09259 18.3131 0.655552 17.8592C0.218517 17.4054 0 16.8598 0 16.2225V2.3175C0 1.68019 0.218517 1.13461 0.655552 0.680766C1.09259 0.226922 1.61796 0 2.23167 0H20.085C20.6987 0 21.2241 0.226922 21.6611 0.680766C22.0981 1.13461 22.3167 1.68019 22.3167 2.3175V16.2225C22.3167 16.8598 22.0981 17.4054 21.6611 17.8592C21.2241 18.3131 20.6987 18.54 20.085 18.54H2.23167ZM11.1583 10.4287L2.23167 4.635V16.2225H20.085V4.635L11.1583 10.4287ZM11.1583 8.11125L20.085 2.3175H2.23167L11.1583 8.11125ZM2.23167 4.635V2.3175V16.2225V4.635Z" fill="#FF90D0" />
  </svg>

);

const IconPhone = () => (
  <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.7719 16.0149V18.9761C21.773 19.251 21.7143 19.5231 21.5994 19.775C21.4844 20.0269 21.3159 20.253 21.1045 20.4389C20.8931 20.6247 20.6436 20.7662 20.3718 20.8543C20.1001 20.9423 19.8122 20.975 19.5265 20.9503C16.357 20.6203 13.3125 19.5823 10.6376 17.92C8.14891 16.4045 6.03897 14.3824 4.45757 11.9975C2.71685 9.42236 1.63356 6.49051 1.29547 3.43944C1.26973 3.16648 1.30358 2.89138 1.39486 2.63164C1.48615 2.3719 1.63287 2.13323 1.82568 1.93081C2.01849 1.72839 2.25317 1.56666 2.51477 1.45592C2.77638 1.34518 3.05918 1.28786 3.34517 1.2876H6.43517C6.93504 1.28289 7.41964 1.45252 7.79864 1.76489C8.17765 2.07726 8.42521 2.51104 8.49517 2.98538C8.62559 3.93305 8.86746 4.86353 9.21617 5.75909C9.35475 6.11239 9.38474 6.49636 9.30259 6.86549C9.22044 7.23463 9.0296 7.57346 8.75267 7.84183L7.44457 9.09543C8.91083 11.5666 11.0459 13.6128 13.6246 15.0179L14.9327 13.7643C15.2127 13.4989 15.5663 13.316 15.9515 13.2373C16.3366 13.1586 16.7373 13.1873 17.106 13.3201C18.0405 13.6543 19.0114 13.8861 20.0003 14.0111C20.5006 14.0788 20.9576 14.3203 21.2842 14.6897C21.6108 15.0592 21.7844 15.5308 21.7719 16.0149Z" stroke="#FF90D0" stroke-width="2.575" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const IconGlobe = () => (
  <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.23167 18.54C1.61796 18.54 1.09259 18.3131 0.655552 17.8592C0.218517 17.4054 0 16.8598 0 16.2225V2.3175C0 1.68019 0.218517 1.13461 0.655552 0.680766C1.09259 0.226922 1.61796 0 2.23167 0H20.085C20.6987 0 21.2241 0.226922 21.6611 0.680766C22.0981 1.13461 22.3167 1.68019 22.3167 2.3175V16.2225C22.3167 16.8598 22.0981 17.4054 21.6611 17.8592C21.2241 18.3131 20.6987 18.54 20.085 18.54H2.23167ZM11.1583 10.4287L2.23167 4.635V16.2225H20.085V4.635L11.1583 10.4287ZM11.1583 8.11125L20.085 2.3175H2.23167L11.1583 8.11125ZM2.23167 4.635V2.3175V16.2225V4.635Z" fill="#FF90D0" />
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
