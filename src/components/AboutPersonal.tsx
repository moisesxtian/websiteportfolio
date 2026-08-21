import {
  fallbackChatProfile,
  isEmptyProfileValue,
  PERSONAL_AVATAR,
  profileValue,
} from '../data/profile';
import {
  aboutHobbies,
  aboutInterests,
} from '../data/about';
import type { ChatProfileData } from '../types/content';
import NowPlaying from './NowPlaying';

type AboutPersonalProps = {
  profile: ChatProfileData;
};

export default function AboutPersonal({ profile }: AboutPersonalProps) {
  const name = profileValue(profile.name, fallbackChatProfile.name);
  const about = profileValue(profile.about, fallbackChatProfile.about);
  const funFact = profileValue(profile.funFact, fallbackChatProfile.funFact);
  const age = profile.age;
  const languages = profileValue(profile.languages, fallbackChatProfile.languages);

  const hasAge = !isEmptyProfileValue(age);
  const hasLanguages = !isEmptyProfileValue(languages);
  const hasFunFact = !isEmptyProfileValue(funFact);
  const hasPrimaryFacts = hasAge || hasLanguages;
  const hasQuickFacts = hasPrimaryFacts || hasFunFact;

  const renderFactRow = (label: string, value: string | number, className = '') => (
    <div className={`about-detail-row ${className}`.trim()}>
      <div className="about-detail-text">
        <p className="about-card-label">{label}</p>
        <p className="about-detail-value">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="about-bento about-bento-personal">
      <article className="about-hero-card about-hero-card-personal about-stagger">
        <img
          src={profileValue(profile.personalAvatar, PERSONAL_AVATAR)}
          alt=""
          className="about-hero-avatar rounded-2xl object-cover object-top ring-1 ring-black/5 dark:ring-white/10"
        />
        <div className="about-hero-body">
          <h3 className="text-3xl font-bold tracking-tight text-secondary-color sm:text-4xl">
            {name}
          </h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {about}
          </p>
        </div>
      </article>

      <section className="about-bento-card about-hobby-card about-stagger">
        <p className="about-card-label">Hobbies</p>
        <div className="about-interest-list">
          {aboutHobbies.map((hobby) => (
            <div key={hobby} className="about-interest-row">
              <span className="text-xs font-medium text-secondary-color">{hobby}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="about-music-slot about-stagger">
        <NowPlaying variant="card" />
      </div>

      <section className="about-bento-card about-interest-card about-stagger">
        <p className="about-card-label">Interests</p>
        <div className="about-interest-list">
          {aboutInterests.map((interest) => (
            <div key={interest} className="about-interest-row">
              <span className="text-xs font-medium text-secondary-color">{interest}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-bento-card about-facts-card about-stagger">
        <p className="about-card-label">Quick facts</p>
        {hasQuickFacts ? (
          <div className="about-facts-body">
            {hasPrimaryFacts ? (
              <div className="about-facts-primary">
                {hasAge ? renderFactRow('Age', age) : null}
                {hasLanguages ? renderFactRow('Languages', languages) : null}
              </div>
            ) : null}
            {hasFunFact ? renderFactRow('Fun fact', funFact, 'about-facts-fun-row') : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
