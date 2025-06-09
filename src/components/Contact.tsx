import { useRef, useState, useEffect } from "react";
import axios from "axios";

// Access environment variables
const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY;
const WEB3FORMS_API_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const CardsLayout = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Load hCaptcha script only once
  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).hcaptchaScriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://js.hcaptcha.com/1/api.js";
      script.async = true;
      document.body.appendChild(script);
      (window as any).hcaptchaScriptLoaded = true;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    // Ensure the API key is available
    if (!WEB3FORMS_API_KEY) {
      setResult({ type: 'error', message: "Form submission is not configured. Missing API Key." });
      setSubmitting(false);
      return;
    }

    const formData = new FormData(formRef.current!);
    const hcaptchaToken = (window as any).hcaptcha?.getResponse();

    if (!hcaptchaToken) {
      setResult({ type: 'error', message: "Please complete the hCaptcha." });
      setSubmitting(false);
      return;
    }

    // Append necessary data
    formData.append("h-captcha-response", hcaptchaToken);
    formData.append("access_key", WEB3FORMS_API_KEY);

    // Convert FormData to a plain object for reliable JSON submission
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    try {
      const res = await axios.post("https://api.web3forms.com/submit", json, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      const data = res.data;

      if (data.success) {
        setResult({ type: 'success', message: "Message sent successfully!" });
        formRef.current?.reset();
        (window as any).hcaptcha?.reset();
      } else {
        console.error("Web3Forms Error:", data);
        setResult({ type: 'error', message: data.message || "Something went wrong. Please try again." });
      }
    } catch (err) {
      console.error("Network error:", err);
      if (axios.isAxiosError(err) && err.response) {
        // Log the detailed error from the server
        console.error("Server Response:", err.response.data);
        setResult({ type: 'error', message: err.response.data.message || "A server error occurred." });
      } else {
        setResult({ type: 'error', message: "Something went wrong. Please try again." });
      }
    }

    setSubmitting(false);
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

        {/* Right section with contact form */}
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
            {/* hCaptcha */}
            <div className="mt-2">
              <div
                className="h-captcha"
                data-sitekey={HCAPTCHA_SITEKEY}
                data-theme="light"
              ></div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-3 px-5 bg-main-color text-white font-bold rounded-lg shadow-md hover:bg-main-color-dark focus:outline-none focus:ring-2 focus:ring-main-color"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
            {result && (
              <div
                className={`mt-2 text-center text-sm ${
                  result.type === 'success' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {result.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardsLayout;