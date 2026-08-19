import { useState } from 'react';
import { type LucideIcon } from 'lucide-react';
import { IconContext } from 'react-icons';
import {
  creativeSkills,
  creativeTools,
  developmentSkills,
  developmentTools,
  professionalFocus,
  professionalHighlights,
  professionalRoles,
  skillTools,
  workflowSteps,
} from '../data/about';
import { fallbackChatProfile, PROFILE_AVATAR, profileValue } from '../data/profile';
import { getSkillIcon, getToolTheme } from '../lib/skillIcons';
import type { ChatProfileData } from '../types/content';

type AboutProfessionalProps = {
  profile: ChatProfileData;
};

type ToolItem = {
  name: string;
  icon_key: string;
};

function SkillTiles({
  skills,
  activeSkill,
  onHover,
}: {
  skills: { name: string; icon: LucideIcon }[];
  activeSkill: string | null;
  onHover: (skill: string | null) => void;
}) {
  return (
    <div className="about-skill-grid">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className={`about-skill-tile ${activeSkill === skill.name ? 'is-active' : ''}`}
          onMouseEnter={() => onHover(skill.name)}
          onMouseLeave={() => onHover(null)}
        >
          <p className="about-skill-tile-name">{skill.name}</p>
        </div>
      ))}
    </div>
  );
}

function ToolChips({
  tools,
  highlightNames,
}: {
  tools: ToolItem[];
  highlightNames: string[] | null;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <IconContext.Provider value={{ size: '14' }}>
        {tools.map((tool) => {
          const Icon = getSkillIcon(tool.icon_key, tool.name);
          const theme = getToolTheme(tool.icon_key, tool.name);
          // No skill hovered = every tool is normal; otherwise split into on/off.
          // Compare case-insensitively so "N8N" still matches the "n8n" tool.
          let state = '';
          if (highlightNames) {
            const matched = highlightNames.some(
              (n) => n.toLowerCase() === tool.name.toLowerCase()
            );
            state = matched ? 'is-active' : 'is-dimmed';
          }
          return (
            <span key={tool.name} className={`about-skill-chip shrink-0 ${state}`}>
              <span className="about-skill-chip-icon" style={{ color: theme.icon }}>
                <Icon color={theme.icon} />
              </span>
              {tool.name}
            </span>
          );
        })}
      </IconContext.Provider>
    </div>
  );
}

function TrackCard({
  title,
  skills,
  tools,
  isPrimary = false,
  className = '',
}: {
  title: string;
  skills: { name: string; icon: LucideIcon }[];
  tools: ToolItem[];
  isPrimary?: boolean;
  className?: string;
}) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const highlightNames = activeSkill ? skillTools[activeSkill] ?? [] : null;

  return (
    <section className={`about-bento-card about-track-card about-stagger ${className}`}>
      <div className="about-track-head">
        <h4
          className={`font-bold text-secondary-color ${isPrimary ? 'text-base' : 'text-sm'}`}
        >
          {title}
        </h4>
      </div>

      <div className="about-track-body">
        <div className="about-track-group about-track-group-grow">
          <p className="about-card-label">Skills</p>
          <SkillTiles skills={skills} activeSkill={activeSkill} onHover={setActiveSkill} />
        </div>

        <div className="about-track-group">
          <p className="about-card-label">Tools I use</p>
          <ToolChips tools={tools} highlightNames={highlightNames} />
        </div>
      </div>
    </section>
  );
}

export default function AboutProfessional({ profile }: AboutProfessionalProps) {
  const name = profileValue(profile.name, fallbackChatProfile.name);
  const work = profileValue(profile.work, fallbackChatProfile.work);
  const languages = profileValue(profile.languages, fallbackChatProfile.languages);

  return (
    <div className="about-bento about-bento-pro">
      <article className="about-hero-card about-hero-card-pro about-stagger">
        <img
          src={PROFILE_AVATAR}
          alt=""
          className="about-hero-avatar rounded-2xl object-cover object-top ring-1 ring-black/10 dark:ring-white/10"
        />
        <div className="about-hero-body">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-main-color">
            Technical
          </p>
          <h3 className="mt-0.5 text-2xl font-bold tracking-tight text-secondary-color sm:text-3xl">
            {name}
          </h3>
          <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{work}</p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">{languages}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {professionalRoles.map((role) => (
              <span key={role} className="about-chip">
                <span className="h-1.5 w-1.5 rounded-full bg-main-color" />
                {role}
              </span>
            ))}
          </div>
        </div>
      </article>

      <section className="about-bento-card about-highlights-card about-stagger">
        <p className="about-card-label">Highlights</p>
        <div className="about-detail-list">
          {professionalHighlights.map((highlight) => (
            <div key={highlight.label} className="about-detail-row about-stat-row">
              <span className="about-stat-value">{highlight.value}</span>
              <span className="about-card-label">{highlight.label}</span>
            </div>
          ))}
        </div>
      </section>

      <TrackCard
        title="Development"
        skills={developmentSkills}
        tools={developmentTools}
        isPrimary
        className="about-track-dev"
      />

      <TrackCard
        title="Creative"
        skills={creativeSkills}
        tools={creativeTools}
        className="about-track-creative"
      />

      <section className="about-bento-card about-workflow-card about-stagger">
        <p className="about-card-label">How i build automations</p>
        <div className="about-detail-list">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="about-detail-row">
              <span className="about-step-badge">{index + 1}</span>
              <div className="about-detail-text">
                <p className="about-step-title">{step.title}</p>
                <p className="about-step-detail">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-bento-card about-focus-card about-stagger">
        <p className="about-card-label">Focus</p>
        <div className="about-detail-list">
          {professionalFocus.map((item) => (
            <div key={item.label} className="about-detail-row">
              <div className="about-detail-text">
                <p className="about-card-label">{item.label}</p>
                <p className="about-detail-value about-detail-value-single">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
