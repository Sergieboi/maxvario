import AccountPosts from "@/components/account/posts/posts";
import { myPosts } from "@/lib/api/account";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";
import { Metadata } from "next";
import { auth } from "../../../../../auth";
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

export default async function AccountPostsPage() {
  const session = await auth();
  const posts = await myPosts(session?.user.token as string);
  if (!posts) {
    return notFound();
  }
  return <AccountPosts data={posts.data} />;
}
