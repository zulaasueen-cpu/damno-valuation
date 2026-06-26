import { cmsFetch } from "@/lib/cms/fetch";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const CP_PAGE_DETAIL_QUERY = `
  query CpPageDetail($slug: String!, $language: String) {
    cpPageDetail(slug: $slug, language: $language) {
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
  const data = await cmsFetch(CP_PAGE_DETAIL_QUERY, {
    slug: "pricing",
    language: locale,
  });
  const page = data.cpPageDetail as
    | { name?: string; description?: string; content?: string }
    | undefined;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wide">{page?.name ?? "Үнийн санал"}</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold">{page?.name ?? "Үнийн санал"}</h1>
          {page?.description && (
            <p className="mt-4 text-muted max-w-2xl mx-auto">{page.description}</p>
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
