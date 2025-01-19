import SingleBlog from "@/components/blog/single-blog";
import { getPostBlog, getSidebarContent } from "@/lib/api/wp";
import { seoContent } from "@/lib/seo/seo";
import { Locale, MVBlog } from "@/lib/types/misc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const post = await getPostBlog(slug, locale);
  return await seoContent({
    page: "single-blog",
    locale,
    data: post,
  });
}

export default async function SinglePostPage({ params }: Props) {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const post: MVBlog | null = await getPostBlog(slug, locale);
  const sidebar = await getSidebarContent("post", locale);
  if (!post) {
    return notFound();
  }
  return (
    <>
      {post?.yoast_head_json && (
        <script type="application/ld+json">
          {JSON.stringify(post.yoast_head_json)}
        </script>
      )}
      <SingleBlog blog={post} sidebar={sidebar?.data} />
    </>
  );
}
