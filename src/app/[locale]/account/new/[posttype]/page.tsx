import NewBlog from "@/components/account/posts/single/blog";
import SingleRace from "@/components/account/posts/single/race";
import { getCategories } from "@/lib/api/wp";
import { Locale } from "@/lib/types/misc";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale; posttype: "race" | "post" | "news" }>;
};

export default async function NewPost({ params }: Props) {
  const locale = (await params).locale;
  const postType = (await params).posttype;
  const categories = await getCategories(locale);
  switch (postType) {
    case "race":
      return <SingleRace {...categories.data} />;
    case "post":
    case "news":
      return <NewBlog {...categories.data} postType={postType} />;
    default:
      return notFound();
  }
}
