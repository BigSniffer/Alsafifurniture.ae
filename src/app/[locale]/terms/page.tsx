import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations("legal");

  return (
    <>
      <PageHero eyebrow={t("lastUpdated")} title={t("termsTitle")} />
      <Section>
        <div className="max-w-3xl space-y-6 text-base leading-relaxed text-[var(--color-brown-soft)]">
          <p>
            These terms govern your use of {site.domain}, operated by{" "}
            {site.legalName}. By using this website, you agree to these terms.
          </p>
          <h2 className="pt-4 text-2xl text-[var(--color-brown)]">Use of the Website</h2>
          <p>
            This website is provided for informational purposes and to facilitate
            enquiries about our products and services. Content may not be reproduced
            without our written permission.
          </p>
          <h2 className="pt-4 text-2xl text-[var(--color-brown)]">Enquiries & Quotations</h2>
          <p>
            Submitting an enquiry does not constitute a binding contract. All
            projects are subject to a separate written agreement detailing scope,
            specifications, pricing, and timelines.
          </p>
          <h2 className="pt-4 text-2xl text-[var(--color-brown)]">Intellectual Property</h2>
          <p>
            All trademarks, logos, designs, and content on this website are the
            property of {site.legalName} unless otherwise stated.
          </p>
          <h2 className="pt-4 text-2xl text-[var(--color-brown)]">Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
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
