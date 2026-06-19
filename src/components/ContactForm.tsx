"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { site, whatsappLink } from "@/lib/site";

/**
 * Form backend is intentionally deferred (see plan). For now the submit
 * composes a structured WhatsApp message so leads are never lost.
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "New enquiry — Al Safi Furniture",
      form.name ? `Name: ${form.name}` : "",
      form.email ? `Email: ${form.email}` : "",
      form.phone ? `Phone: ${form.phone}` : "",
      form.message ? `Project: ${form.message}` : "",
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
  };

  const field =
    "w-full border-b border-[var(--color-line-strong)] bg-transparent py-3 text-[var(--color-brown)] placeholder:text-[var(--color-brown-soft)]/60 focus:border-[var(--color-brown)] focus:outline-none transition-colors duration-300";

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <input
          className={field}
          placeholder={t("formName")}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          className={field}
          placeholder={t("formEmail")}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>
      <input
        className={field}
        placeholder={t("formPhone")}
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <textarea
        className={`${field} min-h-[7rem] resize-none`}
        placeholder={t("formMessage")}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
      />
      <button type="submit" className="btn-primary w-full sm:w-auto">
        {t("formSubmit")}
      </button>
      <p className="text-xs leading-relaxed text-[var(--color-brown-soft)]">
        {t("formNote")}{" "}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-[var(--color-brown)]"
        >
          {site.phone.whatsappDisplay}
        </a>
      </p>
    </form>
  );
}
