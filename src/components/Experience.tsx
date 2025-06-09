import { BsFillArrowDownLeftCircleFill, BsFillArrowDownRightCircleFill } from "react-icons/bs";
import { ReactTyped } from 'react-typed';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  startEvent: 'load',
  easing: 'ease-in-out',
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
      className="p-6 rounded-lg shadow-sm bg-gray-50 border hover:scale-105 transition flex flex-col gap-2"
      data-aos={aos || "fade-up"}
    >
      <h2 className="text-xl font-bold mb-1 border-b border-orange-300 pb-1 w-fit">
        {company}
      </h2>
      <p className="text-sm text-gray-600">{period}</p>
      <p className="text-sm text-gray-600 mb-2">{role}</p>
      <h3 className="font-semibold mb-2">Duties & Responsibilities</h3>
      <ul className="list-disc pl-5 text-sm flex flex-col gap-2">
        {duties.map((duty, idx) => (
          <li key={idx} className="leading-relaxed">{duty}</li>
        ))}
      </ul>
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
      className="container mx-auto my-auto flex flex-col justify-center items-center md:items-start p-10 font-poppins text-gray-800"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 w-full">
        {experiences.map((exp) => (
          <ExperienceItem
            key={exp.company}
            company={exp.company}
            period={exp.period}
            role={exp.role}
            duties={exp.duties}
            aos="fade-up"
          />
        ))}
      </div>
    </div>
  );
}
