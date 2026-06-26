import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return {
    title: `${t("label")} | ДАМНО ҮНЭЛГЭЭ`,
    description: t("title"),
  };
}

export default function PortfolioPage() {
  const t = useTranslations("portfolio");

  const projects = [
    { name: "Улаанбаатар хотын орон сууцны төслүүд", type: "Орон сууц" },
    { name: "Банкны барьцаа хөрөнгийн үнэлгээ", type: "Банкны барьцаа" },
    { name: "Уул уурхайн тоног төхөөрөмж", type: "Хөдлөх хөрөнгө" },
    { name: "Бизнес үнэлгээ", type: "Бизнесийн үнэлгээ" },
    { name: "Хохирол тогтоолгоо", type: "Хохирол" },
    { name: "Газар, үл хөдлөх хөрөнгийн үнэлгээ", type: "Үл хөдлөх хөрөнгө" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wide">{t("label")}</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold">{t("title")}</h1>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <FadeIn key={project.name} delay={index * 0.05}>
              <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6">
                <p className="text-sm text-primary font-semibold mb-2">{project.type}</p>
                <h3 className="text-lg font-semibold">{project.name}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
