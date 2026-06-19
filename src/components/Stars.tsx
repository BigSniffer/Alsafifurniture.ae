export function Stars({
  rating,
  className,
  variant = "default",
}: {
  rating: number;
  className?: string;
  variant?: "default" | "google";
}) {
  const filled = variant === "google" ? "var(--color-google-star)" : "currentColor";

  return (
    <div
      className={`flex items-center gap-1 ${className ?? ""}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill={i < rating ? filled : "none"}
          stroke={i < rating ? filled : "currentColor"}
          strokeWidth={1.2}
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.8l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}
