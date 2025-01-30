

const CardsLayout = () => {
  return (
<div className="container mx-auto p-5 font-poppins">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    {/* Left section with 2 vertical cards */}
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

    {/* Right section with the contact form card */}
    <div className="bg-gray-50 border p-5 rounded-lg shadow-sm col-span-1 md:col-span-2">
      <h2 className="text-xl font-bold text-secondary-color">Contact Me</h2>
      <form className="space-y-4">
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
            rows={5} // This should be a number, not a string
            placeholder="Your Message"
            required
          ></textarea>

        </div>
        <button
          type="submit"
          className="mt-4 w-full py-3 px-5 bg-main-color text-white font-bold rounded-lg shadow-md hover:bg-main-color-dark focus:outline-none focus:ring-2 focus:ring-main-color"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</div>

  );
};

export default CardsLayout;
