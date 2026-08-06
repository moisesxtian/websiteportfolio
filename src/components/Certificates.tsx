import { Award, ExternalLink } from 'lucide-react';
import { useCertificates } from '../Hooks/useCertificates';

const Certificates = () => {
  const { certificates } = useCertificates();

  return (
    <section
      id="Certificates"
      className="section-cut font-poppins text-secondary-color py-8 sm:py-10 md:py-14 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-main-color">
              <Award size={12} />
              Credentials
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              Certificates
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              A compact look at courses I&apos;ve completed along the way.
            </p>
          </div>
          <p className="text-xs text-gray-400 tabular-nums">{certificates.length} items</p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {certificates.map((certificate) => (
            <article
              key={certificate.id}
              className="group snap-start flex w-[200px] sm:w-[220px] flex-shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-main-color/30 hover:shadow-md dark:border-gray-700 dark:bg-neutral-900"
            >
              <div className="relative h-28 overflow-hidden bg-gray-100 dark:bg-neutral-800">
                <img
                  src={certificate.image_url}
                  alt={certificate.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-main-color">
                  {certificate.organization || 'Issuer'}
                </p>
                <h3 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2 dark:text-gray-100">
                  {certificate.name}
                </h3>
                <a
                  href={certificate.certificate_link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 pt-1 text-[11px] font-medium text-gray-500 hover:text-main-color dark:text-gray-400"
                >
                  View
                  <ExternalLink size={11} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
