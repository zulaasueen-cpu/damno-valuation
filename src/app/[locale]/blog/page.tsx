import { cmsFetch } from "@/lib/cms/fetch";
import { Link } from "@/i18n/routing";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const CP_POSTS_QUERY = `
  query CpPosts($language: String, $status: PostStatus, $limit: Int) {
    cpPosts(language: $language, status: $status, limit: $limit) {
      _id
      slug
      title
      excerpt
      publishedDate
    }
  }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: `${t("title")} | ДАМНО ҮНЭЛГЭЭ`,
    description: t("description"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await cmsFetch(CP_POSTS_QUERY, {
    language: locale,
    status: "published",
    limit: 12,
  });
  const posts = (data.cpPosts ?? []) as Array<{
    _id: string;
    slug?: string;
    title?: string;
    excerpt?: string;
    publishedDate?: string;
  }>;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wide">Блог</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold">Мэдээ, мэдээлэл</h1>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <StaggerItem key={post._id}>
              <article className="group rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 hover:border-primary/60 transition-colors">
                <p className="text-sm text-muted mb-3">
                  {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString(locale) : ""}
                </p>
                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                {post.excerpt && <p className="text-muted line-clamp-3">{post.excerpt}</p>}
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
