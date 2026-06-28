import { cmsFetch } from "@/lib/cms/fetch";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-static";

const CP_POSTS_QUERY = `
  query CpPosts($language: String, $status: PostStatus, $limit: Int) {
    cpPosts(language: $language, status: $status, limit: $limit) {
      _id
      slug
    }
  }
`;

const CP_POST_QUERY = `
  query CpPost($slug: String, $language: String) {
    cpPost(slug: $slug, language: $language) {
      _id
      title
      excerpt
      publishedDate
      content
    }
  }
`;

type PostDetail = {
  title?: string;
  excerpt?: string;
  publishedDate?: string;
  content?: string;
};

async function fetchPosts() {
  try {
    const results = await Promise.all(
      routing.locales.map(async (locale) => {
        const data = await cmsFetch(CP_POSTS_QUERY, {
          language: locale,
          status: "published",
          limit: 100,
        });
        return ((data.cpPosts as Array<{ slug?: string }>) ?? []).map((p) => ({
          locale,
          slug: p.slug ?? "",
        }));
      })
    );
    return results.flat().filter((p) => p.slug);
  } catch (err) {
    console.error("[blog/[slug]] generateStaticParams failed:", err);
    return [];
  }
}

async function fetchPost(slug: string, locale: string) {
  try {
    const data = await cmsFetch(CP_POST_QUERY, { slug, language: locale });
    return data.cpPost as PostDetail | undefined;
  } catch (err) {
    console.error(`[blog/${slug}] CMS fetch failed:`, err);
    return undefined;
  }
}

export async function generateStaticParams() {
  return fetchPosts();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await fetchPost(slug, locale);
  if (!post) return {};
  return {
    title: `${post.title} | ДАМНО ҮНЭЛГЭЭ`,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await fetchPost(slug, locale);
  if (!post) notFound();

  return (
    <article className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
          {post.publishedDate && (
            <time className="text-muted">
              {new Date(post.publishedDate).toLocaleDateString(locale)}
            </time>
          )}
        </header>
        {post.content && (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>
    </article>
  );
}
