import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("legal");

  return (
    <>
      <PageHero eyebrow={t("lastUpdated")} title={t("privacyTitle")} />
      <Section>
        <div className="max-w-3xl space-y-6 text-base leading-relaxed text-[var(--color-brown-soft)]">
          <p>
            {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
            privacy. This policy explains how we collect, use, and protect the
            information you share with us through {site.domain}.
          </p>
          <h2 className="pt-4 text-2xl text-[var(--color-brown)]">
            Information We Collect
          </h2>
          <p>
            When you submit an enquiry, we may collect your name, email address,
            phone number, and any details you provide about your project. We use
            this information solely to respond to your enquiry and to provide our
            services.
          </p>
          <h2 className="pt-4 text-2xl text-[var(--color-brown)]">How We Use It</h2>
          <p>
            Your information is used to communicate with you, prepare consultations
            and quotations, and deliver our interior and joinery services. We do not
            sell your personal data to third parties.
          </p>
          <h2 className="pt-4 text-2xl text-[var(--color-brown)]">Third-Party Services</h2>
          <p>
            Our website may embed third-party services such as Google Maps and
            display Google reviews. These services may collect data in accordance
            with their own privacy policies.
          </p>
          <h2 className="pt-4 text-2xl text-[var(--color-brown)]">Contact</h2>
          <p>
            For any privacy-related questions, contact us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-4 hover:text-[var(--color-brown)]"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
