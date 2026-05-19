import Gear from "@/components/gear/gear";
import { getGear } from "@/lib/api/wp";
import { seoContent } from "@/lib/seo/seo";
import { GearCategory, Locale, MVGear } from "@/lib/types/misc";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const locale = (await params).locale;
  return seoContent({ page: "gear", locale });
}

export default async function GearPage({ params }: Props) {
  const locale = (await params).locale;
  const response = await getGear(locale);

  if (!response?.data) return notFound();

  const gear: MVGear[] = response.data;

  // Collect unique categories from the fetched gear items
  const categoryMap = new Map<string, GearCategory>();
  for (const item of gear) {
    for (const cat of item.gear_categories) {
      if (!categoryMap.has(cat.slug)) {
        categoryMap.set(cat.slug, cat);
      }
    }
  }
  const categories = Array.from(categoryMap.values());

  return <Gear gear={gear} categories={categories} />;
}
