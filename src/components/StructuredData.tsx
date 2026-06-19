import { site } from "@/lib/site";
import { reviews } from "@/lib/reviews";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    image: `${site.url}/og-image.png`,
    telephone: site.phone.landlineDisplay,
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressCountry: "AE",
    },
    sameAs: [site.social.instagram],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviews.overallRating,
      reviewCount: reviews.totalReviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
