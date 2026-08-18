import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useCertificates } from '../Hooks/useCertificates';
import { toLocalWebp } from '../lib/assets';
import ScrollReveal from './ScrollReveal';

const Certificates = () => {
  const { certificates } = useCertificates(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('article');
    const amount = card ? card.getBoundingClientRect().width + 12 : 220;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <section
      id="Certificates"
      className="font-poppins text-secondary-color py-10 sm:py-12 md:py-16 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <ScrollReveal className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-main-color">
              Credentials
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              Certificates
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="inline-flex h-8 w-8 items-center justify-center text-gray-500 transition hover:text-main-color dark:text-gray-400"
              aria-label="Previous certificates"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="inline-flex h-8 w-8 items-center justify-center text-gray-500 transition hover:text-main-color dark:text-gray-400"
              aria-label="Next certificates"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div
            ref={trackRef}
            className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory"
          >
            {certificates.map((certificate) => (
              <article
                key={certificate.id}
                className="snap-start flex w-[200px] sm:w-[220px] flex-shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-neutral-900"
              >
                <div className="h-28 overflow-hidden bg-gray-100 dark:bg-neutral-800">
                  <img
                    src={toLocalWebp(certificate.image_url)}
                    alt={certificate.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 p-3">
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {certificate.organization || 'Issuer'}
                  </p>
                  <h3 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2 dark:text-gray-100">
                    {certificate.name}
                  </h3>
                  <a
                    href={certificate.certificate_link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 pt-1 text-[11px] text-gray-500 hover:text-main-color dark:text-gray-400"
                  >
                    View
                    <ExternalLink size={11} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Certificates;
