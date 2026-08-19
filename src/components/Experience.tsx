import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useExperiences } from '../Hooks/useExperiences';
import { useInView } from '../Hooks/useInView';
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

function formatPeriod(period: string) {
  return period.replace(/\s*[-–—]\s*/g, ' – ');
}

function companyInitials(company: string) {
  const words = company
    .trim()
    .split(/\s+/)
    .filter((word) => !['&', 'and', 'of', 'the', '@'].includes(word.toLowerCase()));

  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function CompanyLogo({ src, company }: { src: string; company: string }) {
  const [failed, setFailed] = useState(false);
  const initials = companyInitials(company);
  const showImage = Boolean(src) && !failed;

  if (!showImage) {
    return (
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-main-color dark:bg-neutral-800"
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={48}
      height={48}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
    />
  );
}

function ExperienceCard({
  experience,
  isOpen,
  onToggle,
}: {
  experience: ExperienceType;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const detailsId = `experience-details-${experience.id}`;
  const hasDetails = experience.skills.length > 0 || experience.duties.length > 0;

  return (
    <article
      ref={ref}
      className={`exp-row border-b border-gray-200 last:border-b-0 dark:border-gray-800 ${
        inView ? 'is-visible' : ''
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={hasDetails ? detailsId : undefined}
        className={`exp-row-trigger group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color focus-visible:ring-offset-2 dark:focus-visible:ring-offset-page-bg ${
          isOpen ? 'pt-6 pb-4 sm:pt-7' : 'py-6 sm:py-7'
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8 md:gap-12">
          <p className="w-full flex-shrink-0 pt-1 text-xs text-gray-500 dark:text-gray-400 sm:w-40 md:w-44">
            {formatPeriod(experience.period)}
          </p>

          <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
            <CompanyLogo
              key={experience.image_url || experience.company}
              src={experience.image_url}
              company={experience.company}
            />

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-extrabold leading-tight tracking-tight text-gray-900 sm:text-xl dark:text-white">
                {experience.role}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-main-color">@ {experience.company}</p>
            </div>

            {hasDetails ? (
              <ChevronDown
                size={18}
                className={`mt-1 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-main-color' : 'group-hover:text-main-color'
                }`}
              />
            ) : null}
          </div>
        </div>
      </button>

      {hasDetails ? (
        <div
          id={detailsId}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
          aria-hidden={!isOpen}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col pb-6 sm:flex-row sm:gap-8 md:gap-12">
              <div className="hidden flex-shrink-0 sm:block sm:w-40 md:w-44" aria-hidden="true" />
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                {experience.skills.length > 0 ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {experience.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-gray-300 px-2.5 py-0.5 text-[11px] text-gray-500 dark:border-gray-600 dark:text-gray-400"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {experience.duties.length > 0 ? (
                  <ul className="space-y-2">
                    {experience.duties.map((duty) => (
                      <li
                        key={duty}
                        className="flex gap-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                      >
                        <ChevronRight size={14} className="mt-1 flex-shrink-0 text-main-color" />
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export default function Experience() {
  const { experiences } = useExperiences(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const yoeLabel = useMemo(() => formatProfessionalYoe(experiences), [experiences]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="Experience"
      className="section-page section-cut relative overflow-hidden font-poppins text-secondary-color"
    >
      <div className="section-page-inner gap-8 md:gap-10 !justify-start">
        <ScrollReveal className="flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-main-color sm:text-4xl md:text-5xl">
              Experience
            </h2>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-400">
              Roles that shaped how I build, from freelance craft to AI/ML engineering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Roles</p>
              <p className="text-xl font-bold tabular-nums text-secondary-color">
                {experiences.length}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">YOE</p>
              <p className="text-xl font-bold tabular-nums text-secondary-color">{yoeLabel}</p>
            </div>
          </div>
        </ScrollReveal>

        {experiences.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-500 dark:text-gray-400">
            No experience entries yet. Add some from the admin panel.
          </p>
        ) : (
          <div className="w-full border-t border-gray-200 dark:border-gray-800">
            {experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                isOpen={openId === experience.id}
                onToggle={() => handleToggle(experience.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
