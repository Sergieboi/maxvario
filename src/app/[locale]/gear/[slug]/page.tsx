import SingleGear from "@/components/gear/single-gear";
import { getSingleGear } from "@/lib/api/wp";
import { seoContent } from "@/lib/seo/seo";
import { Locale, MVGear } from "@/lib/types/misc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const response = await getSingleGear(slug, locale);
  const gear = response?.data as MVGear | undefined;
  return seoContent({
    page: "single-gear",
    locale,
    data: gear as unknown as Record<string, unknown>,
  });
}

export default async function SingleGearPage({ params }: Props) {
  const { locale, slug } = await params;
  let response = await getSingleGear(slug, locale);

  // Fall back to English if no translation exists for this locale
  if (!response?.data && locale !== "en") {
    response = await getSingleGear(slug, "en");
  }

  if (!response?.data) return notFound();

  return <SingleGear gear={response.data} />;
}
