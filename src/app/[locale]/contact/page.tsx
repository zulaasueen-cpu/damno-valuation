import { ContactForm } from "@/components/sections/ContactForm";
import { BranchMap } from "@/components/sections/BranchMap";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return [{ locale: "mn" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: `${t("label")} | ДАМНО ҮНЭЛГЭЭ`,
    description: t("description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("label")}</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">{t("description")}</p>
        </FadeIn>

        <FadeIn className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <ContactInfo />
            <BranchMap />
          </div>
        </FadeIn>

        <FadeIn className="mb-12">
          <div className="rounded-2xl border border-border bg-card/50 p-4 md:p-6 overflow-hidden">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("mapTitle")}</h2>
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Улаанбаатар,+Элчингийн+гудамж+15&output=embed"
                title={t("mapTitle")}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
