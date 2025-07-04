import { useRef } from 'react';
import { FaArrowLeft, FaArrowRight, FaDownload,FaHashtag} from 'react-icons/fa';
import { BsFillArrowDownLeftCircleFill} from "react-icons/bs";
import { ReactTyped } from 'react-typed';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  startEvent: 'load',
  easing:'ease-in-out'
});

const certificates = [
  {
    id: 1,
    name: 'Supervised Learning with Scikit Learn',
    imageUrl:
      '../assets/Certificates/1.png',
    description: '',
    organization: 'DataCamp',
    certificateLink: '#',
  },
  {
    id: 2,
    name: 'Intermediate Python',
    imageUrl:
      '../assets/Certificates/2.png',
    description: '',
    organization: 'DataCamp',
    certificateLink: '#',
  },
  {
    id: 3,
    name: 'Data Science in Python',
    imageUrl:
      '../assets/Certificates/3.png',
    description: '',
    organization: 'DataCamp',
    certificateLink: '#',
  },
  {
    id: 4,
    name: 'Java Foundation',
    imageUrl:
      '../assets/Certificates/4.png',
    description: '',
    organization: 'Oracle',
    certificateLink: '#',
  },
  {
    id: 4,
    name: 'AI For Everyone',
    imageUrl:
      '../assets/Certificates/5.png',
    description: '',
    organization: 'DeelLearning.AI',
    certificateLink: '#public/../assets/Certificates/5.png',
  },
  {
    id: 4,
    name: 'UI/UX',
    imageUrl:
      '../assets/Certificates/6.png',
    description: '',
    organization: 'GreatLearning',
    certificateLink: '#',
  },
];

const Certificates = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-4 p-10" id='Certificates'>
      <div className="flex container mx-auto flex flex-col">
        {/* Header */}
        <div className="flex flex-col p-2 md:flex-row h-fit w-full items-center justify-between px-4 py-6">
  {/* Left Section */}
  <div className="flex items-center bg-white border border-gray-300 p-3 rounded-lg bg-gray-50" data-aos="fade-right">
    <FaHashtag size={30} color="#F97316" />
    <div className="ml-3">
      <h3 className="text-sm font-bold text-gray-700">Certificates</h3>
      <p className="text-xs text-gray-500">Total: {certificates.length}</p>
    </div>
  </div>

  {/* Right Section */}
  <div className="relative w-fit h-fit rounded-xl p-3 border bg-gray-50" data-aos="fade-left">
    {/* Arrow pointing bottom-left */}
    <div className="absolute top-[-15px] left-[-15px] hidden md:block">
      <BsFillArrowDownLeftCircleFill size={50} color="#F97316" />
    </div>
    {/* Header Text */}
    <h2 className="text-center md:text-right text-4xl font-extrabold tracking-tight font-poppins text-gray-900 sm:text-5xl">
      <ReactTyped
        strings={["Certificates"]}
        typeSpeed={20}
        backSpeed={20}
        backDelay={5000}
        loop
        cursorChar="*"
      />
    </h2>
    <p className="mt-4 text-sm text-gray-600 text-right">
      Collection of certificates and courses I've taken throughout my career.
    </p>
  </div>
</div>
        {/* Horizontal Scroll Section */}
        <div className="relative border rounded-lg">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition-all"
          >
            <FaArrowLeft size={20} />
          </button>

          {/* Scrollable Container */}
          <div
  ref={scrollRef}
  className="flex gap-6 overflow-x-scroll scroll-smooth overflow-hidden p-4"
>
  {certificates.map((certificate, index) => (
    <div
      key={certificate.id + '-' + index}
      className="bg-white rounded-lg shadow-md w-72 flex-shrink-0 flex flex-col transition-shadow hover:shadow-lg"
      style={{ minHeight: 420 }}
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      {/* Image */}
      <div className="relative w-full h-48">
        <img
          src={certificate.imageUrl}
          alt={certificate.name}
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          {certificate.name}
        </h3>
        {/* Spacer for description if needed */}
        <div className="min-h-[32px] mb-2 flex items-center justify-center">
          <p className="text-sm text-gray-600 text-center">
            {certificate.description || <span>&nbsp;</span>}
          </p>
        </div>
        {/* Issuer always in same spot */}
        <div className="mt-auto mb-4">
          <p className="text-sm text-gray-500 text-center">
            <span className="font-medium text-gray-700">Issued by:</span> {certificate.organization}
          </p>
        </div>
        {/* Button pinned to bottom */}
        <div className="flex justify-center">
          <a
            href={certificate.certificateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-orange-400 transition-all"
          >
            <FaDownload className="mr-2" />
            View Certificate
          </a>
        </div>
      </div>
    </div>
  ))}
          </div>


          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition-all"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
