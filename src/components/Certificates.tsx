import { useEffect, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { useCertificates } from '../Hooks/useCertificates';
import { toLocalWebp } from '../lib/assets';
import type { Certificate } from '../types/content';
import ScrollReveal from './ScrollReveal';

type CertificatesProps = {
  embedded?: boolean;
};

const Certificates = ({ embedded = false }: CertificatesProps) => {
  const { certificates } = useCertificates(true);
  const [openCertificate, setOpenCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!openCertificate) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenCertificate(null);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openCertificate]);

  const body = (
    <>
      <ScrollReveal className="mb-2 flex items-baseline justify-between gap-4">
        <div>
          <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-main-color">
            Credentials
          </p>
          <h2 className="text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl dark:text-gray-100">
            Certificates
          </h2>
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          {certificates.length}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="grid grid-cols-1 gap-x-8 border-t border-gray-200/80 sm:grid-cols-2 lg:grid-cols-3 dark:border-gray-800">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="flex items-center justify-between gap-3 border-b border-gray-200/80 py-2 dark:border-gray-800"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {certificate.name}
                </p>
                <p className="truncate text-[11px] text-gray-500 dark:text-gray-400">
                  {certificate.organization || 'Issuer'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpenCertificate(certificate)}
                className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-gray-500 transition hover:text-main-color dark:text-gray-400"
              >
                View
                <Maximize2 size={11} />
              </button>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </>
  );

  return (
    <>
      {embedded ? (
        <div id="Certificates" className="w-full shrink-0 pt-2">
          {body}
        </div>
      ) : (
        <section
          id="Certificates"
          className="py-8 font-poppins text-secondary-color sm:py-10"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-10">{body}</div>
        </section>
      )}

      {openCertificate ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpenCertificate(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-neutral-950"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenCertificate(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 hover:bg-white dark:bg-neutral-800 dark:text-gray-100 dark:hover:bg-neutral-700"
              aria-label="Close certificate"
            >
              <X size={18} />
            </button>
            <img
              src={toLocalWebp(openCertificate.image_url)}
              alt={openCertificate.name}
              className="max-h-[78vh] w-full bg-neutral-100 object-contain dark:bg-neutral-900"
            />
            <div className="px-4 py-3">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {openCertificate.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {openCertificate.organization || 'Issuer'}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Certificates;
