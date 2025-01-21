import Blog from "@/components/blog/blog";
import { getCategories, getPosts } from "@/lib/api/wp";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";

type Props = {
  params: Promise<{ locale: Locale }>;
};
export async function generateMetadata({ params }: Props) {
  const locale = (await params).locale;
  return seoContent({
    page: "blog",
    locale,
  });
}

export default async function BlogPage({ params }: Props) {
  const locale = (await params).locale;
  const posts = await getPosts(locale);
  const categories = await getCategories(locale);
  return <Blog items={posts} postType="post" categories={categories.data} />;
}
