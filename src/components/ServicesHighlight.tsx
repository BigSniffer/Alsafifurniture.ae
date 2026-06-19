import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

const highlights = ["craft", "materials", "delivery"] as const;

export function ServicesHighlight() {
  const t = useTranslations("services.highlights");

  return (
    <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
      {highlights.map((key, i) => (
        <Reveal
          key={key}
          delay={i * 0.08}
          className="rounded-sm border border-[var(--color-line)] bg-[var(--color-cream)] p-5 sm:p-6"
        >
          <span
            className="mb-4 inline-block h-1 w-8 rounded-full"
            style={{
              backgroundColor:
                i === 0
                  ? "var(--color-accent-warm)"
                  : i === 1
                    ? "var(--color-brown-soft)"
                    : "var(--color-whatsapp)",
            }}
            aria-hidden="true"
          />
          <h3 className="text-lg text-[var(--color-brown)]">{t(`${key}.title`)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-brown-soft)]">
            {t(`${key}.description`)}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
