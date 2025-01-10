import SingleRace from "@/components/race/single";
import { getRace } from "@/lib/api";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const race = await getRace(slug, locale);
  return await seoContent({
    page: "race",
    locale,
    data: race,
  });
}

export default async function SingleRacePage({ params }: Props) {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const race = await getRace(slug, locale);
  return <SingleRace race={race} />;
}
