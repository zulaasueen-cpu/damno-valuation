"use client";

import { useTranslations } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

export function About() {
  const t = useTranslations("about");

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="space-y-6">
              <span className="text-primary font-semibold tracking-wide">{t("label")}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{t("title")}</h2>
              <p className="text-muted leading-relaxed text-lg">{t("description")}</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 gap-4">
            {[
              { value: "35+", label: t("stats.employees") },
              { value: "15+", label: t("stats.experience") },
              { value: "120+", label: t("stats.projects") },
              { value: "5000+", label: t("stats.valuations") },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
