/** Local PNG fallbacks were converted to WebP. Remap old URLs so live data still loads. */
export function toLocalWebp(url: string | null | undefined): string {
  if (!url) return '';
  if (url === '/chan-avatar.png') return '/chan-avatar.webp';

  const isLocalAsset =
    url.startsWith('/assets/Projects/') ||
    url.startsWith('/assets/Certificates/') ||
    url.startsWith('/assets/Experience/');
  if (isLocalAsset && url.toLowerCase().endsWith('.png')) {
    return url.slice(0, -4) + '.webp';
  }

  return url;
}
