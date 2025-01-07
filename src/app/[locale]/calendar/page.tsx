import MainCalendar from "@/components/calendar/main-calendar";
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
    page: "calendar",
    locale,
  });
}

export default async function CalendarPage({params}: Props) {
  const locale = (await params).locale;
  const events: ApiResponse<CalendarResponse> | null = await getCalendar(undefined,locale);
  if (!events) {
    return notFound();
  }
  return <MainCalendar {...events.data} />;
}
