import AccountProfile from "@/components/account/profile/profile";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: Locale }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  return await seoContent({
    page: "account",
    locale,
  });
}

export default async function AccountNotificationsPage() {
  return <AccountProfile />;
}
