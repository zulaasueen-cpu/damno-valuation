import { cmsFetch } from "@/lib/cms/fetch";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const CP_PAGES_QUERY = `
  query CpPages($language: String) {
    cpPages(language: $language) {
      _id
      slug
    }
  }
`;

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

export const dynamicParams = true;

// Reserved slugs that have dedicated static pages
const RESERVED_SLUGS = new Set([
  "about",
  "services",
  "pricing",
  "portfolio",
  "contact",
  "blog",
  "privacy",
  "terms",
]);

export async function generateStaticParams() {
  try {
    const results = await Promise.all(
      routing.locales.map(async (locale) => {
        const data = await cmsFetch(CP_PAGES_QUERY, { language: locale });
        return ((data.cpPages as Array<{ slug?: string }>) ?? [])
          .map((p) => ({
            locale,
            slug: p.slug ?? "",
          }))
          .filter((p) => p.slug && !RESERVED_SLUGS.has(p.slug));
      })
    );
    return results.flat();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("Client portal required")) {
      return [];
    }
    throw err;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (RESERVED_SLUGS.has(slug)) {
    notFound();
  }

  const data = await cmsFetch(CP_PAGE_DETAIL_QUERY, {
    slug,
    language: locale,
  });
  const page = data.cpPageDetail as
    | { name?: string; description?: string }
    | undefined;
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

  if (RESERVED_SLUGS.has(slug)) {
    notFound();
  }

  const data = await cmsFetch(CP_PAGE_DETAIL_QUERY, {
    slug,
    language: locale,
  });
  const page = data.cpPageDetail as
    | { name?: string; description?: string; content?: string }
    | undefined;
  if (!page) notFound();

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
