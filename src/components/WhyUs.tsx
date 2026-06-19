import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const items = [
  { key: "inhouse", accent: "var(--color-accent-warm)" },
  { key: "accountability", accent: "var(--color-google-star)" },
  { key: "materials", accent: "var(--color-brown-soft)" },
  { key: "precision", accent: "var(--color-whatsapp)" },
] as const;

export function WhyUs() {
  const t = useTranslations("whyUs");

  return (
    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
      </div>

      <div className="grid gap-px overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
        {items.map(({ key, accent }, i) => (
          <Reveal
            key={key}
            delay={(i % 2) * 0.08}
            className="bg-[var(--color-cream)] p-7 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span
                className="font-serif text-2xl text-[var(--color-brown)]/30"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="h-px flex-1"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-5 text-lg text-[var(--color-brown)] sm:text-xl">
              {t(`items.${key}.title`)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-brown-soft)]">
              {t(`items.${key}.description`)}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
