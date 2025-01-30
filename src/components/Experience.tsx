import { BsFillArrowDownLeftCircleFill, BsFillArrowDownRightCircleFill} from "react-icons/bs";
import { ReactTyped } from 'react-typed';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  startEvent: 'load',
  easing:'ease-in-out',
});

export default function Experience() {
    return (
      <div className="container mx-auto my-auto flex flex-col justify-center items-center md:items-start p-10 font-poppins  text-gray-800" id="Experience">
            <div className="relative w-fit h-fit text-start  rounded-xl p-5 md:pr-16 border bg-gray-50" data-aos="fade-right">
            <div className="absolute h-fit top-[-15px] right-[-15px] hidden">
                <BsFillArrowDownLeftCircleFill size={50} color="#F97316" />
            </div>
            <div className="absolute h-fit top-[-15px] right-[-15px] hidden md:block">
                <BsFillArrowDownRightCircleFill size={50} color="#F97316" />
            </div>
            <h2 className="w-fit text-4xl font-extrabold tracking-tight font-poppins text-gray-900 sm:text-5xl">
                <ReactTyped
                strings={["Other Experience"]}
                typeSpeed={20}
                backSpeed={100}
                backDelay={2000}
                cursorChar="*"
                />
            </h2>
            <p className="w-fit mt-4 text-sm text-gray-600" data-aos="fade-right" data-aos-delay="300">
                Some relevant experience throughout my career.
            </p>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className=" p-6 rounded-lg shadow-sm bg-gray-50 border hover:scale-105 transition" data-aos="flip-left"
          data-aos-offset="200" data-aos-duration="1000">
            <h2 className="text-xl font-bold mb-2">Tails of Manila</h2>
            <p className="text-sm text-gray-600 mb-4">September 2023 - Present</p>
            <p className="text-sm text-gray-600 mb-4">Social Media Manager</p>
            <h3 className="font-semibold mb-2">Duties & Responsibilities</h3>
            <ul className="list-disc pl-5 text-sm">
              <li>Applied skills in Data analysis, Visualization to drive targeted marketing campaigns to increase online visibility</li>
              <li>Design, Develop and schedules engaging content (posts, images, videos) to maintain the brand’s online presence.</li>
              <li>Monitors comments, messages, and trends to interact with followers, answer inquiries, and manage brand reputation.</li>
            </ul>
          </div>
  
          <div className="p-6 rounded-lg shadow-sm bg-gray-50 border hover:scale-105 transition" 
          data-aos="flip-right"
          data-aos-offset="200" data-aos-duration="1000">
            <h2 className="text-xl font-bold mb-2">Fiverr</h2>
            <p className="text-sm text-gray-600 mb-4">January 2019 - Present</p>
            <p className="text-sm text-gray-600 mb-4">Freelance Multimedia Editor</p>
            <h3 className="font-semibold mb-2">Duties & Responsibilities</h3>
            <ul className="list-disc pl-5 text-sm">
              <li>Collaborate with clients to analyze multimedia data, optimize content performance.</li>
              <li>Design, Create and illustrate Graphic illustrations and create Vector designs using tools from Adobe Creative Suite.</li>
              <li>Achieved "Level 2" badge on Fiverr for exceptional freelance performance.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }