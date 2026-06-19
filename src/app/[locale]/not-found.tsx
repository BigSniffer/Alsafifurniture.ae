import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="container-luxe text-center">
        <p className="font-serif text-7xl text-[var(--color-brown)]">404</p>
        <h1 className="mt-4 text-3xl text-[var(--color-brown)]">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-[var(--color-brown-soft)]">
          {t("body")}
        </p>
        <Link href="/" className="btn-primary mt-8">
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
