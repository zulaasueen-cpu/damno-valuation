"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Home, Truck, Briefcase, Building2, Scale, MapPin, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

const services = [
  { icon: Home, key: 0 },
  { icon: Truck, key: 1 },
  { icon: Briefcase, key: 2 },
  { icon: Building2, key: 3 },
  { icon: Scale, key: 4 },
  { icon: MapPin, key: 5 },
];

export function Services() {
  const t = useTranslations();

  return (
    <section className="py-20 lg:py-28 bg-black/30">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wide">{t("services.label")}</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">{t("services.title")}</h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.key}>
                <div className="group rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 hover:border-primary/60 hover:bg-card/60 transition-all duration-200">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{t(`service.${i}.title`)}</h3>
                  <p className="text-muted leading-relaxed mb-5">{t(`service.${i}.description`)}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
                  >
                    {t("services.more")} <ArrowRight size={16} />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
