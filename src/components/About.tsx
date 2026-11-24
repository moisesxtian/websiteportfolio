import { useState } from 'react';
import { useChatProfile } from '../Hooks/useChatProfile';
import ScrollReveal from './ScrollReveal';
import SectionTitle from './SectionTitle';
import AboutPersonal from './AboutPersonal';
import AboutProfessional from './AboutProfessional';

type AboutMode = 'personal' | 'professional';

const MODES: { id: AboutMode; label: string }[] = [
  { id: 'personal', label: 'personal' },
  { id: 'professional', label: 'professional' },
];

export default function About() {
  const [mode, setMode] = useState<AboutMode>('personal');
  const { profile } = useChatProfile();
  const isPersonal = mode === 'personal';

  return (
    <section
      id="About"
      className="about-section section-page font-poppins text-secondary-color !justify-start"
      aria-label="About"
    >
      <div className="section-page-inner gap-8 md:gap-10 !justify-start">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <ScrollReveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-main-color">
              {isPersonal ? 'Get to know me' : 'How I work'}
            </p>
            <SectionTitle
              text="About"
              className="text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
            />
          </ScrollReveal>

          <div className="about-switch" role="radiogroup" aria-label="About view">
            {MODES.map(({ id, label }, index) => (
              <span key={id} className="inline-flex items-baseline gap-2">
                {index > 0 ? (
                  <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">
                    /
                  </span>
                ) : null}
                <button
                  type="button"
                  role="radio"
                  aria-checked={mode === id}
                  className="about-switch-btn"
                  onClick={() => setMode(id)}
                >
                  {label}
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="about-panels">
          <div className={`about-panel ${isPersonal ? 'is-active' : ''}`} aria-hidden={!isPersonal}>
            <AboutPersonal profile={profile} />
          </div>
          <div className={`about-panel ${!isPersonal ? 'is-active' : ''}`} aria-hidden={isPersonal}>
            <AboutProfessional profile={profile} />
          </div>
        </div>
      </div>
    </section>
  );
}
