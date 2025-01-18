import SingleBlog from "@/components/account/posts/single/blog";
import SingleRace from "@/components/account/posts/single/race";
import { editPost } from "@/lib/api/account";
import { getCategories } from "@/lib/api/wp";
import { Locale, MVRace } from "@/lib/types/misc";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale; id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const locale = (await params).locale;
  const id = (await params).id;
  const post = await editPost(id, locale);
  const categories = await getCategories(locale);
  if (!post) {
    return notFound();
  }
  switch (post.data.post_type) {
    case "race":
      return <SingleRace {...categories.data} init={post.data as MVRace} />;
    case "news":
    case "post":
      return <SingleBlog {...categories.data} postType={post.data.post_type} />;
    default:
      return notFound();
  }
}
