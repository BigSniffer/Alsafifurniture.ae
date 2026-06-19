import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { ReviewsList } from "@/components/ReviewsList";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { site, whatsappLink } from "@/lib/site";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations();
  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    site.address.mapsQuery
  )}&output=embed`;

  return (
    <>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        image="/images/gallery-reception.jpg"
        imageAlt={t("contact.title")}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-10">
            <div>
              <p className="eyebrow mb-4">{t("contact.detailsTitle")}</p>
              <address className="space-y-1 not-italic leading-relaxed text-[var(--color-brown-soft)]">
                <p>{site.address.line1}</p>
                <p>{site.address.line2}</p>
                <p>
                  {site.address.city}, {site.address.country}
                </p>
                <p>{site.address.poBox}</p>
              </address>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-3">{t("contact.phoneLabel")}</p>
                <a
                  href={whatsappLink(t("whatsapp.prefill"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[var(--color-brown)] hover:opacity-60"
                >
                  {site.phone.whatsappDisplay}
                </a>
                <a
                  href={`tel:${site.phone.landline}`}
                  className="mt-1 block text-sm text-[var(--color-brown-soft)] hover:text-[var(--color-brown)]"
                >
                  {site.phone.landlineDisplay}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-3">{t("contact.emailLabel")}</p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[var(--color-brown)] hover:opacity-60"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow mb-3">{t("contact.hoursTitle")}</p>
              <p className="text-[var(--color-brown-soft)]">
                {site.hours.weekdays}: {site.hours.morning}, {site.hours.afternoon}
              </p>
              <p className="text-[var(--color-brown-soft)]">{site.hours.closed}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Map */}
      <section className="border-y border-[var(--color-line)]">
        <iframe
          title="Al Safi Furniture location"
          src={mapsSrc}
          className="h-[420px] w-full grayscale-[0.2]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* Reviews */}
      <Section tone="deep">
        <div className="mb-12 text-center">
          <SectionHeading
            eyebrow={t("reviews.eyebrow")}
            title={t("contact.reviewsTitle")}
            align="center"
          />
        </div>
        <ReviewsList />
      </Section>

      {/* FAQ */}
      <Section>
        <div className="mb-10 text-center sm:mb-14">
          <SectionHeading
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            align="center"
          />
        </div>
        <Faq />
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
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}
