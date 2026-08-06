import { useMemo, useState } from 'react';
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { useExperiences } from '../Hooks/useExperiences';
import type { Experience as ExperienceType } from '../types/content';

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
 * (oldest two — last items in Latest → Oldest list).
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

            <div className="relative p-4 sm:p-6 pl-5 sm:pl-7">
              <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                <div className="min-w-0 space-y-2 sm:space-y-2.5">
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
                    <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-gray-500">
                      <Calendar size={12} className="text-main-color" />
                      {experience.period}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-secondary-color leading-snug tracking-tight">
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
  const yoeLabel = useMemo(() => formatProfessionalYoe(experiences), [experiences]);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="Experience"
      className="section-page section-cut relative overflow-hidden font-poppins text-secondary-color"
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

      <div className="section-page-inner gap-8 md:gap-10 !justify-start">
        {/* Always-visible section header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 w-full">
          <div className="relative w-fit">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-main-color">
              <Briefcase size={12} />
              Career path
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Work Experience
            </h2>
            <p className="mt-3 max-w-md text-xs sm:text-sm text-gray-600 leading-relaxed">
              Roles that shaped how I build — from freelance craft to AI/ML engineering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl bg-white px-4 py-3 min-w-[110px]">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Roles</p>
              <p className="text-2xl font-bold text-secondary-color tabular-nums">
                {experiences.length}
              </p>
            </div>
            <div className="rounded-xl bg-white px-4 py-3 min-w-[110px]">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                YOE
              </p>
              <p className="text-2xl font-bold text-secondary-color tabular-nums">{yoeLabel}</p>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div className="absolute left-[7px] md:left-1/2 top-4 bottom-16 w-px -translate-x-1/2 bg-gradient-to-b from-main-color via-orange-200 to-transparent" />

          {experiences.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-16">
              No experience entries yet. Add some from the admin panel.
            </p>
          ) : (
            <div className="space-y-8 md:space-y-12">
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  index={index}
                  total={experiences.length}
                  isActive={activeId === experience.id}
                  onToggle={() => handleToggle(experience.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
