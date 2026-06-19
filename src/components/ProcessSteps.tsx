import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

const steps = ["concept", "design", "manufacturing", "installation"] as const;
const stepAccents = [
  "var(--color-accent-warm)",
  "var(--color-brown-soft)",
  "var(--color-google-star)",
  "var(--color-whatsapp)",
];

export function ProcessSteps() {
  const t = useTranslations("process.steps");

  return (
    <div className="relative">
      <div
        className="absolute top-5 bottom-5 w-px bg-gradient-to-b from-transparent via-[var(--color-line-strong)] to-transparent ltr:left-[5px] rtl:right-[5px] lg:hidden"
        aria-hidden="true"
      />
      <div
        className="absolute top-[2.6rem] hidden h-px bg-gradient-to-r from-transparent via-[var(--color-line-strong)] to-transparent lg:block ltr:left-[8%] ltr:right-[8%] rtl:right-[8%] rtl:left-[8%]"
        aria-hidden="true"
      />

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((key, i) => (
          <Reveal key={key} delay={i * 0.08}>
            <article className="relative ltr:pl-8 rtl:pr-8 lg:px-0">
              <div
                className="absolute top-1.5 h-3 w-3 rounded-full ring-4 ring-[var(--color-cream-deep)] ltr:left-0 rtl:right-0 lg:relative lg:top-0 lg:mb-6"
                style={{ backgroundColor: stepAccents[i] }}
                aria-hidden="true"
              />
              <p className="font-serif text-3xl text-[var(--color-brown)]/20 lg:mb-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl text-[var(--color-brown)] lg:mt-0">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-brown-soft)]">
                {t(`${key}.description`)}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
