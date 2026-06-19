import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ServicesHighlight } from "@/components/ServicesHighlight";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations();

  return (
    <>
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        subtitle={t("services.subtitle")}
        image="/images/gallery-kitchen.jpg"
        imageAlt={t("services.title")}
      />

      <Section tone="deep" className="!py-12 sm:!py-16">
        <ServicesHighlight />
      </Section>

      <Section>
        <div className="mb-10 sm:mb-14">
          <SectionHeading
            eyebrow={t("services.eyebrow")}
            title={t("services.gridTitle")}
            subtitle={t("services.gridSubtitle")}
          />
        </div>
        <ServicesGrid />
      </Section>

      <Section tone="deep">
        <div className="mb-10 sm:mb-14">
          <SectionHeading eyebrow={t("process.eyebrow")} title={t("process.title")} />
        </div>
        <ProcessSteps />
      </Section>

      <Section tone="brown">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <h2 className="max-w-2xl text-[1.75rem] leading-tight sm:text-4xl">
              {t("contact.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
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
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}
