import { notFound } from "next/navigation";
import StudyMaterials from "@/components/resources/study-materials";
import { Category } from "@/components/resources/resource-data";

const SLUG_MAP: Record<string, Category> = {
  books: "book",
  pdfs: "pdf",
  podcasts: "podcast",
  youtube: "youtube",
  apps: "app",
  courses: "course",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = SLUG_MAP[slug];
  if (!category) notFound();
  return <StudyMaterials category={category} />;
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ category: slug }));
}
