import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_PAGE_DETAIL } from "@/graphql/cms/queries/page";
import { ContactForm } from "@/components/sections/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
  const client = await getServerApolloClient();
  const { data } = await client.query<{
    cpPageDetail?: { name?: string; description?: string; content?: string };
  }>({
    query: CP_PAGE_DETAIL,
    variables: { slug: "contact", language: locale },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });
  const page = data?.cpPageDetail;

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

        <FadeIn>
          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
