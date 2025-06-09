import { useRef, useState} from "react";
import axios from "axios";

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
    <div className="container mx-auto p-5 font-poppins" id="Contact">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left section */}
        <div className="flex flex-col gap-5">
          <div className="bg-gray-50 border p-5 rounded-lg shadow-sm">
            <h2 className="text-6xl font-bold text-secondary-color">
              Get In Touch <span className="text-main-color">.</span>
            </h2>
            <p className="text-secondary-color text-sm">
              Considering to be in contact with me regarding a project? Perhaps collaboration? Or just about anything?
            </p>
          </div>
          <div className="flex h-full bg-gray-50 border p-5 rounded-lg shadow-sm">
            <p className="text-secondary-color">
              With hands-on freelancing experience across multiple projects, I have honed my skills in delivering tailored solutions
              that meet client needs. While I don't have formal job experience yet, I'm confident that I have the skills to take on
              any challenging job that matches my interest.
            </p>
          </div>
        </div>

        {/* Right section with the contact form */}
        <div className="bg-gray-50 border p-5 rounded-lg shadow-sm col-span-1 md:col-span-2">
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
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color"
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
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color"
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
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main-color"
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
              className="mt-4 w-full py-3 px-5 bg-main-color text-white font-bold rounded-lg shadow-md hover:bg-main-color-dark focus:outline-none focus:ring-2 focus:ring-main-color"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
            {result && (
              <div className="mt-2 text-center text-sm text-main-color">{result}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardsLayout;
