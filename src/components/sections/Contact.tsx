"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn>
          <div className="rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-10 md:p-16 text-center">
            <span className="text-primary font-semibold tracking-wide">{t("label")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto">
              {t("title")}
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted">{t("description")}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-primary text-white px-8 py-3.5 font-semibold hover:scale-[1.02] transition-transform"
              >
                {t("ctaPrimary")}
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/30 px-8 py-3.5 font-semibold hover:border-primary transition-colors"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
