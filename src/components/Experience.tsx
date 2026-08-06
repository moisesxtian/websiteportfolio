import { useState } from 'react';
import { ReactTyped } from 'react-typed';
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  MapPin,
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useExperiences } from '../Hooks/useExperiences';
import type { Experience as ExperienceType } from '../types/content';

AOS.init({
  startEvent: 'load',
  easing: 'ease-out-cubic',
  once: true,
  duration: 400,
});

function ExperienceCard({
  experience,
  index,
  total,
  isActive,
  onToggle,
}: {
  experience: ExperienceType;
  index: number;
  total: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const isLatest = index === 0;
  const progressLabel = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <article className={`experience-card group relative ${isActive ? 'is-active' : ''}`}>
      {/* Timeline node */}
      <div className="absolute left-0 top-8 md:left-1/2 md:-translate-x-1/2 z-20">
        <div
          className={`relative flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white transition-colors duration-200 ${
            isLatest
              ? 'bg-main-color shadow-[0_0_0_6px_rgba(249,115,22,0.18)]'
              : 'bg-gray-300 group-hover:bg-main-color group-hover:shadow-[0_0_0_6px_rgba(249,115,22,0.12)]'
          }`}
        >
          {isLatest ? (
            <span className="absolute inset-0 rounded-full bg-main-color/35 animate-ping" />
          ) : null}
        </div>
      </div>

      {/* Card — alternating sides on desktop */}
      <div
        className={`ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] ${
          index % 2 === 0 ? 'md:mr-auto md:pr-2' : 'md:ml-auto md:pl-2'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isActive}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color focus-visible:ring-offset-2 rounded-2xl"
        >
          <div
            className={`relative overflow-hidden rounded-2xl border bg-white/95 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-200 ease-out ${
              isActive
                ? 'border-main-color/35 shadow-[0_22px_55px_-28px_rgba(249,115,22,0.55)] -translate-y-0.5'
                : 'border-gray-200/90 shadow-sm hover:border-main-color/25 hover:shadow-md'
            }`}
          >
            <div
              className={`absolute inset-y-0 left-0 w-1 transition-colors duration-200 ${
                isActive || isLatest
                  ? 'bg-main-color'
                  : 'bg-gray-200 group-hover:bg-main-color/50'
              }`}
            />

            <div
              className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition-opacity duration-200 ${
                isActive
                  ? 'opacity-100 bg-orange-200/50'
                  : 'opacity-0 group-hover:opacity-70 bg-orange-100/60'
              }`}
            />

            <div className="relative p-5 sm:p-6 pl-6 sm:pl-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {isLatest ? (
                      <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-main-color">
                        Current chapter
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                        {progressLabel}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} className="text-main-color" />
                      {experience.period}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-secondary-color leading-snug tracking-tight">
                    {experience.role}
                  </h3>

                  <p className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600">
                    <Building2 size={14} className="text-main-color flex-shrink-0" />
                    {experience.company}
                  </p>
                </div>

                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                    isActive
                      ? 'border-main-color bg-main-color text-white rotate-180'
                      : 'border-gray-200 bg-gray-50 text-gray-500 group-hover:border-main-color/40 group-hover:text-main-color'
                  }`}
                >
                  <ChevronDown size={16} />
                </div>
              </div>

              <div
                className={`grid transition-[grid-template-rows,margin] duration-200 ease-out ${
                  isActive ? 'grid-rows-[1fr] mt-5' : 'grid-rows-[0fr] mt-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-dashed border-gray-200 pt-4">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                      Highlights & responsibilities
                    </p>
                    <ul className="space-y-2.5">
                      {experience.duties.map((duty, dutyIndex) => (
                        <li
                          key={dutyIndex}
                          className="flex gap-3 text-sm leading-relaxed text-gray-600"
                        >
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-main-color ring-1 ring-orange-100">
                            <CheckCircle2 size={13} strokeWidth={2.5} />
                          </span>
                          <span className="pt-0.5">{duty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </article>
  );
}

export default function Experience() {
  const { experiences } = useExperiences();
  const [activeId, setActiveId] = useState<string | null>(null);

  const openedId = activeId === null ? experiences[0]?.id ?? null : activeId || null;

  const handleToggle = (id: string) => {
    setActiveId((prev) => {
      const currentlyOpen = prev === null ? experiences[0]?.id ?? null : prev || null;
      return currentlyOpen === id ? '' : id;
    });
  };

  return (
    <section
      id="Experience"
      className="relative overflow-hidden font-poppins text-secondary-color"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-orange-100/45 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-64 w-64 rounded-full bg-stone-200/50 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(249,115,22,0.14) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="mx-auto mb-12 md:mb-16 max-w-2xl text-center" data-aos="fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-main-color shadow-sm backdrop-blur">
            <Briefcase size={13} />
            Career progression
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            <ReactTyped strings={['Work Experience']} typeSpeed={25} showCursor={false} />
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Roles that shaped how I build my skills from freelance craft to AI/ML engineering.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-[7px] md:left-1/2 top-4 bottom-16 w-px -translate-x-1/2 bg-gradient-to-b from-main-color via-orange-200 to-transparent" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                total={experiences.length}
                isActive={openedId === experience.id}
                onToggle={() => handleToggle(experience.id)}
              />
            ))}
          </div>

          <div className="relative mt-10 flex items-center justify-start md:justify-center">
            <div className="ml-10 md:ml-0 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-xs text-gray-500 shadow-sm backdrop-blur">
              <MapPin size={12} className="text-main-color" />
              Journey continues
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
