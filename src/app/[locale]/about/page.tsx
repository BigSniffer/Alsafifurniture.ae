import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Materials } from "@/components/Materials";
import { Reveal } from "@/components/Reveal";
import { ArchMark } from "@/components/ArchMark";
import { asset } from "@/lib/assets";

const values = ["craftsmanship", "bespoke", "quality", "partnership"] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations();

  return (
    <>
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        image="/images/gallery-hospitality.jpg"
        imageAlt={t("about.title")}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <Reveal>
            <p className="font-serif text-2xl leading-snug text-[var(--color-brown)] sm:text-[1.7rem]">
              {t("about.lead")}
            </p>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--color-brown-soft)]">
              <p>{t("about.body1")}</p>
              <p>{t("about.body2")}</p>
              <p>{t("about.body3")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <ArchMark className="pointer-events-none absolute -top-5 h-20 w-auto text-[var(--color-brown)] opacity-25 ltr:-left-3 rtl:-right-3 rtl:scale-x-[-1]" />
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)] shadow-[0_30px_80px_-40px_rgba(60,36,21,0.45)] ring-1 ring-[var(--color-line)]">
              <Image
                src={asset("/images/about-craft.jpg")}
                alt={t("about.title")}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brown)]/15 to-transparent" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="deep">
        <div className="mb-14">
          <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.valuesTitle")} />
        </div>
        <div className="grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {values.map((key, i) => (
            <Reveal
              key={key}
              delay={(i % 4) * 0.08}
              className="bg-[var(--color-cream-deep)] p-8"
            >
              <h3 className="text-xl text-[var(--color-brown)]">
                {t(`about.values.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-brown-soft)]">
                {t(`about.values.${key}.description`)}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

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

      <Section tone="deep">
        <div className="mb-10 sm:mb-14">
          <SectionHeading eyebrow={t("process.eyebrow")} title={t("process.title")} />
        </div>
        <ProcessSteps />
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
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("lead") };
}
