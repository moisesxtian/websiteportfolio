import { FaGithub, FaEye } from 'react-icons/fa'; // React Icons
import { ReactTyped } from 'react-typed';
import { BsFillArrowDownRightCircleFill,BsFillArrowDownLeftCircleFill} from "react-icons/bs";
import AOS from 'aos';
import 'aos/dist/aos.css';

const projects = [
  {
    id: 1,
    title: 'MIRA: ASL RECOGNITION MOBILE APPLICATION',
    href: '#', // Link to the project
    description:
      'An american sign language application utilizing with static and gesture recognition, speech to-text and text-to speech integration',
    skills: ['Kotlin','Python','MediaPipe','TensorFlow','Sci-kit Learn','Android Studio' ], // Skills used
    githubLink: 'https://github.com/moisesxtian/ASL-Recognition-app',
    liveDemoLink: 'https://drive.google.com/file/d/1jOWUbYa4FnnYM6ctXErhlphfiPWMaafw/view?fbclid=IwY2xjawIAXr9leHRuA2FlbQIxMAABHfUAq4zVjwElscbfOqkq7F-XFKi8J3fF1oDovANOJMWCmCOlTa2KmgIOig_aem_33AdnvpKOFDGWrMBGt1bFg',
    imageUrl:
      '../assets/Projects/mira-asl-app-mockup.png', // Project image
    hoverImageUrl:
      '../assets/Projects/m-h.png',
  },
  {
    id: 2,
    title: 'Sign Language Recognition: Model Training',
    href: '', // Link to the project
    description:
      'Model training for the static gestures of alphabets and additional words (ERASE, SPACE, COMMA, DOT). This model has an accuracy of 97%',
    skills: ['Python','pip','Mediapipe','OpenCV','TensorFlow','Pandas','Numpy','sklearn',], // Skills used
    githubLink: 'https://github.com/moisesxtian/MLNotebook',
    liveDemoLink: 'https://github.com/moisesxtian/MLNotebook',
    imageUrl:
      '../assets/Projects/asl prediction.png', // Project image
    hoverImageUrl:
      '../assets/Projects/asl prediction.png', // Project image
  },
  {
    id: 3,
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
    id: 4,
    title: 'Portfolio Website - v1',
    href: 'https://hyxcreation.vercel.app', // Link to the project
    description:
      'A Simple website for Tails of manila, a pet supplies and groooming store. this website is responsive, with components like shop location and a functional contact form ',
    skills: ['HTML/CSS','JavaScript','Figma','Photoshop'], // Skills used
    githubLink: 'https://github.com/moisesxtian/websiteportfolio',
    liveDemoLink: 'https://hyxcreation.vercel.app',
    imageUrl:
      '../assets/Projects/portfolio-website-v1.png', // Project image
    hoverImageUrl:
      '../assets/Projects/pw-h.png',
  },
  {
    id: 5,
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
    id: 6,
    title: 'Mobtech: Mobile Application UI/UX Prototype',
    href: '', // Link to the project
    description:
      'A Detailed prototype of a Mobile application,for mobile technicians. ',
    skills: ['Figma','Canva','Iconify','Vector','Adobe Creative','Wireframing','Prototyping'], // Skills used
    githubLink: 'https://github.com/moisesxtian/MLNotebook',
    liveDemoLink: 'https://github.com/moisesxtian/MLNotebook',
    imageUrl:
      '../assets/Projects/mobtech-prototype.png', // Project image
    hoverImageUrl:
      '../assets/Projects/mtp-h.png', // Project image
  },
  {
    id: 7,
    title: 'Calculator mini app',
    href: '', // Link to the project
    description:
      'A Simple calculator app I made way back on 2021 with functions such as Plus, Divide, Minus, Multiply',
    skills: ['C#'], // Skills used
    githubLink: 'https://github.com/moisesxtian/MLNotebook',
    liveDemoLink: 'https://github.com/moisesxtian/MLNotebook',
    imageUrl:
      '../assets/Projects/calcoolator.png', // Project image
    hoverImageUrl:
     '../assets/Projects/calcoolator.png', // Project image
  },

];
AOS.init({
  offset:200
});
const Projects = () => {

  return (
    <div className="relative">
  <div className="p-20 md:p-10 container mx-auto min-h-screen w-screen font-poppins text-secondary-color grid grid-cols-1 gap-5" id='Projects'>
    {/* Personal Projects Container */}
    <div className="relative w-fit h-fit text-start  rounded-xl p-3 border bg-gray-50"data-aos="fade-right">
      <div className="absolute h-fit top-[-15px] right-[-15px] visible md:hidden bort">
        <BsFillArrowDownLeftCircleFill size={50} color="#F97316" />
      </div>
      <div className="absolute h-fit top-[-15px] right-[-15px] hidden md:block">
        <BsFillArrowDownRightCircleFill size={50} color="#F97316" />
      </div>
      <h2 className="w-fit text-4xl font-extrabold tracking-tight font-poppins text-gray-900 sm:text-5xl  ">
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

    {/* Projects Grid */}
    <div className="w-full grid gap-5 sm:grid-cols-2 lg:grid-cols-4 p-10 md:p-4 rounded-xl border">
  {projects.map((project, index) => (
    <div
      key={project.id}
      className="group relative rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      data-aos="fade-up"
      data-aos-delay={`${index * 50}`} // Staggered delay: 0ms, 100ms, 200ms...
    >
      {/* Image with hover effect */}
      <div className="relative w-full h-56">
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

      <div className="p-6">
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
        <div className="mt-6 flex items-center gap-4">
          {/* GitHub Button */}
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition-all"
          >
            <FaGithub className="mr-2" />
            View Repo
          </a>
          {/* Live Demo Button */}
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

  </div>


    </div>
  );
};

export default Projects;
