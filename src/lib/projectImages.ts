import { toLocalWebp } from './assets';
import type { Project } from '../types/content';

export function projectImages(project: Project): string[] {
  const seen = new Set<string>();
  const images: string[] = [];

  const add = (url?: string | null) => {
    const next = toLocalWebp(url);
    if (!next || seen.has(next)) return;
    seen.add(next);
    images.push(next);
  };

  add(project.image_url);
  add(project.hover_image_url);
  (project.gallery_urls ?? []).forEach(add);

  return images;
}
