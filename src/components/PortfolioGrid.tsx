import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

const projects = [
  { key: "kitchen", src: "/images/gallery-kitchen.jpg" },
  { key: "wardrobe", src: "/images/gallery-wardrobe.jpg" },
  { key: "paneling", src: "/images/gallery-paneling.jpg" },
  { key: "joinery", src: "/images/gallery-joinery.jpg" },
  { key: "hospitality", src: "/images/gallery-hospitality.jpg" },
  { key: "reception", src: "/images/gallery-reception.jpg" },
] as const;

export function PortfolioGrid() {
  const t = useTranslations("portfolio");

  return (
    <div>
      <div className="grid gap-3 overflow-hidden sm:gap-px sm:border sm:border-[var(--color-line)] sm:bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal
            key={p.key}
            delay={(i % 3) * 0.08}
            className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-[var(--color-cream-deep)] sm:rounded-none"
          >
            <Image
              src={p.src}
              alt={t(`categories.${p.key}`)}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brown)]/70 via-[var(--color-brown)]/10 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <span className="block h-px w-8 bg-[var(--color-cream)]/50 transition-all duration-700 group-hover:w-12" />
              <p className="mt-4 text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-cream)]">
                {t(`categories.${p.key}`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          {t("followCta")} · {site.social.instagramHandle}
        </a>
      </div>
    </div>
  );
}
