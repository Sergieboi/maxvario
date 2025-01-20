import AccountProfile from "@/components/account/profile/profile";
import { getUsreProfile } from "@/lib/api/account";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

export default async function AccountProfilePage() {
  const user = await getUsreProfile();
  if (!user) {
    return notFound();
  }
  return <AccountProfile user={user?.data} />;
}
