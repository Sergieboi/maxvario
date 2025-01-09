import MapProvider from "@/components/map/map-provider";
import { getCalendar } from "@/lib/api";
import { seoContent } from "@/lib/seo/seo";
import { ApiResponse, CalendarResponse, Locale } from "@/lib/types/misc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  return await seoContent({
    page: "map",
    locale,
  });
}

export default async function RacesPage({ params }: Props) {
  const locale = (await params).locale;
  const events: ApiResponse<CalendarResponse> | null = await getCalendar(
    undefined,
    locale
  );
  if (!events) {
    return notFound();
  }
  return <MapProvider {...events.data} />;
}
