import {
  fallbackChatProfile,
  isEmptyProfileValue,
  PERSONAL_AVATAR,
  profileValue,
} from '../data/profile';
import {
  aboutHobbies,
  aboutInterests,
  getHobbyIcon,
  getInterestIcon,
} from '../data/about';
import type { ChatProfileData } from '../types/content';
import { BookOpen, Cake, Hammer, Languages, Sparkles } from 'lucide-react';
import NowPlaying from './NowPlaying';

type AboutPersonalProps = {
  profile: ChatProfileData;
};

export default function AboutPersonal({ profile }: AboutPersonalProps) {
  const name = profileValue(profile.name, fallbackChatProfile.name);
  const about = profileValue(profile.about, fallbackChatProfile.about);
  const currentlyBuilding = profileValue(
    profile.currentlyBuilding,
    fallbackChatProfile.currentlyBuilding
  );
  const currentlyLearning = profileValue(
    profile.currentlyLearning,
    fallbackChatProfile.currentlyLearning
  );
  const funFact = profileValue(profile.funFact, fallbackChatProfile.funFact);

  const currentlyItems = [
    { label: 'Building', value: currentlyBuilding, icon: Hammer },
    { label: 'Learning', value: currentlyLearning, icon: BookOpen },
  ];

  // A single list keeps the card full instead of leaving holes when a value is blank.
  const facts = [
    { label: 'Age', value: profile.age, icon: Cake },
    {
      label: 'Languages',
      value: profileValue(profile.languages, fallbackChatProfile.languages),
      icon: Languages,
    },
    { label: 'Fun fact', value: funFact, icon: Sparkles },
  ].filter((fact) => !isEmptyProfileValue(fact.value));

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

      <section className="about-bento-card about-currently-card about-stagger">
        <p className="about-card-label">Currently</p>
        <div className="about-detail-list">
          {currentlyItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="about-detail-row">
                <span className="about-row-icon">
                  <Icon size={15} />
                </span>
                <div className="about-detail-text">
                  <p className="about-card-label">{item.label}</p>
                  <p className="about-detail-value">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="about-music-slot about-stagger">
        <NowPlaying variant="card" />
      </div>

      <section className="about-bento-card about-interest-card about-stagger">
        <p className="about-card-label">Interests</p>
        <div className="about-interest-list">
          {aboutInterests.map((interest) => {
            const Icon = getInterestIcon(interest);
            return (
              <div key={interest} className="about-interest-row">
                <span className="about-row-icon">
                  <Icon size={15} />
                </span>
                <span className="text-xs font-medium text-secondary-color">{interest}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="about-hobbies about-stagger">
        <p className="about-card-label mb-1.5">Hobbies</p>
        <div className="about-hobby-grid">
          {aboutHobbies.map((hobby) => {
            const Icon = getHobbyIcon(hobby);
            return (
              <div key={hobby} className="about-bento-card about-mini-tile">
                <span className="text-main-color">
                  <Icon size={18} />
                </span>
                <p className="text-[11px] font-semibold text-secondary-color">{hobby}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="about-bento-card about-facts-card about-stagger">
        <p className="about-card-label">Quick facts</p>
        <div className="about-detail-list">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div key={fact.label} className="about-detail-row">
                <span className="about-row-icon">
                  <Icon size={15} />
                </span>
                <div className="about-detail-text">
                  <p className="about-card-label">{fact.label}</p>
                  <p className="about-detail-value">{fact.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
