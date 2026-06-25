"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-60" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 text-center">
        <FadeIn delay={0}>
          <span className="inline-block rounded-full border border-primary px-4 py-1.5 text-sm font-medium text-primary mb-8">
            {t("badge")}
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
            <span className="text-white">Хөрөнгийн үнэлгээний</span>
            <br />
            <span className="text-primary">мэргэшсэн шийдэл</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto max-w-2xl text-lg text-muted leading-relaxed mb-10">
            {t("subtitle")}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-white text-background px-8 py-3.5 font-semibold hover:scale-[1.02] transition-transform"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-primary text-primary px-8 py-3.5 font-semibold hover:bg-primary/10 transition-colors"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {["Орон сууц", "Амины сууц", "Хөдлөх хөрөнгө", "Байгууллагын хөрөнгө", "Хохирол тогтоолгоо"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80 hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-default"
              >
                {chip}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
