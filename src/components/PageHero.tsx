import Image from "next/image";
import { Reveal } from "./Reveal";
import { ArchMark } from "./ArchMark";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-cream-deep)] pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20">
      <ArchMark className="pointer-events-none absolute -top-8 h-[min(70vw,28rem)] w-auto text-[var(--color-brown)] opacity-[0.04] ltr:-right-8 rtl:-left-8 rtl:scale-x-[-1]" />

      <div
        className={`container-luxe relative grid items-center gap-10 lg:gap-16 ${
          image ? "lg:grid-cols-[1.05fr_0.95fr]" : "max-w-4xl"
        }`}
      >
        <div>
          <Reveal>
            <p className="eyebrow mb-4 sm:mb-5">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-[2.15rem] leading-[1.08] text-[var(--color-brown)] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </Reveal>
          {subtitle ? (
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-brown-soft)] sm:mt-6 sm:text-lg">
                {subtitle}
              </p>
            </Reveal>
          ) : null}
          <Reveal delay={0.15}>
            <div className="mt-7 flex gap-1.5 sm:mt-8" aria-hidden="true">
              <span className="h-1 w-10 rounded-full bg-[var(--color-brown)]" />
              <span className="h-1 w-6 rounded-full bg-[var(--color-accent-warm)]" />
              <span className="h-1 w-4 rounded-full bg-[var(--color-whatsapp)] opacity-70" />
            </div>
          </Reveal>
        </div>

        {image ? (
          <Reveal delay={0.12} className="relative">
            <ArchMark className="pointer-events-none absolute -top-4 z-10 h-16 w-auto text-[var(--color-brown)] opacity-20 ltr:-left-2 rtl:-right-2 rtl:scale-x-[-1] sm:h-20" />
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cream)] shadow-[0_24px_60px_-30px_rgba(60,36,21,0.45)] ring-1 ring-[var(--color-line)] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={image}
                alt={imageAlt ?? title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brown)]/25 via-transparent to-transparent" />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
