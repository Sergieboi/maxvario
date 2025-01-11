import SingleRace from "@/components/race/single";
import { getRace } from "@/lib/api/wp";
// import { seoContent } from "@/lib/seo/seo";
import { Locale, MVRace } from "@/lib/types/misc";
// import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const locale = (await params).locale;
//   const slug = (await params).slug;
//   const race = await getRace(slug, locale);
//   return await seoContent({
//     page: "race",
//     locale,
//     data: race,
//   });
// }

export default async function SingleRacePage({ params }: Props) {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const race: MVRace | null = await getRace(slug, locale);
  if (!race) {
    return notFound();
  }
  return (
    <>
      {/* {race?.yoast_head_json && (
        <script type="application/ld+json">
          {JSON.stringify(race.yoast_head_json)}
        </script>
      )} */}
      <SingleRace race={race} />
    </>
  );
}
