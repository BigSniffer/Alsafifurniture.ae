"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navKeys = ["home", "services", "portfolio", "about", "contact"] as const;
const hrefFor: Record<(typeof navKeys)[number], string> = {
  home: "/",
  services: "/services",
  portfolio: "/portfolio",
  about: "/about",
  contact: "/contact",
};

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-[var(--color-cream)]/85 backdrop-blur-md border-b border-[var(--color-line)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Al Safi Furniture — Home"
          className="flex items-center"
        >
          <Image
            src="/logo/lockup-horizontal-transparent.png"
            alt="Al Safi Furniture"
            width={310}
            height={94}
            priority
            className="logo-lockup"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={hrefFor[key]}
              className="text-[0.78rem] uppercase tracking-[0.16em] text-[var(--color-brown)] transition-opacity duration-300 hover:opacity-60"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="hidden bg-[var(--color-brown)] px-5 py-3 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-cream)] transition-opacity duration-500 hover:opacity-85 md:inline-flex"
          >
            {t("cta")}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-px w-6 bg-[var(--color-brown)] transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-[var(--color-brown)] transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-[var(--color-brown)] transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-cream)] transition-[max-height] duration-500 ease-out lg:hidden ${
          open ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <nav className="container-luxe flex flex-col gap-1 py-6">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={hrefFor[key]}
              className="py-3 text-sm uppercase tracking-[0.16em] text-[var(--color-brown)]"
            >
              {t(key)}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-3 inline-flex w-fit bg-[var(--color-brown)] px-6 py-3 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-cream)]"
          >
            {t("cta")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
