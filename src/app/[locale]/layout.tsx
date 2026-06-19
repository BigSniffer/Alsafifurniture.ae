import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import { asset } from "@/lib/assets";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppSticky } from "@/components/WhatsAppSticky";
import { StructuredData } from "@/components/StructuredData";
import "../globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Bespoke Interiors & Joinery in Dubai`,
    template: `%s · ${site.name}`,
  },
  description:
    "Al Safi Furniture is a Dubai-based luxury interior fit-out and bespoke joinery manufacturer crafting refined residential, commercial, and hospitality interiors.",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [asset("/og-image.png")],
  },
  icons: {
    icon: [
      { url: asset("/favicon.ico"), sizes: "any" },
      { url: asset("/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/favicon-32.png"), sizes: "32x32", type: "image/png" },
    ],
    shortcut: asset("/favicon.ico"),
    apple: asset("/apple-touch-icon.png"),
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <NextIntlClientProvider>
          <StructuredData />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppSticky />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
