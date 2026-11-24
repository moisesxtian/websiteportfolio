import type { ReactNode } from 'react';
import {
  fallbackChatProfile,
  isEmptyProfileValue,
  PERSONAL_AVATAR,
  profileValue,
} from '../data/profile';
import { aboutHobbies, aboutInterests } from '../data/about';
import type { ChatProfileData } from '../types/content';
import NowPlaying from './NowPlaying';

type AboutPersonalProps = {
  profile: ChatProfileData;
};

/** Words separated by a quiet slash, like a handwritten list. */
export function InlineList({ items }: { items: string[] }) {
  return (
    <span>
      {items.map((item, index) => (
        <span key={item}>
          <span className="whitespace-nowrap">
            {item}
            {index < items.length - 1 ? (
              <span className="ml-1.5 text-gray-300 dark:text-gray-600" aria-hidden="true">
                /
              </span>
            ) : null}
          </span>{' '}
        </span>
      ))}
    </span>
  );
}

export function AboutFigure({
  src,
  fallback,
  figure,
  caption,
  tilt,
}: {
  src: string;
  fallback?: string;
  figure: string;
  caption: string;
  tilt: 'left' | 'right';
}) {
  return (
    <figure className="about-figure">
      <div className={`about-photo ${tilt === 'right' ? 'is-right' : ''}`}>
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover object-top"
          onError={
            fallback
              ? (event) => {
                  event.currentTarget.src = fallback;
                }
              : undefined
          }
        />
      </div>
      <figcaption className="about-mono mt-3 text-[11px] leading-snug text-gray-500 dark:text-gray-400">
        <span className="text-main-color">{figure}</span> — {caption}
      </figcaption>
    </figure>
  );
}

export default function AboutPersonal({ profile }: AboutPersonalProps) {
  const name = profileValue(profile.name, fallbackChatProfile.name);
  const about = profileValue(profile.about, fallbackChatProfile.about);
  const funFact = profileValue(profile.funFact, fallbackChatProfile.funFact);
  const languages = profileValue(profile.languages, fallbackChatProfile.languages);
  const age = profile.age;

  const rows: { label: string; value: ReactNode }[] = [
    { label: 'Hobbies', value: <InlineList items={aboutHobbies} /> },
    { label: 'Interests', value: <InlineList items={aboutInterests} /> },
  ];
  if (!isEmptyProfileValue(age)) rows.push({ label: 'Age', value: age });
  if (!isEmptyProfileValue(languages)) rows.push({ label: 'Speaks', value: languages });
  if (!isEmptyProfileValue(funFact)) rows.push({ label: 'Fun fact', value: funFact });
  rows.push({ label: 'On repeat', value: <NowPlaying variant="inline" /> });

  return (
    <div className="about-layout">
      <AboutFigure
        src={profileValue(profile.personalAvatar, PERSONAL_AVATAR)}
        figure="fig. 01"
        caption={`${name}, off the clock`}
        tilt="left"
      />

      <div className="min-w-0">
        <p className="about-lead">{about}</p>

        <dl className="about-index">
          {rows.map((row, index) => (
            <div key={row.label} className="about-index-row">
              <dt className="about-index-key">
                <span className="about-mono text-main-color">{String(index + 1).padStart(2, '0')}</span>
                {row.label}
              </dt>
              <dd className="about-index-value">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
