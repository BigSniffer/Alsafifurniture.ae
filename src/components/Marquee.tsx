import { useTranslations } from "next-intl";

export function Marquee() {
  const t = useTranslations("marquee");
  const items = t("items");

  return (
    <div className="border-y border-[var(--color-line)] bg-[var(--color-brown)] py-4 text-[var(--color-cream)]">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="px-6 font-serif text-base tracking-[0.04em] text-[var(--color-cream)]/85 sm:text-lg"
            >
              {items}
              <span className="px-6 text-[var(--color-accent-warm)]">·</span>
            </span>
          ))}
        </div>
      </div>
      <span className="sr-only">{items}</span>
    </div>
  );
}
