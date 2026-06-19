import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

const items = ["scope", "areas", "existing", "timeline", "quality"] as const;

export function Faq() {
  const t = useTranslations("faq");

  return (
    <div className="mx-auto max-w-3xl">
      <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
        {items.map((key, i) => (
          <Reveal key={key} delay={(i % 5) * 0.05}>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-start">
                <span className="text-base text-[var(--color-brown)] sm:text-lg">
                  {t(`items.${key}.question`)}
                </span>
                <span
                  className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center text-[var(--color-accent-warm)]"
                  aria-hidden="true"
                >
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                  <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-brown-soft)] sm:text-[0.95rem]">
                {t(`items.${key}.answer`)}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
