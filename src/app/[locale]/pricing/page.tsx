import { cmsFetch } from "@/lib/cms/fetch";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return [{ locale: "mn" }, { locale: "en" }];
}

const CP_PAGES_QUERY = `
  query CpPages($language: String) {
    cpPages(language: $language) {
      _id
      name
      slug
      description
      content
    }
  }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return {
    title: `${t("label")} | ДАМНО ҮНЭЛГЭЭ`,
    description: t("description"),
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  let page:
    | { name?: string; slug?: string; description?: string; content?: string }
    | undefined;

  try {
    const data = await cmsFetch(CP_PAGES_QUERY, { language: locale });
    const pages = (data.cpPages ?? []) as Array<{
      _id: string;
      name?: string;
      slug?: string;
      description?: string;
      content?: string;
    }>;
    page = pages.find((p) => p.slug === "pricing");
  } catch (err) {
    console.error("[pricing] CMS fetch failed:", err);
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wide">{page?.name ?? t("label")}</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold">{page?.name ?? t("label")}</h1>
          {(page?.description || t("description")) && (
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              {page?.description || t("description")}
            </p>
          )}
        </FadeIn>

        {page?.content && (
          <FadeIn>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </FadeIn>
        )}
      </div>
    </div>
  );
}
