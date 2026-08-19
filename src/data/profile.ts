import type { ChatProfileData } from '../types/content';

export const PROFILE_AVATAR = '/chan-avatar.webp';

/** Used until About Chan is saved from /admin */
export const fallbackChatProfile: ChatProfileData = {
  name: 'Christian Moises',
  nickname: 'Chan',
  relationship: 'Placeholder',
  age: 'Placeholder',
  work: 'Full Stack Developer',
  location: 'Metro Manila, Philippines',
  languages: 'English, Filipino',
  interests: 'Generative AI, Machine Learning, Crypto, Gaming, Automation',
  hobbies: 'Video Games, Digital Art, Chess, Photography, Cycling',
  about:
    'I mix engineering with design — building products that feel considered, then wiring up the AI and automation that make them useful.',
  currentlyBuilding: 'Add what you are working on',
  currentlyLearning: 'Add what you are picking up',
  funFact: 'Add a short fun fact about you',
};

export function isEmptyProfileValue(value: string | undefined | null): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  return trimmed === '' || trimmed.toLowerCase() === 'placeholder';
}

export function profileValue(value: string | undefined | null, fallback: string): string {
  if (isEmptyProfileValue(value) || !value) return fallback;
  return value.trim();
}

/** Turns "music, photography, gaming" into chips. Skips empty / Placeholder items. */
export function splitProfileList(value: string | undefined | null): string[] {
  if (isEmptyProfileValue(value) || !value) return [];

  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item !== '' && item.toLowerCase() !== 'placeholder');
}
