import NewBlog from "@/components/account/posts/new/blog";
import NewRace from "@/components/account/posts/new/race";
import { Locale } from "@/lib/types/misc";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale; posttype: "race" | "post" | "news" }>;
};

export default async function NewPost({ params }: Props) {
  const postType = (await params).posttype;
  switch (postType) {
    case "race":
      return <NewRace />;
    case "post":
    case "news":
      return <NewBlog />;
    default:
      return notFound();
  }
}
