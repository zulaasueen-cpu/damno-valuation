import { cmsFetch } from "@/lib/cms/fetch";
import { ContactForm } from "@/components/sections/ContactForm";
import { BranchMap } from "@/components/sections/BranchMap";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
  const data = await cmsFetch(CP_PAGES_QUERY, { language: locale });
  const pages = (data.cpPages ?? []) as Array<{
    _id: string;
    name?: string;
    slug?: string;
    description?: string;
    content?: string;
  }>;
  const page = pages.find((p) => p.slug === "contact");

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{page?.name ?? "Холбоо барих"}</h1>
          {page?.description && (
            <p className="text-xl text-muted max-w-2xl mx-auto">{page.description}</p>
          )}
        </FadeIn>

        {page?.content && (
          <FadeIn className="mb-12">
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </FadeIn>
        )}

        <FadeIn className="mb-12">
          <BranchMap />
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
