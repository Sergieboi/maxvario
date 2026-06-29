import Gear from "@/components/gear/gear";
import GearLanding from "@/components/gear/gear-landing";
import { getGear } from "@/lib/api/wp";
import { seoContent } from "@/lib/seo/seo";
import { GearCategory, Locale, MVGear } from "@/lib/types/misc";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const locale = (await params).locale;
  return seoContent({ page: "gear", locale });
}

export default async function GearPage({ params, searchParams }: Props) {
  const locale = (await params).locale;
  const { category } = await searchParams;

  let response = await getGear(locale);
  if (!response?.data?.length && locale !== "en") {
    response = await getGear("en");
  }
  if (!response?.data?.length) return notFound();

  const gear: MVGear[] = response.data;

  // Build category map with first thumbnail and count from gear items
  const categoryMap = new Map<string, GearCategory & { thumbnail: string | null; count: number }>();
  for (const item of gear) {
    for (const cat of item.gear_categories) {
      if (!categoryMap.has(cat.slug)) {
        categoryMap.set(cat.slug, { ...cat, thumbnail: item.thumbnail, count: 1 });
      } else {
        categoryMap.get(cat.slug)!.count++;
      }
    }
  }
  const categories = Array.from(categoryMap.values());

  // No category selected → show landing page
  if (!category) {
    return <GearLanding categories={categories} />;
  }

  // Category selected → show filtered product grid
  return <Gear gear={gear} categories={categories} activeCategory={category} />;
}
