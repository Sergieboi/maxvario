import MainCalendar from "@/components/calendar/calendar";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";
import { Metadata } from "next";

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

export default async function CalendarPage() {
  // const locale = (await params).locale;
  //   const events: ApiResponse<CalendarResponse> = await getCalendar({},locale);
  return <MainCalendar />;
}
