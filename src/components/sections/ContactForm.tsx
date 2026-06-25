"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: form.get("message"),
      locale,
    };
    console.log(payload);
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">{t("name")}</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={t("namePlaceholder")}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">{t("email")}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={t("emailPlaceholder")}
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <label htmlFor="phone" className="text-sm font-medium">{t("phone")}</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={t("phonePlaceholder")}
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <label htmlFor="message" className="text-sm font-medium">{t("message")}</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={t("messagePlaceholder")}
        />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={submitted}
          className="rounded-full bg-primary text-white px-8 py-3.5 font-semibold hover:scale-[1.02] transition-transform disabled:opacity-60"
        >
          {submitted ? t("submitted") : t("submit")}
        </button>
      </div>
    </form>
  );
}
