import { useRef, useState} from "react";
import axios from "axios";
import ScrollReveal from "./ScrollReveal";

const WEB3FORMS_API_KEY = "cf56714b-d5fa-4bbd-99d1-b4f6c89239dc";

const CardsLayout = () => {
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
    <section className="section-page section-cut font-poppins" id="Contact">
      <div className="section-page-inner">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left section */}
        <ScrollReveal className="flex flex-col gap-5">
          <div className="bg-gray-50 border border-gray-200 p-4 sm:p-5 rounded-lg shadow-sm dark:border-gray-700 dark:bg-neutral-900">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-color leading-tight">
              Get In Touch <span className="text-main-color">.</span>
            </h2>
            <p className="text-secondary-color text-sm mt-2 dark:text-gray-400">
              Considering to be in contact with me regarding a project? Perhaps collaboration? Or just about anything?
            </p>
          </div>
          <div className="flex h-full bg-gray-50 border border-gray-200 p-4 sm:p-5 rounded-lg shadow-sm dark:border-gray-700 dark:bg-neutral-900">
            <p className="text-secondary-color text-sm sm:text-base dark:text-gray-400">
              I grew up naturally lazy. I always try to do the least amount of work possible to get the job done. And now, I do it for a living. Send me a message let's chat for ways I can make your process automated using the skillset I have developed over the years as an AI Developer.
            </p>
          </div>
        </ScrollReveal>

        {/* Right section with the contact form */}
        <ScrollReveal delay={140} className="bg-gray-50 border border-gray-200 p-4 sm:p-5 rounded-lg shadow-sm col-span-1 md:col-span-2 dark:border-gray-700 dark:bg-neutral-900">
          <h2 className="text-xl font-bold text-secondary-color">Contact Me</h2>
          <form
            className="space-y-4"
            ref={formRef}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-color">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color bg-white dark:border-gray-600 dark:bg-neutral-950 dark:text-gray-100"
                placeholder="Your Full Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-color">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color bg-white dark:border-gray-600 dark:bg-neutral-950 dark:text-gray-100"
                placeholder="Your Email Address"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary-color">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color bg-white dark:border-gray-600 dark:bg-neutral-950 dark:text-gray-100"
                rows={5}
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

            <button
              type="submit"
              className="mt-4 w-full py-3 px-5 bg-main-color text-white font-bold rounded-lg shadow-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-main-color"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
            {result && (
              <div className="mt-2 text-center text-sm text-main-color">{result}</div>
            )}
          </form>
        </ScrollReveal>
      </div>
      </div>
    </section>
  );
};

export default CardsLayout;
