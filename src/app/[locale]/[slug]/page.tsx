import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_PAGE_DETAIL, CP_PAGES } from "@/graphql/cms/queries/page";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const client = await getServerApolloClient();
      const { data } = await client.query<{
        cpPages?: Array<{ slug?: string }>;
      }>({
        query: CP_PAGES,
        variables: { language: locale },
        context: { fetchOptions: { next: { revalidate: 60 } } },
      });
      return (data?.cpPages ?? []).map((p) => ({
        locale,
        slug: p.slug ?? "",
      }));
    })
  );
  return results.flat().filter((p) => p.slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const client = await getServerApolloClient();
  const { data } = await client.query<{
    cpPageDetail?: { name?: string; description?: string; content?: string };
  }>({
    query: CP_PAGE_DETAIL,
    variables: { slug, language: locale },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });
  const page = data?.cpPageDetail;
  if (!page) return {};
  return {
    title: `${page.name} | ДАМНО ҮНЭЛГЭЭ`,
    description: page.description ?? undefined,
  };
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const client = await getServerApolloClient();
  const { data } = await client.query<{
    cpPageDetail?: { name?: string; description?: string; content?: string };
  }>({
    query: CP_PAGE_DETAIL,
    variables: { slug, language: locale },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });
  if (!data?.cpPageDetail) notFound();
  const page = data.cpPageDetail;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{page.name}</h1>
        {page.description && (
          <p className="text-xl text-muted mb-10">{page.description}</p>
        )}
        {page.content && (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        )}
      </div>
    </div>
  );
}
