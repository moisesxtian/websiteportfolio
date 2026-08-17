import { useCallback, useEffect, useRef, useState } from 'react';
import { FaGithub, FaEye } from 'react-icons/fa';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Maximize2,
  Play,
  X,
} from 'lucide-react';
import { useProjects } from '../Hooks/useProjects';
import type { Project } from '../types/content';
import ScrollReveal from './ScrollReveal';

type ViewMode = 'showcase' | 'grid';

const Projects = () => {
  const { projects } = useProjects();
  const [viewMode, setViewMode] = useState<ViewMode>('showcase');
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoProject, setVideoProject] = useState<Project | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track || projects.length === 0) return;

    const next = ((index % projects.length) + projects.length) % projects.length;
    const width = track.clientWidth;
    if (!width) return;

    isJumping.current = true;
    setActiveIndex(next);
    track.scrollTo({ left: next * width, behavior: 'smooth' });

    window.setTimeout(() => {
      isJumping.current = false;
    }, 450);
  }, [projects.length]);

  const goNext = () => scrollToIndex(activeIndex + 1);
  const goPrev = () => scrollToIndex(activeIndex - 1);

  useEffect(() => {
    if (viewMode !== 'showcase') return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToIndex(activeIndex + 1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToIndex(activeIndex - 1);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, viewMode, scrollToIndex]);

  // Keep scroll position correct after resize
  useEffect(() => {
    const track = trackRef.current;
    if (!track || viewMode !== 'showcase') return;

    const onResize = () => {
      track.scrollTo({ left: activeIndex * track.clientWidth, behavior: 'auto' });
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeIndex, viewMode]);

  return (
    <div className="relative">
      <section
        id="Projects"
        className="section-page section-cut font-poppins text-secondary-color"
      >
        <div className="section-page-inner gap-5 md:gap-6 !justify-start">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 w-full">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-main-color mb-2">
                Portfolio
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                Personal Projects
              </h2>
              <p className="mt-2 text-sm text-gray-600 max-w-lg dark:text-gray-400">
                Explore builds one at a time in full view, or switch to a compact card grid.
              </p>
            </div>

            <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm self-start sm:self-auto dark:border-gray-700 dark:bg-neutral-900">
              <button
                type="button"
                onClick={() => setViewMode('showcase')}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  viewMode === 'showcase'
                    ? 'bg-main-color text-white'
                    : 'text-gray-600 hover:text-main-color dark:text-gray-400'
                }`}
              >
                <Maximize2 size={14} />
                Full view
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  viewMode === 'grid'
                    ? 'bg-main-color text-white'
                    : 'text-gray-600 hover:text-main-color dark:text-gray-400'
                }`}
              >
                <LayoutGrid size={14} />
                Card view
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="w-full">
            {viewMode === 'showcase' ? (
              <ShowcaseView
                projects={projects}
                activeIndex={activeIndex}
                trackRef={trackRef}
                isJumping={isJumping}
                onSelect={scrollToIndex}
                onPrev={goPrev}
                onNext={goNext}
                onWatchVideo={setVideoProject}
                onScrollIndex={(index) => {
                  if (!isJumping.current) setActiveIndex(index);
                }}
              />
            ) : (
              <GridView projects={projects} onWatchVideo={setVideoProject} />
            )}
          </ScrollReveal>
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

function ShowcaseView({
  projects,
  activeIndex,
  trackRef,
  onSelect,
  onPrev,
  onNext,
  onWatchVideo,
  onScrollIndex,
}: {
  projects: Project[];
  activeIndex: number;
  trackRef: React.RefObject<HTMLDivElement>;
  isJumping: React.MutableRefObject<boolean>;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onWatchVideo: (project: Project) => void;
  onScrollIndex: (index: number) => void;
}) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncHeight = () => {
      const slide = track.children[activeIndex] as HTMLElement | undefined;
      if (!slide) return;
      track.style.height = `${slide.offsetHeight}px`;
    };

    syncHeight();

    const slide = track.children[activeIndex] as HTMLElement | undefined;
    const observer = slide ? new ResizeObserver(syncHeight) : null;
    if (slide && observer) observer.observe(slide);

    window.addEventListener('resize', syncHeight);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', syncHeight);
    };
  }, [activeIndex, projects, trackRef]);

  if (projects.length === 0) {
    return <p className="text-sm text-gray-500 py-10 dark:text-gray-400">No projects yet.</p>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[#1a1a1a] text-white shadow-lg dark:border-gray-700">
        <div
          ref={trackRef}
          className="flex items-start overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth scrollbar-hide transition-[height] duration-300"
          onScroll={(e) => {
            const el = e.currentTarget;
            const width = el.clientWidth;
            if (!width) return;
            const index = Math.round(el.scrollLeft / width);
            if (index >= 0 && index < projects.length) {
              onScrollIndex(index);
            }
          }}
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="relative grid w-full min-w-full max-w-full flex-shrink-0 snap-center grid-cols-1 lg:grid-cols-2"
            >
              <div className="group/image relative aspect-[16/9] w-full overflow-hidden lg:aspect-auto lg:min-h-full">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover/image:opacity-0"
                />
                <img
                  src={project.hover_image_url || project.image_url}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover/image:opacity-100"
                />
              </div>

              <div className="relative flex flex-col justify-center gap-3 p-4 sm:gap-4 sm:p-6 md:p-8 lg:p-10">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-orange-300 font-semibold">
                  Featured project
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-xl line-clamp-4 sm:line-clamp-none">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] text-orange-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-white text-[#252525] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:bg-orange-50 transition"
                  >
                    <FaGithub />
                    View Repo
                  </a>
                  <a
                    href={project.live_demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-main-color text-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:bg-orange-400 transition"
                  >
                    <FaEye />
                    See Live
                  </a>
                  {project.video_url ? (
                    <button
                      type="button"
                      onClick={() => onWatchVideo(project)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:bg-white/10 transition"
                    >
                      <Play size={14} />
                      Watch
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-20">
          <button
            type="button"
            onClick={onPrev}
            className="pointer-events-auto absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 sm:p-2.5 text-white backdrop-blur hover:bg-main-color transition"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="pointer-events-auto absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 sm:p-2.5 text-white backdrop-blur hover:bg-main-color transition"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-xs text-gray-500 tabular-nums whitespace-nowrap dark:text-gray-400">
          {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </p>
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max py-1">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => onSelect(index)}
                className={`relative h-12 w-20 sm:h-14 sm:w-24 overflow-hidden rounded-lg border transition ${
                  index === activeIndex
                    ? 'border-main-color ring-2 ring-main-color/30'
                    : 'border-gray-200 opacity-70 hover:opacity-100 dark:border-gray-700'
                }`}
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GridView({
  projects,
  onWatchVideo,
}: {
  projects: Project[];
  onWatchVideo: (project: Project) => void;
}) {
  return (
    <div className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <article
          key={project.id}
          className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-main-color/30 hover:shadow-md dark:border-gray-700 dark:bg-neutral-900"
        >
          <div className="relative h-36 overflow-hidden">
            <img
              src={project.image_url}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            <img
              src={project.hover_image_url || project.image_url}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            {project.video_url ? (
              <button
                type="button"
                onClick={() => onWatchVideo(project)}
                className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[10px] text-white"
              >
                <Play size={10} />
                Watch
              </button>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col p-4 gap-2">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-main-color dark:text-gray-100">
              {project.title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 dark:text-gray-400">{project.description}</p>
            <div className="mt-auto flex gap-2 pt-2">
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-900 px-2 py-1.5 text-[11px] text-white dark:bg-neutral-800"
              >
                <FaGithub />
                Repo
              </a>
              <a
                href={project.live_demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-main-color px-2 py-1.5 text-[11px] text-white"
              >
                <FaEye />
                Live
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Projects;
