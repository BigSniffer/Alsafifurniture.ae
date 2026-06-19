import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

const items = ["experience", "projects", "rating", "inhouse"] as const;

export function StatsBand() {
  const t = useTranslations("stats");

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[var(--color-cream)]/15 bg-[var(--color-cream)]/15 lg:grid-cols-4">
      {items.map((key, i) => (
        <Reveal
          key={key}
          delay={(i % 4) * 0.08}
          className="bg-[var(--color-brown)] px-5 py-8 text-center sm:py-10"
        >
          <p className="font-serif text-4xl text-[var(--color-cream)] sm:text-5xl">
            {t(`items.${key}.value`)}
          </p>
          <p className="mt-3 text-[0.68rem] uppercase tracking-[0.14em] text-[var(--color-cream)]/65">
            {t(`items.${key}.label`)}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
