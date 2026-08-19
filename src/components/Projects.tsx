import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { FaGithub, FaEye } from 'react-icons/fa';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Maximize2,
  Play,
  X,
} from 'lucide-react';
import { useProjects } from '../Hooks/useProjects';
import { projectImages } from '../lib/projectImages';
import type { Project } from '../types/content';
import ScrollReveal from './ScrollReveal';
import ShiningTitle, { HoverWords } from './ShiningTitle';

type ViewMode = 'showcase' | 'grid';

type ProjectsProps = {
  onViewModeChange?: (mode: ViewMode) => void;
};

const Projects = ({ onViewModeChange }: ProjectsProps) => {
  const { projects } = useProjects(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeIndex, setActiveIndex] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const [videoProject, setVideoProject] = useState<Project | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);

  useEffect(() => {
    onViewModeChange?.(viewMode);
  }, [viewMode, onViewModeChange]);

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
        className={`section-page section-cut font-poppins text-secondary-color ${
          viewMode === 'grid' ? 'is-unbounded' : ''
        }`}
      >
        <div className="section-page-inner gap-5 md:gap-6 !justify-start">
          <ScrollReveal className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-main-color">
                Portfolio
              </p>
              <ShiningTitle
                text="Personal Projects"
                className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
              />
              <p className="mt-2 max-w-lg text-sm text-gray-600 dark:text-gray-400">
                Click a card to expand photos, skills, and links.
              </p>
            </div>

            <div className="inline-flex self-start rounded-xl border border-gray-200 bg-white p-1 shadow-sm sm:self-auto dark:border-gray-700 dark:bg-neutral-900">
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

          {viewMode === 'showcase' ? (
            <ShowcaseView
              projects={projects}
              activeIndex={activeIndex}
              trackRef={trackRef}
              onSelect={scrollToIndex}
              onPrev={() => scrollToIndex(activeIndex - 1)}
              onNext={() => scrollToIndex(activeIndex + 1)}
              onWatchVideo={setVideoProject}
              onScrollIndex={(index) => {
                if (!isJumping.current) setActiveIndex(index);
              }}
            />
          ) : (
            <GridView
              projects={projects}
              openId={openId}
              onToggle={(id) => setOpenId((prev) => (prev === id ? null : id))}
              onWatchVideo={setVideoProject}
            />
          )}
        </div>
      </section>

      {videoProject?.video_url ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-black">
            <button
              type="button"
              onClick={() => setVideoProject(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 hover:bg-white"
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

function ImageGallery({
  images,
  alt,
  eager = false,
  className,
}: {
  images: string[];
  alt: string;
  eager?: boolean;
  className: string;
}) {
  const [index, setIndex] = useState(0);
  const current = images[index] || images[0];
  const hasMany = images.length > 1;

  const go = (next: number) => {
    if (!hasMany) return;
    setIndex((prev) => (prev + next + images.length) % images.length);
  };

  if (!current) {
    return <div className={`${className} bg-neutral-800`} />;
  }

  return (
    <div className={`group/gallery relative overflow-hidden ${className}`}>
      <img
        src={current}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/gallery:scale-[1.03]"
      />

      {hasMany ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-1.5 text-white opacity-0 backdrop-blur transition group-hover/gallery:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-1.5 text-white opacity-0 backdrop-blur transition group-hover/gallery:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {images.map((src, imageIndex) => (
              <button
                key={src}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(imageIndex);
                }}
                className={`h-1.5 rounded-full transition ${
                  imageIndex === index ? 'w-4 bg-main-color' : 'w-1.5 bg-white/60'
                }`}
                aria-label={`Show image ${imageIndex + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

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
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onWatchVideo: (project: Project) => void;
  onScrollIndex: (index: number) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

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
  }, [activeIndex, openId, projects, trackRef]);

  if (projects.length === 0) {
    return <p className="py-10 text-sm text-gray-500 dark:text-gray-400">No projects yet.</p>;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[#1a1a1a] text-white shadow-lg dark:border-gray-700">
        <div
          ref={trackRef}
          className="flex items-start overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
          {projects.map((project, index) => {
            const images = projectImages(project);
            const isOpen = openId === project.id;

            return (
              <article
                key={project.id}
                className="relative grid w-full min-w-full max-w-full flex-shrink-0 snap-center grid-cols-1 lg:grid-cols-2"
              >
                <ImageGallery
                  images={images}
                  alt={project.title}
                  eager={index === 0}
                  className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-auto lg:min-h-full"
                />

                <div className="relative flex flex-col justify-center gap-3 p-4 sm:gap-4 sm:p-6 md:p-8 lg:p-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300 sm:text-[11px]">
                    Featured project
                  </p>
                  <h3 className="text-xl font-extrabold leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
                    <HoverWords text={project.title} />
                  </h3>
                  <p
                    className={`text-xs leading-relaxed text-gray-300 sm:text-sm md:text-base ${
                      isOpen ? '' : 'line-clamp-3 sm:line-clamp-4'
                    }`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-orange-200 sm:px-2.5 sm:py-1 sm:text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : project.id)}
                    className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-orange-200 hover:text-white"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? 'Show less' : 'More photos'}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div className={`exp-details ${isOpen ? 'is-open' : ''}`}>
                    <div className="min-h-0 overflow-hidden">
                      {images.length > 1 ? (
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                          {images.map((src, imageIndex) => (
                            <img
                              key={src}
                              src={src}
                              alt=""
                              className="exp-duty h-14 w-20 flex-shrink-0 rounded-lg object-cover"
                              style={{ '--i': imageIndex } as CSSProperties}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 sm:gap-3 sm:pt-2">
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#252525] transition hover:bg-orange-50 sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      <FaGithub />
                      View Repo
                    </a>
                    <a
                      href={project.live_demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-main-color px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-400 sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      <FaEye />
                      See Live
                    </a>
                    {project.video_url ? (
                      <button
                        type="button"
                        onClick={() => onWatchVideo(project)}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold transition hover:bg-white/10 sm:px-4 sm:py-2.5 sm:text-sm"
                      >
                        <Play size={14} />
                        Watch
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 z-20">
          <button
            type="button"
            onClick={onPrev}
            className="pointer-events-auto absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:bg-main-color sm:left-3 sm:p-2.5"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="pointer-events-auto absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:bg-main-color sm:right-3 sm:p-2.5"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="whitespace-nowrap text-xs tabular-nums text-gray-500 dark:text-gray-400">
          {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </p>
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max gap-2 py-1">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => onSelect(index)}
                className={`relative h-12 w-20 overflow-hidden rounded-lg border transition sm:h-14 sm:w-24 ${
                  index === activeIndex
                    ? 'border-main-color ring-2 ring-main-color/30'
                    : 'border-gray-200 opacity-70 hover:opacity-100 dark:border-gray-700'
                }`}
              >
                <img
                  src={projectImages(project)[0]}
                  alt={project.title}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
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
  openId,
  onToggle,
  onWatchVideo,
}: {
  projects: Project[];
  openId: string | null;
  onToggle: (id: string) => void;
  onWatchVideo: (project: Project) => void;
}) {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ScrollReveal key={project.id} delay={index * 70}>
          <ProjectCard
            project={project}
            isOpen={openId === project.id}
            onToggle={() => onToggle(project.id)}
            onWatchVideo={onWatchVideo}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  isOpen,
  onToggle,
  onWatchVideo,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
  onWatchVideo: (project: Project) => void;
}) {
  const images = projectImages(project);
  const detailsId = `project-details-${project.id}`;

  return (
    <article className="proj-card overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-neutral-900">
      <div className="cursor-pointer" onClick={onToggle}>
        <ImageGallery
          images={images}
          alt={project.title}
          className="relative h-40 w-full overflow-hidden"
        />
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={detailsId}
        className="group flex w-full items-start gap-3 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color"
      >
        <h3 className="min-w-0 flex-1 text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">
          <HoverWords text={project.title} />
        </h3>
        <ChevronDown
          size={16}
          className={`mt-0.5 flex-shrink-0 text-gray-400 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? 'rotate-180 text-main-color' : 'group-hover:text-main-color'
          }`}
        />
      </button>

      <div id={detailsId} className={`exp-details ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-3 px-4 pb-4">
            <p
              className="exp-duty text-xs leading-relaxed text-gray-500 dark:text-gray-400"
              style={{ '--i': 0 } as CSSProperties}
            >
              {project.description}
            </p>

            {project.skills.length > 0 ? (
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {project.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="exp-skill inline-flex items-center gap-2 px-1 py-0.5 text-[11px] font-light text-gray-600 dark:text-gray-400"
                    style={{ '--i': skillIndex } as CSSProperties}
                  >
                    <span className="block h-1.5 w-1.5 rounded-full bg-main-color" />
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}

            {images.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {images.map((src, imageIndex) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="exp-duty h-16 w-24 flex-shrink-0 rounded-lg object-cover"
                    style={{ '--i': imageIndex } as CSSProperties}
                  />
                ))}
              </div>
            ) : null}

            <div className="flex gap-2 pt-1">
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
              {project.video_url ? (
                <button
                  type="button"
                  onClick={() => onWatchVideo(project)}
                  className="inline-flex items-center gap-1 rounded-md border px-2 py-1.5 text-[11px] dark:border-gray-700"
                >
                  <Play size={10} />
                  Watch
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Projects;
