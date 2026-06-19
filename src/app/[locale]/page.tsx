import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ServicesGrid } from "@/components/ServicesGrid";
import { WhyUs } from "@/components/WhyUs";
import { StatsBand } from "@/components/StatsBand";
import { Sectors } from "@/components/Sectors";
import { Materials } from "@/components/Materials";
import { Philosophy } from "@/components/Philosophy";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { ReviewsBadge } from "@/components/ReviewsBadge";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Reveal } from "@/components/Reveal";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <>
      <Hero />

      <Marquee />

      {/* Intro */}
      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <SectionHeading
            eyebrow={t("intro.eyebrow")}
            title={t("intro.title")}
          />
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-[var(--color-brown-soft)]">
              {t("intro.body")}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[var(--color-line)] pt-8 sm:mt-10 sm:grid-cols-3 sm:gap-6">
              {["stat1", "stat2", "stat3"].map((s, i) => (
                <div key={s}>
                  <span
                    className="stat-accent"
                    style={{
                      background:
                        i === 0
                          ? "var(--color-accent-warm)"
                          : i === 1
                            ? "var(--color-google-star)"
                            : "var(--color-whatsapp)",
                    }}
                    aria-hidden="true"
                  />
                  <p className="font-serif text-2xl text-[var(--color-brown)] sm:text-3xl">
                    {t(`intro.${s}Value`)}
                  </p>
                  <p className="mt-2 text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-brown-soft)]">
                    {t(`intro.${s}Label`)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Why Al Safi */}
      <Section>
        <WhyUs />
      </Section>

      {/* Stats band */}
      <Section tone="brown">
        <div className="mb-10 text-center sm:mb-12">
          <Reveal>
            <p className="eyebrow mb-3 text-[var(--color-cream)]/60">
              {t("stats.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto max-w-2xl text-[1.75rem] leading-tight sm:text-4xl">
              {t("stats.title")}
            </h2>
          </Reveal>
        </div>
        <StatsBand />
      </Section>

      {/* Services teaser */}
      <Section tone="deep">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
            subtitle={t("services.subtitle")}
          />
          <Reveal>
            <Link href="/services" className="btn-ghost whitespace-nowrap">
              {t("services.viewAll")}
            </Link>
          </Reveal>
        </div>
        <ServicesGrid limit={4} />
      </Section>

      {/* Sectors served */}
      <Section>
        <div className="mb-10 text-center sm:mb-14">
          <SectionHeading
            eyebrow={t("sectors.eyebrow")}
            title={t("sectors.title")}
            subtitle={t("sectors.subtitle")}
            align="center"
          />
        </div>
        <Sectors />
      </Section>

      {/* Reviews */}
      <Section tone="deep">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow mb-4">{t("reviews.eyebrow")}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl text-[var(--color-brown)]">
              {t("reviews.title")}
            </h2>
            <div
              className="mx-auto mt-5 flex justify-center gap-1.5"
              aria-hidden="true"
            >
              <span className="h-0.5 w-6 rounded-full bg-[var(--color-google-blue)] opacity-80" />
              <span className="h-0.5 w-6 rounded-full bg-[var(--color-google-red)] opacity-80" />
              <span className="h-0.5 w-6 rounded-full bg-[var(--color-google-yellow)] opacity-90" />
              <span className="h-0.5 w-6 rounded-full bg-[var(--color-google-green)] opacity-80" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-7">
            <ReviewsBadge />
          </Reveal>
        </div>
        <div className="mt-16">
          <ReviewsCarousel />
        </div>
      </Section>

      {/* Materials & craft */}
      <Section>
        <div className="mb-10 sm:mb-14">
          <SectionHeading
            eyebrow={t("materials.eyebrow")}
            title={t("materials.title")}
            subtitle={t("materials.subtitle")}
          />
        </div>
        <Materials />
      </Section>

      {/* Philosophy */}
      <Section tone="brown">
        <Philosophy />
      </Section>

      {/* Portfolio teaser */}
      <Section tone="deep">
        <div className="mb-10 text-center sm:mb-14">
          <SectionHeading
            eyebrow={t("portfolio.eyebrow")}
            title={t("portfolio.title")}
            subtitle={t("portfolio.subtitle")}
            align="center"
          />
        </div>
        <PortfolioGrid />
      </Section>

      {/* CTA */}
      <Section tone="brown">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <h2 className="max-w-2xl text-3xl leading-tight sm:text-5xl">
              {t("contact.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[var(--color-cream)]/75">
              {t("contact.subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <Link
              href="/contact"
              className="inline-flex min-h-[3rem] items-center bg-[var(--color-cream)] px-8 py-4 text-[0.8rem] uppercase tracking-[0.16em] text-[var(--color-brown)] transition-opacity duration-500 hover:opacity-90"
            >
              {t("nav.cta")}
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `${t("title")}`,
    description: t("subtitle"),
  };
}
