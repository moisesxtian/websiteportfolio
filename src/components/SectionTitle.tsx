/** Plain section heading with the site's orange full stop. */
export default function SectionTitle({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  return (
    <h2 className={`section-title ${className}`.trim()}>
      {text}
      <span className="text-main-color" aria-hidden="true">
        .
      </span>
    </h2>
  );
}
