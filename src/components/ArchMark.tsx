/**
 * Simplified arch motif derived from the Al Safi logo icon.
 * Used as a quiet, recurring brand accent across sections.
 */
export function ArchMark({
  className,
  strokeWidth = 1.4,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 82V32a26 26 0 0 1 52 0v50" />
        <path d="M15 82V36a17 17 0 0 1 34 0v46" />
        <path d="M24 82V54c0-6 3.6-12 8-12s8 6 8 12v28" />
        <line x1="4" y1="82" x2="60" y2="82" />
      </g>
    </svg>
  );
}
