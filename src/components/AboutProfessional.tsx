import { useState } from 'react';
import {
  creativeSkills,
  developmentSkills,
  professionalFocus,
  professionalHighlights,
  skillTools,
  workflowSteps,
} from '../data/about';
import {
  fallbackChatProfile,
  PERSONAL_AVATAR,
  PROFESSIONAL_AVATAR,
  profileValue,
} from '../data/profile';
import type { ChatProfileData } from '../types/content';
import { AboutFigure } from './AboutPersonal';

type AboutProfessionalProps = {
  profile: ChatProfileData;
};

/**
 * One discipline as a short list of skills. The tools behind a skill only
 * appear while that skill is hovered, focused or tapped, so the page stays quiet.
 */
function Track({
  index,
  title,
  skills,
}: {
  index: string;
  title: string;
  skills: { name: string }[];
}) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const tools = activeSkill ? skillTools[activeSkill] ?? [] : [];

  return (
    <section className="min-w-0" onMouseLeave={() => setActiveSkill(null)}>
      <h4 className="about-track-title">
        <span className="about-mono text-main-color">{index}</span>
        {title}
      </h4>

      <ul className="about-skill-list">
        {skills.map((skill) => (
          <li key={skill.name}>
            <button
              type="button"
              className={activeSkill === skill.name ? 'is-active' : ''}
              aria-pressed={activeSkill === skill.name}
              onMouseEnter={() => setActiveSkill(skill.name)}
              onFocus={() => setActiveSkill(skill.name)}
              onClick={() => setActiveSkill(skill.name)}
            >
              {skill.name}
            </button>
          </li>
        ))}
      </ul>

      <p className={`about-tools ${tools.length ? 'is-shown' : ''}`} aria-live="polite">
        {tools.length ? (
          <>
            <span className="about-mono text-main-color">uses</span> {tools.join(' · ')}
          </>
        ) : (
          <span className="about-mono">pick a skill to see its tools</span>
        )}
      </p>
    </section>
  );
}

export default function AboutProfessional({ profile }: AboutProfessionalProps) {
  const name = profileValue(profile.name, fallbackChatProfile.name);
  const work = profileValue(profile.work, fallbackChatProfile.work);

  return (
    <div className="about-layout">
      <AboutFigure
        src={profileValue(profile.professionalAvatar, PROFESSIONAL_AVATAR)}
        fallback={PERSONAL_AVATAR}
        figure="fig. 02"
        caption={`${name}, on the clock`}
        tilt="right"
      />

      <div className="flex min-w-0 flex-col gap-8">
        <div>
          <p className="about-lead">{work}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {professionalFocus.map((item, i) => (
              <span key={item.label}>
                {i > 0 ? ' · ' : ''}
                {item.label} <span className="text-secondary-color">{item.value}</span>
              </span>
            ))}
          </p>

          <dl className="about-stats">
            {professionalHighlights.map((item) => (
              <div key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="about-stat-value">{item.value}</span>
                  <span className="about-stat-label">{item.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <Track index="A" title="Development" skills={developmentSkills} />
          <Track index="B" title="Creative" skills={creativeSkills} />
        </div>

        <div>
          <p className="about-kicker">How I build automations</p>
          <ol className="about-steps">
            {workflowSteps.map((step, index) => (
              <li key={step.title}>
                <span className="about-mono text-main-color">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {step.title}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
