import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/assets";
import { Reveal } from "./Reveal";

const sectors = [
  { key: "residential", image: "/images/gallery-kitchen.jpg" },
  { key: "commercial", image: "/images/gallery-reception.jpg" },
  { key: "hospitality", image: "/images/gallery-hospitality.jpg" },
] as const;

export function Sectors() {
  const t = useTranslations("sectors");

  return (
    <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
      {sectors.map(({ key, image }, i) => (
        <Reveal
          key={key}
          delay={i * 0.1}
          className="group relative overflow-hidden rounded-sm"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={asset(image)}
              alt={t(`items.${key}.title`)}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brown)]/90 via-[var(--color-brown)]/25 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <span
              className="mb-3 block h-0.5 w-8 rounded-full bg-[var(--color-accent-warm)] transition-all duration-700 group-hover:w-12"
              aria-hidden="true"
            />
            <h3 className="font-serif text-2xl text-[var(--color-cream)]">
              {t(`items.${key}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/80">
              {t(`items.${key}.description`)}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
