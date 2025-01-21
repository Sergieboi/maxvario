import Blog from "@/components/blog/blog";
import { getCategories, getNews } from "@/lib/api/wp";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";

type Props = {
  params: Promise<{ locale: Locale }>;
};
export async function generateMetadata({ params }: Props) {
  const locale = (await params).locale;
  return seoContent({
    page: "news",
    locale,
  });
}

export default async function NewsPage({ params }: Props) {
  const locale = (await params).locale;
  const news = await getNews(locale);
  const categories = await getCategories(locale);

  return <Blog items={news} postType="news" categories={categories.data} />;
}
