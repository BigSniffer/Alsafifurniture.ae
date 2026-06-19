import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/assets";
import { Reveal } from "./Reveal";

const items = [
  { key: "wood", image: "/images/materials/wood.jpg?v=2" },
  { key: "stone", image: "/images/materials/stone.jpg?v=2" },
  { key: "metal", image: "/images/materials/metal.jpg?v=2" },
  { key: "finish", image: "/images/materials/finish.jpg?v=2" },
] as const;

export function Materials() {
  const t = useTranslations("materials");

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {items.map(({ key, image }, i) => (
        <Reveal
          key={key}
          delay={(i % 4) * 0.08}
          className="group overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-cream)] transition-shadow duration-500 hover:shadow-[0_18px_40px_-26px_rgba(60,36,21,0.4)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={asset(image)}
              alt={t(`items.${key}.title`)}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brown)]/25 to-transparent" />
          </div>
          <div className="p-6 sm:p-7">
            <h3 className="text-lg text-[var(--color-brown)]">
              {t(`items.${key}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-brown-soft)]">
              {t(`items.${key}.description`)}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
