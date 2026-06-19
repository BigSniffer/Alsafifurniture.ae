import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { ArchMark } from "./ArchMark";

export function Philosophy() {
  const t = useTranslations("philosophy");

  return (
    <div className="relative mx-auto max-w-4xl text-center">
      <ArchMark className="pointer-events-none mx-auto mb-8 h-12 w-auto text-[var(--color-cream)] opacity-40" />
      <Reveal>
        <blockquote className="font-serif text-2xl leading-snug text-[var(--color-cream)] sm:text-3xl lg:text-[2.5rem] lg:leading-[1.25]">
          <span className="text-[var(--color-accent-warm)]">&ldquo;</span>
          {t("quote")}
          <span className="text-[var(--color-accent-warm)]">&rdquo;</span>
        </blockquote>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[var(--color-accent-warm)]" aria-hidden="true" />
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-cream)]/70">
            {t("attribution")}
          </p>
          <span className="h-px w-8 bg-[var(--color-accent-warm)]" aria-hidden="true" />
        </div>
      </Reveal>
    </div>
  );
}
