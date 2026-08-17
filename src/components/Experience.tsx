import { useMemo, useState } from 'react';
import { Briefcase, Building2, Calendar, ChevronDown } from 'lucide-react';
import { useExperiences } from '../Hooks/useExperiences';
import type { Experience as ExperienceType } from '../types/content';
import ScrollReveal from './ScrollReveal';

const MONTH_INDEX: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function parsePeriodDate(part: string): Date | null {
  const trimmed = part.trim();
  if (/^present$/i.test(trimmed)) return new Date();

  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return null;

  const month = MONTH_INDEX[match[1].toLowerCase()];
  if (month === undefined) return null;

  return new Date(Number(match[2]), month, 1);
}

/** Inclusive month count for strings like "February 2025 - April 2025". */
function monthsInPeriod(period: string): number {
  const [startRaw, endRaw] = period.split(/\s*[-–—]\s*/);
  if (!startRaw || !endRaw) return 0;

  const start = parsePeriodDate(startRaw);
  const end = parsePeriodDate(endRaw);
  if (!start || !end || end < start) return 0;

  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
}

/**
 * Professional YOE from all roles except the chronologically first 2
 * (oldest two are the last items in Latest to Oldest list).
 */
function formatProfessionalYoe(experiences: ExperienceType[]): string {
  const professional =
    experiences.length <= 2 ? [] : experiences.slice(0, experiences.length - 2);

  const totalMonths = professional.reduce((sum, exp) => sum + monthsInPeriod(exp.period), 0);
  const years = Math.floor(totalMonths / 12);

  if (years < 1) return '< 1 Year';
  return years === 1 ? '1 Year' : `${years} Years`;
}

function ExperienceCard({
  experience,
  index,
  isActive,
  onToggle,
}: {
  experience: ExperienceType;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const isLatest = index === 0;

  return (
    <article className="group relative">
      <div className="absolute left-0 top-7 md:left-1/2 md:-translate-x-1/2 z-20">
        <div
          className={`h-3 w-3 rounded-full ring-4 ring-page-bg ${
            isLatest ? 'bg-main-color' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        />
      </div>

      <div
        className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${
          index % 2 === 0 ? 'md:mr-auto md:pr-2' : 'md:ml-auto md:pl-2'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isActive}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color focus-visible:ring-offset-2 rounded-xl dark:focus-visible:ring-offset-page-bg"
        >
          <div
            className={`rounded-xl border bg-white p-4 sm:p-5 transition-colors dark:bg-neutral-900 ${
              isActive
                ? 'border-main-color/40'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    {experience.period}
                  </span>
                  {isLatest ? (
                    <span className="font-medium text-main-color">Current</span>
                  ) : null}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-secondary-color leading-snug">
                  {experience.role}
                </h3>

                <p className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <Building2 size={14} className="flex-shrink-0" />
                  {experience.company}
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`mt-1 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                  isActive ? 'rotate-180 text-main-color' : ''
                }`}
              />
            </div>

            <div
              className={`grid transition-[grid-template-rows,margin] duration-200 ease-out ${
                isActive ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr] mt-0'
              }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                  {experience.duties.map((duty, dutyIndex) => (
                    <li
                      key={dutyIndex}
                      className="flex gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-main-color" />
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
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
  const yoeLabel = useMemo(() => formatProfessionalYoe(experiences), [experiences]);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="Experience"
      className="section-page section-cut relative overflow-hidden font-poppins text-secondary-color"
    >
      <div className="section-page-inner gap-8 md:gap-10 !justify-start">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 w-full">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-main-color">
              <Briefcase size={12} />
              Career path
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              Work Experience
            </h2>
            <p className="mt-3 max-w-md text-xs sm:text-sm text-gray-600 leading-relaxed dark:text-gray-400">
              Roles that shaped how I build, from freelance craft to AI/ML engineering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Roles</p>
              <p className="text-xl font-bold text-secondary-color tabular-nums">
                {experiences.length}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">YOE</p>
              <p className="text-xl font-bold text-secondary-color tabular-nums">{yoeLabel}</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative w-full">
          <div className="absolute left-[5px] md:left-1/2 top-4 bottom-8 w-px -translate-x-1/2 bg-gray-200 dark:bg-gray-700" />

          {experiences.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-16 dark:text-gray-400">
              No experience entries yet. Add some from the admin panel.
            </p>
          ) : (
            <div className="space-y-6 md:space-y-8">
              {experiences.map((experience, index) => (
                <ScrollReveal key={experience.id} delay={Math.min(index * 80, 320)}>
                  <ExperienceCard
                    experience={experience}
                    index={index}
                    isActive={activeId === experience.id}
                    onToggle={() => handleToggle(experience.id)}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
