import { useTranslations } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: `${t("label")} | ДАМНО ҮНЭЛГЭЭ`,
    description: t("title"),
  };
}

export default function ServicesPage() {
  const t = useTranslations("services");
  const items = [
    { title: t("service.0.title"), description: t("service.0.description") },
    { title: t("service.1.title"), description: t("service.1.description") },
    { title: t("service.2.title"), description: t("service.2.description") },
    { title: t("service.3.title"), description: t("service.3.description") },
    { title: t("service.4.title"), description: t("service.4.description") },
    { title: t("service.5.title"), description: t("service.5.description") },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wide">{t("label")}</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold">{t("title")}</h1>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service) => (
            <StaggerItem key={service.title}>
              <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 hover:border-primary/60 transition-colors h-full">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted">{service.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
