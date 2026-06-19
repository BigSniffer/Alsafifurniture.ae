import type { CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

const allServices = [
  "joinery",
  "kitchens",
  "wardrobes",
  "paneling",
  "furniture",
  "upholstery",
  "interiors",
  "consultation",
] as const;

const serviceMeta: Record<
  (typeof allServices)[number],
  { image: string; accent: string }
> = {
  joinery: { image: "/images/gallery-joinery.jpg", accent: "#9a7b4f" },
  kitchens: { image: "/images/gallery-kitchen.jpg", accent: "#c4a574" },
  wardrobes: { image: "/images/gallery-wardrobe.jpg", accent: "#7d6655" },
  paneling: { image: "/images/gallery-paneling.jpg", accent: "#8b7355" },
  furniture: { image: "/images/gallery-hospitality.jpg", accent: "#a6896a" },
  upholstery: { image: "/images/gallery-paneling.jpg", accent: "#b8956a" },
  interiors: { image: "/images/gallery-reception.jpg", accent: "#6b7d8f" },
  consultation: { image: "/images/about-craft.jpg", accent: "#25d366" },
};

export function ServicesGrid({ limit }: { limit?: number }) {
  const t = useTranslations("services.items");
  const keys = limit ? allServices.slice(0, limit) : allServices;

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2 lg:gap-6 xl:grid-cols-4">
      {keys.map((key, i) => {
        const meta = serviceMeta[key];
        return (
          <Reveal
            key={key}
            delay={(i % 4) * 0.07}
            className="group service-card overflow-hidden"
            style={{ "--service-accent": meta.accent } as CSSProperties}
          >
            <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
              <Image
                src={meta.image}
                alt={t(`${key}.title`)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brown)]/75 via-[var(--color-brown)]/15 to-transparent" />
              <span className="service-card-index">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="service-card-body">
              <h3 className="text-lg text-[var(--color-brown)] sm:text-xl">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-brown-soft)]">
                {t(`${key}.description`)}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
