import SingleBlog from "@/components/account/posts/single/blog";
import { getSinglePost } from "@/lib/api/account";
import { getCategories } from "@/lib/api/wp";
import { Locale } from "@/lib/types/misc";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const post = await getSinglePost(slug, locale);
  const categories = await getCategories(locale);
  if (!post) {
    return notFound();
  }
  switch (post.data.post_type) {
    case "race":
      return <>editing race</>;
    case "news":
    case "post":
      return <SingleBlog {...categories.data} postType={post.data.post_type} />;
    default:
      return notFound();
  }
}
