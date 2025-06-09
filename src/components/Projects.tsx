import { FaGithub, FaEye } from 'react-icons/fa'; // React Icons
import { ReactTyped } from 'react-typed';
import { BsFillArrowDownRightCircleFill,BsFillArrowDownLeftCircleFill} from "react-icons/bs";
import { useRef, useState } from 'react'; // React
import AOS from 'aos';
import 'aos/dist/aos.css';

const projects = [
          {
    id: 11,
    title: 'Reptr- Exercise Tracker',
    href: 'https://github.com/moisesxtian/ExerciseTracker', // Link to the project
    description:
      'This project is an exercise tracker web application called Reptr, implemented using the MERN stack . It features secure login and registration using JSON Web Tokens for authorization. Registered users can track their workouts with the ability to add, edit, and delete workout entries.',
    skills: ['MongoDB','ExpressJS','React','NodeJS','JWT','Mongoose','Tailwind'], // Skills used
    githubLink: 'https://github.com/moisesxtian/cs-chatbot/tree/main',
    liveDemoLink: 'https://github.com/moisesxtian/cs-chatbot/tree/main',
    imageUrl:
      '../assets/Projects/reptr-1.png', // Project image
    hoverImageUrl:
      '../assets/Projects/reptr-2.png', // Project image
  },
        {
    id: 10,
    title: 'Customer Service Chatbot',
    href: 'https://github.com/moisesxtian/cs-chatbot', // Link to the project
    description:
      'This project is a customer service chatbot web app that uses the OpenAI API to provide automated responses to customer inquiries. It is designed to handle inquiries by providing information using RAG (Retrieval-Augmented Generation) techniques, ensuring accurate and relevant answers.',
    skills: ['React','FastAPI','Langchain','RAG','OpenAI','Tailwind','Express'], // Skills used
    githubLink: 'https://github.com/moisesxtian/cs-chatbot/tree/main',
    liveDemoLink: 'https://github.com/moisesxtian/cs-chatbot/tree/main',
    imageUrl:
      '../assets/Projects/chatbot-1.png', // Project image
    hoverImageUrl:
      '../assets/Projects/chatbot-2.png', // Project image
  },
      {
    id: 9,
    title: 'Conduction Sticker Detection',
    href: 'https://github.com/moisesxtian/conduction-extraction', // Link to the project
    description:
      'This project is a conduction sticker detection system that uses YOLOv8 for accurate object detection and FastAPI to serve the model via an API. It processes vehicle images to detect conduction stickers and includes a separate model for car make and model classification.',
    skills: ['Python','YOLOv8','FastAPI','Roboflow','PaddleOCR','numpy','Pillow','CNN'], // Skills used
    githubLink: 'https://github.com/moisesxtian/Web-scraper',
    liveDemoLink: 'https://github.com/moisesxtian/Web-scraper',
    imageUrl:
      '../assets/Projects/conduction-1.png', // Project image
    hoverImageUrl:
      '../assets/Projects/conduction-2.png', // Project image
  },
  {
    id: 8,
    title: 'MIRA: ASL RECOGNITION MOBILE APPLICATION',
    href: '#', // Link to the project
    description:
      'An american sign language application utilizing with static and gesture recognition, speech to-text and text-to speech integration',
    skills: ['Kotlin','Python','MediaPipe','TensorFlow','Sci-kit Learn','Android Studio' ], // Skills used
    githubLink: 'https://github.com/moisesxtian/ASL-Recognition-app',
    liveDemoLink: 'https://drive.google.com/drive/folders/1PwizLoIWeM4PoqLsopeR6ucKD9pHHBVz?usp=sharing',
    imageUrl:
      '../assets/Projects/mira-asl-app-mockup.png', // Project image
    hoverImageUrl:
      '../assets/Projects/m-h.png',
  },
  {
    id: 6,
    title: 'Tails Of Manila: Website',
    href: '#', // Link to the project
    description:
      'A Simple website for Tails of manila, a Pet supplies and groooming store. this website is responsive, with components like shop location and a functional Contact Form ',
    skills: ['CSS','HTML','Javascript','Figma','UI/UX','Web3Forms'], // Skills used
    githubLink: 'https://github.com/moisesxtian/tails-of-manila-website',
    liveDemoLink: 'http://www.tailsofmanila.vercel.app',
    imageUrl:
      '../assets/Projects/Tails of Manila Mock Up.png', // Project image
    hoverImageUrl:
      '../assets/Projects/tom-h.png',
  },
  {
    id: 5,
    title: 'Penguin Rush - Platformer Game',
    href: 'https://hyxcreation.vercel.app', // Link to the project
    description:
      'Developed Penguin Rush, a 2D platformer in Unity and C#, featuring smooth mechanics, intuitive controls, obstacles, collectibles, and power-ups.',
    skills: ['C#', 'Unity','Photoshop'], // Skills used
    githubLink: 'https://github.com/moisesxtian/websiteportfolio',
    liveDemoLink: 'https://drive.google.com/drive/folders/1jUzX2mEZIs-Z3y5UXam2eG72B36NVesL?usp=sharing',
    imageUrl:
      '../assets/Projects/penguin-rush.png', // Project image
    hoverImageUrl:
      '../assets/Projects/pr-mm.png',
    
      
  },
  {
    id: 4,
    title: 'Car Prices Prediction: Model Training',
    href: '', // Link to the project
    description:
      'A simple predictive model using Linear Regression and XGBoost with dataset from Kaggle',
    skills: ['Numpy','Pandas','Python','Linear Regression','XG Boost'], // Skills used
    githubLink: 'https://github.com/moisesxtian/MLNotebook',
    liveDemoLink: 'https://github.com/moisesxtian/MLNotebook',
    imageUrl:
      '../assets/Projects/CarPrice Prediction.png', // Project image
    hoverImageUrl:
      '../assets/Projects/CarPrice Prediction.png', // Project image
  },
  {
    id: 3,
    title: 'Mobtech: Mobile Application UI/UX Prototype',
    href: '', // Link to the project
    description:
      'A Detailed prototype of a Mobile application,for mobile technicians. ',
    skills: ['Figma','Canva','Iconify','Vector','Adobe Creative','Wireframing','Prototyping'], // Skills used
    githubLink: 'https://www.figma.com/design/aUz4m8i074AQ40ZU5WWqWF/MOISES_PORTFOLIO?node-id=0-1&t=pZ3L4mkVbroB2BE1-1',
    liveDemoLink: 'https://www.figma.com/design/aUz4m8i074AQ40ZU5WWqWF/MOISES_PORTFOLIO?node-id=0-1&t=pZ3L4mkVbroB2BE1-1',
    imageUrl:
      '../assets/Projects/mobtech-prototype.png', // Project image
    hoverImageUrl:
      '../assets/Projects/mtp-h.png', // Project image
  },
  {
    id: 2,
    title: 'Calculator mini app',
    href: '', // Link to the project
    description:
      'A Simple calculator app I made way back on 2021 with functions such as Plus, Divide, Minus, Multiply',
    skills: ['C#'], // Skills used
    githubLink: 'https://github.com/moisesxtian/Calculator',
    liveDemoLink: 'https://github.com/moisesxtian/Calculator',
    imageUrl:
      '../assets/Projects/calcoolator.png', // Project image
    hoverImageUrl:
     '../assets/Projects/calcoolator.png', // Project image
  },
  {
    id: 1,
    title: 'Portfolio Website - v1',
    href: 'https://hyxcreation.vercel.app', // Link to the project
    description:
      'A Simple website for Tails of manila, a pet supplies and groooming store. this website is responsive, with components like shop location and a functional contact form ',
    skills: ['HTML/CSS','JavaScript','Figma','Photoshop'], // Skills used
    githubLink: 'https://github.com/moisesxtian/moisesxtian.github.io',
    liveDemoLink: 'https://moisesxtian.github.io',
    imageUrl:
      '../assets/Projects/portfolio-website-v1.png', // Project image
    hoverImageUrl:
      '../assets/Projects/pw-h.png',
  },

];
AOS.init({
  offset:200
});
const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const extraProjectsRef = useRef<HTMLDivElement>(null);


  const handleToggle = () => {
    if (showAll && projectsRef.current) {
      setShowAll(false);
      // Scroll to Projects section after state update
      setTimeout(() => {
        projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // Delay to allow UI to update
    } else {
      setShowAll(true);
      setTimeout(() => {
        extraProjectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300); // Delay to allow UI to update
    }
  };

  return (
    <div className="relative">
      <div
        className="p-5 md:p-10 container mx-auto min-h-screen w-screen font-poppins text-secondary-color grid grid-cols-1 gap-5"
        id="Projects"
        ref={projectsRef}
      >
        
        {/* Title Section */}
        <div
          id="projects-heading"
          className="relative w-fit h-fit text-start rounded-xl p-3 border bg-gray-50"
          data-aos="fade-right"
        >
          <div className="absolute h-fit top-[-15px] right-[-15px] visible md:hidden bort">
            <BsFillArrowDownLeftCircleFill size={50} color="#F97316" />
          </div>
          <div className="absolute h-fit top-[-15px] right-[-15px] hidden md:block">
            <BsFillArrowDownRightCircleFill size={50} color="#F97316" />
          </div>
          <h2 className="w-fit text-4xl font-extrabold tracking-tight font-poppins text-gray-900 sm:text-5xl">
            <ReactTyped
              strings={["Personal Projects"]}
              typeSpeed={20}
              backSpeed={100}
              backDelay={2000}
              cursorChar="*"
            />
          </h2>
          <p className="w-fit mt-4 text-sm text-gray-600" data-aos="fade-right" data-aos-delay="300">
            A showcase of my personal projects highlighting my skills and creativity.
          </p>
        </div>

        {/* Project Cards */}
        <div className="w-full grid gap-5 sm:grid-cols-2 lg:grid-cols-4 p-10 md:p-4 rounded-xl border">
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={project.id}
              className="group relative flex flex-col rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full bg-white"
              data-aos="fade-up"
              data-aos-delay={`${index * 50}`}
              style={{ minHeight: 480 }}
            >
              {/* Image Hover */}
              <div className="relative w-full h-56 flex-shrink-0">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={project.hoverImageUrl}
                  alt={`${project.title} hover`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>

              <div className="flex flex-col flex-1 justify-between p-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-block bg-orange-100 text-orange-500 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition-all"
                  >
                    <FaGithub className="mr-2" />
                    View Repo
                  </a>
                  <a
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-orange-400 transition-all"
                  >
                    <FaEye className="mr-2" />
                    See Live
                  </a>
                </div>
              </div>
            </div>
          ))}
          {showAll &&
            projects.slice(4).map((project, index) => (
              <div
                key={project.id}
                ref={index === 0 ? extraProjectsRef : undefined}
                className="group relative flex flex-col rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full bg-white"
                data-aos="fade-up"
                data-aos-delay={`${(index + 4) * 50}`}
                style={{ minHeight: 480 }}
              >
                {/* Image Hover */}
                <div className="relative w-full h-56 flex-shrink-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={project.hoverImageUrl}
                    alt={`${project.title} hover`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                <div className="flex flex-col flex-1 justify-between p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="inline-block bg-orange-100 text-orange-500 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition-all"
                    >
                      <FaGithub className="mr-2" />
                      View Repo
                    </a>
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-orange-400 transition-all"
                    >
                      <FaEye className="mr-2" />
                      See Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <button
            onClick={handleToggle}
            className="px-6 py-2 text-white bg-orange-500 hover:bg-orange-400 rounded-lg shadow transition-all"
          >
            {showAll ? 'Show Less' : 'See More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
