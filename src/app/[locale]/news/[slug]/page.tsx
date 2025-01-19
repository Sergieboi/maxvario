import SingleBlog from "@/components/blog/single-blog";
import { getNewsBlog, getSidebarContent } from "@/lib/api/wp";
import { seoContent } from "@/lib/seo/seo";
import { Locale, MVNews } from "@/lib/types/misc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const news = await getNewsBlog(slug, locale);
  return await seoContent({
    page: "single-blog",
    locale,
    data: news,
  });
}

export default async function SingleNewsPage({ params }: Props) {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const news: MVNews | null = await getNewsBlog(slug, locale);
  const sidebar = await getSidebarContent("news", locale);
  if (!news) {
    return notFound();
  }
  return (
    <>
      {news?.yoast_head_json && (
        <script type="application/ld+json">
          {JSON.stringify(news.yoast_head_json)}
        </script>
      )}
      <SingleBlog blog={news} sidebar={sidebar?.data} />
    </>
  );
}
