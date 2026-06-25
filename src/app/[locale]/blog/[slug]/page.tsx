import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_POST, CP_POSTS } from "@/graphql/cms/queries/post";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PostSummary = { slug?: string };
type PostDetail = {
  title?: string;
  excerpt?: string;
  publishedDate?: string;
  content?: string;
};

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const client = await getServerApolloClient();
      const { data } = await client.query<{ cpPosts?: PostSummary[] }>({
        query: CP_POSTS,
        variables: { language: locale, status: "published", limit: 100 },
        context: { fetchOptions: { next: { revalidate: 60 } } },
      });
      return (data?.cpPosts ?? []).map((p) => ({
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
  const { data } = await client.query<{ cpPost?: PostDetail }>({
    query: CP_POST,
    variables: { slug, language: locale },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });
  const post = data?.cpPost;
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
  const client = await getServerApolloClient();
  const { data } = await client.query<{ cpPost?: PostDetail }>({
    query: CP_POST,
    variables: { slug, language: locale },
    context: { fetchOptions: { next: { revalidate: 60 } } },
  });
  if (!data?.cpPost) notFound();
  const post = data.cpPost;

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
