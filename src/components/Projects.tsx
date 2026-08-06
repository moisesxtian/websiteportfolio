import { FaGithub, FaEye } from 'react-icons/fa';
import { ReactTyped } from 'react-typed';
import { BsFillArrowDownRightCircleFill, BsFillArrowDownLeftCircleFill } from 'react-icons/bs';
import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useProjects } from '../Hooks/useProjects';
import type { Project } from '../types/content';

AOS.init({
  offset: 300,
  once: true,
});

const Projects = () => {
  const { projects } = useProjects();
  const [showAll, setShowAll] = useState(false);
  const [videoProject, setVideoProject] = useState<Project | null>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const extraProjectsRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (showAll && projectsRef.current) {
      setShowAll(false);
      setTimeout(() => {
        projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setShowAll(true);
      setTimeout(() => {
        extraProjectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const renderCard = (project: Project, index: number, ref?: React.Ref<HTMLDivElement>) => (
    <div
      key={project.id}
      ref={ref}
      className="group relative flex flex-col rounded-lg shadow-md overflow-hidden h-full bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-24px_rgba(249,115,22,0.45)]"
      data-aos="fade-up"
      data-aos-delay={`${index * 50}`}
      style={{ minHeight: 420 }}
    >
      <div className="relative w-full h-56 flex-shrink-0">
        <img
          src={project.image_url}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={project.hover_image_url || project.image_url}
          alt={`${project.title} hover`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {project.video_url ? (
          <button
            type="button"
            onClick={() => setVideoProject(project)}
            className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-black/70 text-white text-xs px-3 py-1.5 hover:bg-black"
          >
            <Play size={12} />
            Watch
          </button>
        ) : null}
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
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition-all"
          >
            <FaGithub className="mr-2" />
            View Repo
          </a>
          <a
            href={project.live_demo_link}
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
  );

  return (
    <div className="relative">
      <section
        className="section-page section-cut font-poppins text-secondary-color"
        id="Projects"
        ref={projectsRef}
      >
        <div className="section-page-inner gap-6 md:gap-8">
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
                strings={['Personal Projects']}
                typeSpeed={20}
                backSpeed={100}
                backDelay={2000}
                cursorChar="*"
              />
            </h2>
            <p className="w-fit mt-4 text-sm text-gray-600">
              A showcase of my personal projects highlighting my skills and creativity.
            </p>
          </div>

          <div className="w-full grid gap-5 sm:grid-cols-2 lg:grid-cols-4 p-4 rounded-xl border bg-white/50">
            {projects.slice(0, 4).map((project, index) => renderCard(project, index))}
            {showAll &&
              projects
                .slice(4)
                .map((project, index) =>
                  renderCard(project, index + 4, index === 0 ? extraProjectsRef : undefined)
                )}
          </div>

          {projects.length > 4 ? (
            <div className="text-center">
              <button
                onClick={handleToggle}
                className="px-6 py-2 text-white bg-orange-500 hover:bg-orange-400 rounded-lg shadow transition-all"
              >
                {showAll ? 'Show Less' : 'See More'}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {videoProject?.video_url ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setVideoProject(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white"
            >
              <X size={18} />
            </button>
            <video src={videoProject.video_url} controls autoPlay className="w-full max-h-[80vh]" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Projects;
