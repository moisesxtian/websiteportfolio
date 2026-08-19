import { useState } from 'react';
import { useChatProfile } from '../Hooks/useChatProfile';
import ScrollReveal from './ScrollReveal';
import ShiningTitle from './ShiningTitle';
import AboutPersonal from './AboutPersonal';
import AboutProfessional from './AboutProfessional';

type AboutMode = 'personal' | 'professional';

export default function About() {
  const [mode, setMode] = useState<AboutMode>('personal');
  const { profile } = useChatProfile();
  const isPersonal = mode === 'personal';

  return (
    <section
      id="About"
      className={`about-section section-page relative font-poppins text-secondary-color !justify-start ${
        isPersonal ? 'dark is-personal' : ''
      }`}
      aria-label="About"
    >
      <div className="about-surface" aria-hidden="true" />

      <div className="section-page-inner gap-3 md:gap-4 !justify-start">
        <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <ScrollReveal>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-main-color">
              {isPersonal ? 'Get to know me' : 'How I work'}
            </p>
            <ShiningTitle
              text="About"
              className="whitespace-nowrap text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl"
            />
            <p className="mt-1 max-w-lg text-xs text-gray-600 dark:text-gray-400">
              {isPersonal
                ? 'A quieter look at the person behind the work.'
                : 'Skills, tools, and the two sides of how I build.'}
            </p>
          </ScrollReveal>

          <div
            className="about-toggle"
            data-mode={mode}
            role="radiogroup"
            aria-label="About view"
          >
            <span className="about-toggle-thumb" aria-hidden="true" />
            <button
              type="button"
              role="radio"
              aria-checked={isPersonal}
              className="about-toggle-btn"
              onClick={() => setMode('personal')}
            >
              Personal
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={!isPersonal}
              className="about-toggle-btn"
              onClick={() => setMode('professional')}
            >
              Professional
            </button>
          </div>
        </div>

        <div className="about-panels">
          <div
            className={`about-panel ${isPersonal ? 'is-active' : ''}`}
            aria-hidden={!isPersonal}
          >
            <AboutPersonal profile={profile} />
          </div>
          <div
            className={`about-panel ${!isPersonal ? 'is-active' : ''}`}
            aria-hidden={isPersonal}
          >
            <AboutProfessional profile={profile} />
          </div>
        </div>
      </div>
    </section>
  );
}
