import { BsFillArrowDownLeftCircleFill, BsFillArrowDownRightCircleFill } from "react-icons/bs";
import { ReactTyped } from 'react-typed';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  startEvent: 'load',
  easing: 'ease-in',
});

type ExperienceItemProps = {
  company: string;
  period: string;
  role: string;
  duties: string[];
  aos?: string;
};

function ExperienceItem({ company, period, role, duties, aos }: ExperienceItemProps) {
  return (
    <div
      className="p-6 rounded-lg shadow-sm bg-gray-50 border hover:scale-105 transition flex flex-col gap-4"
      data-aos={aos || "fade-up"}
    >
      {/* Top row: 2 columns */}
      <div className="grid grid-cols-2 items-start gap-2">
        {/* Company on left */}
        <h2 className="text-xl font-bold border-b border-orange-300 pb-1 text-left">
          {company}
        </h2>
        {/* Period and Role on right */}
        <div className="text-right">
          <p className="text-sm text-gray-600">{period}</p>
          <p className="text-sm text-gray-600 italic">{role}</p>
        </div>
      </div>

      {/* Duties section */}
      <div>
        <h3 className="font-semibold mb-2">Duties & Responsibilities</h3>
        <ul className="list-disc pl-5 text-sm flex flex-col gap-2">
          {duties.map((duty, idx) => (
            <li key={idx} className="leading-relaxed">{duty}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const experiences = [
    {
      company: "SP Madrid & Associates",
      period: "February 2025 - April 2025",
      role: "AI/ML Intern",
      duties: [
        "Developed and deployed machine learning models for tasks such as conduction sticker text detection and vehicle classification using YOLO-based architectures.",
        "Built data preprocessing pipelines and annotated custom datasets to train high-accuracy computer vision models.",
        "Optimized model performance by fine-tuning hyperparameters and applying data augmentation techniques.",
        "Created FastAPI routes for the models to be consumed by the front-end.",
      ],
    },
    {
      company: "Tails of Manila",
      period: "September 2023 - January 2025",
      role: "Social Media Manager",
      duties: [
        "Applied skills in data analysis and visualization to drive targeted marketing campaigns and increase online visibility.",
        "Designed, developed, and scheduled engaging content (posts, images, videos) to maintain the brand’s online presence.",
        "Monitored comments, messages, and trends to interact with followers, answer inquiries, and manage brand reputation.",
      ],
    },
    {
      company: "Fiverr",
      period: "January 2019 - Present",
      role: "Freelance Multimedia Editor",
      duties: [
        "Collaborated with clients to analyze multimedia data and optimize content performance.",
        "Designed, created, and illustrated graphic illustrations and vector designs using tools from Adobe Creative Suite.",
        'Achieved "Level 2" badge on Fiverr for exceptional freelance performance.',
      ],
    },
  ];

  return (
    <div
      className="container mx-auto flex flex-col justify-center items-center md:items-start p-6 md:p-10 font-poppins text-gray-800"
      id="Experience"
    >
      <div className="relative w-fit h-fit text-start rounded-xl p-5 md:pr-16 border bg-gray-50" data-aos="fade-right">
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
        <p className="w-fit mt-4 text-sm text-gray-600" data-aos="fade-up">
          Some relevant experience throughout my career.
        </p>
      </div>

      {/* Experience Cards */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 pt-10 w-full">
    {experiences.map((exp, index) => {
      const isLast = index === experiences.length - 1;
      const isOddCount = experiences.length % 2 === 1;
      const centerOnDesktop = isLast && isOddCount ? "md:col-span-2 md:mx-auto" : "";

      return (
        <div key={exp.company} className={centerOnDesktop}>
          <ExperienceItem
            company={exp.company}
            period={exp.period}
            role={exp.role}
            duties={exp.duties}
            aos="fade-up"
          />
        </div>
      );
    })}
  </div>
    </div> 
  );
}
