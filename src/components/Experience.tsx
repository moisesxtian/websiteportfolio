import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
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

function formatPeriod(period: string) {
  return period.replace(/\s*[-–—]\s*/g, ' – ');
}

function HoverWords({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ').filter(Boolean);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="exp-word">{word}</span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

function ShiningTitle({ text, className = '' }: { text: string; className?: string }) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const [ready, setReady] = useState(false);
  let letterIndex = 0;
  const letterCount = text.replace(/ /g, '').length;

  useEffect(() => {
    const waitMs = (letterCount * 0.045 + 0.5) * 1000;
    const timer = window.setTimeout(() => setReady(true), waitMs);
    return () => window.clearTimeout(timer);
  }, [letterCount]);

  const resetLetters = () => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll<HTMLElement>('.exp-title-letter').forEach((el) => {
      el.style.transform = '';
      el.style.color = '';
      el.style.webkitTextFillColor = '';
    });
  };

  const handleMove = (e: MouseEvent<HTMLHeadingElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const letters = e.currentTarget.querySelectorAll<HTMLElement>('.exp-title-letter');
    letters.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 1 - dist / 70);

      if (force > 0) {
        el.style.transform = `translate3d(0, ${-4 * force}px, 0)`;
        if (force > 0.2) {
          el.style.color = '#f97316';
          el.style.webkitTextFillColor = '#f97316';
        } else {
          el.style.color = '';
          el.style.webkitTextFillColor = '';
        }
      } else {
        el.style.transform = '';
        el.style.color = '';
        el.style.webkitTextFillColor = '';
      }
    });
  };

  return (
    <h2
      ref={rootRef}
      className={`exp-title ${ready ? 'is-ready' : ''} ${className}`.trim()}
      aria-label={text}
      onMouseMove={handleMove}
      onMouseLeave={resetLetters}
    >
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span key={`space-${index}`} className="inline-block w-[0.28em]" aria-hidden="true">
              {' '}
            </span>
          );
        }

        const letterI = letterIndex;
        letterIndex += 1;

        return (
          <span
            key={`${char}-${index}`}
            className="exp-title-letter inline-block"
            style={
              {
                '--letter-delay': `${letterI * 0.045}s`,
                '--letter-i': letterI,
              } as CSSProperties
            }
            aria-hidden="true"
          >
            {char}
          </span>
        );
      })}
    </h2>
  );
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
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs font-semibold text-main-color dark:bg-neutral-800"
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
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-10 w-10 flex-shrink-0 rounded-xl object-cover"
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
  const detailsId = `experience-details-${experience.id}`;
  const hasDetails = experience.skills.length > 0 || experience.duties.length > 0;

  return (
    <article className="exp-row border-b border-gray-200/80 last:border-b-0 dark:border-gray-800">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={hasDetails ? detailsId : undefined}
        className="exp-row-trigger group w-full py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color focus-visible:ring-offset-2 dark:focus-visible:ring-offset-page-bg sm:py-6"
      >
        <div className="exp-grid">
          <p className="pt-1 text-[11px] font-light tracking-wide text-gray-500 dark:text-gray-400 sm:pt-2.5">
            {formatPeriod(experience.period)}
          </p>

          <div className="flex min-w-0 items-center gap-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 sm:gap-4">
            <div className="exp-logo h-10 w-10 flex-shrink-0 rounded-xl">
              <CompanyLogo
                key={experience.image_url || experience.company}
                src={experience.image_url}
                company={experience.company}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-extrabold leading-tight tracking-tight text-gray-900 sm:text-lg dark:text-gray-100">
                <HoverWords text={experience.role} />
              </h3>
              <p className="mt-0.5 text-sm font-medium text-main-color">
                @ <HoverWords text={experience.company} />
              </p>
            </div>

            {hasDetails ? (
              <ChevronDown
                size={16}
                className={`flex-shrink-0 text-gray-400 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
          className={`exp-details ${isOpen ? 'is-open' : ''}`}
          aria-hidden={!isOpen}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="exp-grid pb-5 sm:pb-6">
              <div aria-hidden="true" />
              <div className="flex min-w-0 flex-col gap-3.5">
                {experience.skills.length > 0 ? (
                  <ul className="flex flex-wrap gap-x-3 gap-y-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <li
                        key={skill}
                        className="exp-skill inline-flex items-center gap-2 px-1 py-0.5 text-[11px] font-light text-gray-600 sm:text-xs dark:text-gray-400"
                        style={{ '--i': skillIndex } as CSSProperties}
                      >
                        <span className="block h-1.5 w-1.5 rounded-full bg-main-color" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {experience.duties.length > 0 ? (
                  <ul className="space-y-2">
                    {experience.duties.map((duty, dutyIndex) => (
                      <li
                        key={duty}
                        className="exp-duty flex gap-2 text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400"
                        style={{ '--i': dutyIndex } as CSSProperties}
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
      className="section-page section-cut relative font-poppins text-secondary-color"
    >
      <div className="section-page-inner gap-5 md:gap-6 !justify-start">
        <ScrollReveal className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-main-color">
              Career path
            </p>
            <ShiningTitle
              text="Experience"
              className="whitespace-nowrap text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
            />
            <p className="mt-2 max-w-lg text-sm text-gray-600 dark:text-gray-400">
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
          <div className="w-full border-t border-gray-200/80 dark:border-gray-800">
            {experiences.map((experience, index) => (
              <ScrollReveal key={experience.id} delay={index * 90}>
                <ExperienceCard
                  experience={experience}
                  isOpen={openId === experience.id}
                  onToggle={() => handleToggle(experience.id)}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
