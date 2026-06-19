"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: string) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.14em]">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 ? <span className="text-[var(--color-line-strong)]">/</span> : null}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={loc === locale}
            className={`transition-opacity duration-300 ${
              loc === locale
                ? "text-[var(--color-brown)]"
                : "text-[var(--color-brown-soft)] opacity-60 hover:opacity-100"
            }`}
          >
            {loc === "ar" ? "ع" : "EN"}
          </button>
        </span>
      ))}
    </div>
  );
}
