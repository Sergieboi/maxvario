import Taxonomy from "@/components/taxonomy";
import { getCategories, getSidebarContent, getTaxonomy } from "@/lib/api/wp";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale; term: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const term = (await params).term;
  const tax = await getTaxonomy("category", term, locale);
  return await seoContent({
    page: "taxonomy",
    locale,
    data: tax?.data,
  });
}

export default async function TermPage({ params }: Props) {
  const locale = (await params).locale;
  const term = (await params).term;
  const tax = await getTaxonomy("category", term, locale);
  const categories = await getCategories(locale);
  const sidebar = await getSidebarContent("post", locale);
  if (!tax) {
    return notFound();
  }
  return (
    <Taxonomy
      data={tax.data}
      postType="post"
      categories={categories.data}
      sidebar={sidebar?.data}
    />
  );
}
