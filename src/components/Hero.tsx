"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { asset } from "@/lib/assets";
import { ArchMark } from "./ArchMark";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const imageReveal = reduce
    ? {}
    : {
        initial: { opacity: 0, scale: 1.06 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="relative overflow-hidden pt-20">
      {/* Quiet arch motif accent */}
      <ArchMark className="pointer-events-none absolute top-1/2 h-[70vh] w-auto -translate-y-1/2 text-[var(--color-brown)] opacity-[0.05] ltr:left-[-6vw] rtl:right-[-6vw] rtl:scale-x-[-1]" />

      <div className="container-luxe relative z-10 grid items-center gap-8 py-12 sm:gap-12 sm:py-16 lg:min-h-[92vh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-0">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <motion.p {...rise(0)} className="eyebrow mb-4 sm:mb-6">
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            {...rise(0.1)}
            className="text-[2.25rem] leading-[1.05] text-[var(--color-brown)] sm:text-6xl lg:text-[4.4rem]"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            {...rise(0.2)}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-brown-soft)] sm:mt-8 sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            {...rise(0.3)}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link href="/contact" className="btn-primary min-h-[3rem] w-full justify-center sm:w-auto">
              {t("ctaPrimary")}
            </Link>
            <Link href="/portfolio" className="btn-ghost min-h-[3rem] w-full justify-center sm:w-auto">
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>

        {/* Framed image */}
        <motion.div {...imageReveal} className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <ArchMark className="pointer-events-none absolute -top-4 h-16 w-auto text-[var(--color-brown)] opacity-25 ltr:-left-2 rtl:-right-2 rtl:scale-x-[-1] sm:-top-6 sm:h-24 ltr:sm:-left-4 rtl:sm:-right-4" />
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream-deep)] shadow-[0_30px_80px_-40px_rgba(60,36,21,0.45)] ring-1 ring-[var(--color-line)]">
            <Image
              src={asset("/images/gallery-hospitality.jpg")}
              alt={t("title")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brown)]/15 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
