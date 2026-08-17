import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-scroll";
import { ChevronUp } from "lucide-react";
import { IconContext } from "react-icons";
import ScrollReveal from "./ScrollReveal";
import CursorAura from "./CursorAura";
import HomeParticleBackground from "./HomeParticleBackground";
import { navLinks } from "../data/navLinks";
import { socials } from "../data/socials";

/** The panel is the Contact section itself, so it only links back up the page */
const CONTACT_NAV_LINKS = navLinks.filter((link) => link.id !== "Contact");

const WEB3FORMS_API_KEY = "cf56714b-d5fa-4bbd-99d1-b4f6c89239dc";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Track when timer starts after first successful submission
  const [startTime, setStartTime] = useState<number | null>(null);

  // Flag to track if user submitted once already
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    if (!formRef.current) {
      setResult("Form is not available.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData(formRef.current);

    // Honeypot check: if filled, likely spam
    if (formData.get("website")) {
      setResult("Spam detected.");
      setSubmitting(false);
      return;
    }

    // Only check timer if user submitted once before
    if (hasSubmittedOnce) {
      const now = Date.now();
      if (startTime && now - startTime < 20000) { // 10 seconds wait
        setResult("Please wait before submitting again.");
        setSubmitting(false);
        return;
      }
    }

    formData.append("access_key", WEB3FORMS_API_KEY);

    try {
      const res = await axios.post("https://api.web3forms.com/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;
      if (data.success) {
        setResult("Message sent successfully!");
        formRef.current.reset();

        // If first time submitting, start timer and mark flag
        if (!hasSubmittedOnce) {
          setHasSubmittedOnce(true);
          setStartTime(Date.now());
        } else {
          // Reset timer on subsequent submissions too if you want a rolling wait
          setStartTime(Date.now());
        }
      } else {
        console.error("Submission error:", data);
        setResult("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setResult("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] w-full flex-col overflow-hidden font-poppins"
      aria-label="Contact"
    >
      <HomeParticleBackground containerRef={sectionRef} />
      <CursorAura containerRef={sectionRef} />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-8 sm:px-6 sm:py-10 md:px-10">
        <div className="flex min-h-0 flex-1 flex-col justify-center gap-6">
        <ScrollReveal className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-main-color">
            Contact
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight text-secondary-color">
            Get In Touch <span className="text-main-color">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Considering to be in contact with me regarding a project? Perhaps collaboration? Or
            just about anything?
          </p>

          <IconContext.Provider value={{ size: "22", className: "transition duration-300" }}>
            <div className="mt-6 flex items-center justify-center gap-4 sm:gap-5">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon text-[#494545] dark:text-gray-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </IconContext.Provider>
        </ScrollReveal>

        <ScrollReveal delay={140} className="mx-auto w-full max-w-2xl">
          <form
            className="space-y-4"
            ref={formRef}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full rounded-lg border border-gray-300 bg-white/80 p-3 text-sm shadow-sm backdrop-blur-sm focus:border-main-color focus:outline-none focus:ring-2 focus:ring-main-color dark:border-gray-700 dark:bg-neutral-900/80 dark:text-gray-100"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full rounded-lg border border-gray-300 bg-white/80 p-3 text-sm shadow-sm backdrop-blur-sm focus:border-main-color focus:outline-none focus:ring-2 focus:ring-main-color dark:border-gray-700 dark:bg-neutral-900/80 dark:text-gray-100"
                  placeholder="Your Email Address"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="block w-full rounded-lg border border-gray-300 bg-white/80 p-3 text-sm shadow-sm backdrop-blur-sm focus:border-main-color focus:outline-none focus:ring-2 focus:ring-main-color dark:border-gray-700 dark:bg-neutral-900/80 dark:text-gray-100"
                rows={4}
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <input
              type="text"
              name="website"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="flex flex-col items-center gap-3">
              <button
                type="submit"
                className="cv-btn inline-flex h-11 w-full items-center justify-center rounded-full bg-main-color text-sm font-semibold tracking-wide text-white sm:w-56"
                disabled={submitting}
              >
                <span>{submitting ? "Sending..." : "Send Message"}</span>
              </button>
              {result && <p className="text-center text-sm text-main-color">{result}</p>}
            </div>
          </form>
        </ScrollReveal>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-2xl shrink-0 flex-col items-center gap-4">
          <nav
            aria-label="Back to sections"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm"
          >
            {CONTACT_NAV_LINKS.map(({ label, target }) => (
              <Link
                key={label}
                to={target}
                smooth
                offset={-56}
                duration={600}
                className="cursor-pointer font-medium text-gray-500 transition-colors hover:text-main-color dark:text-gray-400"
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link
            to="Home"
            smooth
            offset={0}
            duration={700}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-main-color hover:text-main-color dark:border-gray-700 dark:text-gray-400"
            aria-label="Back to top"
          >
            <ChevronUp size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
