import Home from "@/components/home/home";
import { getHome } from "@/lib/api/wp";
import { seoContent } from "@/lib/seo/seo";
import { ApiResponse, HomeResponse, Locale } from "@/lib/types/misc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  return await seoContent({
    page: "home",
    locale,
  });
}

export default async function HomePage({ params }: Props) {
  const locale = (await params).locale;
  const home: ApiResponse<HomeResponse> = await getHome(locale);
  if (!home?.data) {
    return notFound();
  }
  return <Home data={home.data} />;
}
