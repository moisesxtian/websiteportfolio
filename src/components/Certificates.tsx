import { useMemo, useState } from 'react';
import { Award, Building2, ExternalLink, LayoutGrid } from 'lucide-react';
import { ReactTyped } from 'react-typed';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCertificates } from '../Hooks/useCertificates';

AOS.init({
  startEvent: 'load',
  easing: 'ease-out-cubic',
  once: true,
  duration: 450,
});

const Certificates = () => {
  const { certificates } = useCertificates();
  const [activeOrg, setActiveOrg] = useState<string>('All');

  const organizations = useMemo(() => {
    const unique = Array.from(
      new Set(certificates.map((c) => c.organization).filter(Boolean))
    );
    return ['All', ...unique];
  }, [certificates]);

  const filtered =
    activeOrg === 'All'
      ? certificates
      : certificates.filter((c) => c.organization === activeOrg);

  return (
    <section
      id="Certificates"
      className="section-page section-cut font-poppins text-secondary-color bg-gradient-to-b from-white via-orange-50/30 to-white"
    >
      <div className="section-page-inner gap-8 md:gap-10">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-xl" data-aos="fade-up">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-main-color shadow-sm">
              <Award size={13} />
              Credentials
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              <ReactTyped strings={['Certificates']} typeSpeed={25} showCursor={false} />
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Structured proof of the courses and credentials behind my craft — filter by issuer or
              browse the full set.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-3"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm min-w-[120px]">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                Total
              </p>
              <p className="text-2xl font-bold text-secondary-color tabular-nums">
                {certificates.length}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm min-w-[120px]">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                Issuers
              </p>
              <p className="text-2xl font-bold text-secondary-color tabular-nums">
                {Math.max(organizations.length - 1, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div
          className="flex flex-wrap items-center gap-2"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 mr-1">
            <LayoutGrid size={13} />
            Filter
          </span>
          {organizations.map((org) => (
            <button
              key={org}
              type="button"
              onClick={() => setActiveOrg(org)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium border transition ${
                activeOrg === org
                  ? 'bg-main-color text-white border-main-color'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-main-color/40 hover:text-main-color'
              }`}
            >
              {org}
            </button>
          ))}
        </div>

        {/* Structured grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((certificate, index) => (
            <article
              key={certificate.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-main-color/30 hover:shadow-[0_20px_40px_-28px_rgba(249,115,22,0.45)]"
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 60, 240)}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={certificate.image_url}
                  alt={certificate.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-700 shadow-sm">
                  <Building2 size={11} className="text-main-color" />
                  {certificate.organization || 'Issuer'}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-main-color transition-colors">
                  {certificate.name}
                </h3>
                {certificate.description ? (
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {certificate.description}
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-gray-400 italic">Verified credential</p>
                )}

                <div className="mt-auto pt-4">
                  <a
                    href={certificate.certificate_link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary-color px-4 py-2.5 text-sm font-medium text-white transition hover:bg-main-color"
                  >
                    View certificate
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-8">No certificates for this filter.</p>
        ) : null}
      </div>
    </section>
  );
};

export default Certificates;
