import { FC } from "react";
import Container from "../shared/container";
import { useTranslations } from "next-intl";
import { MVBlog } from "@/lib/types/misc";
import BlogCard from "../cards/blog-card";

type Props = {
  blog: Array<MVBlog>;
};

const LatestBlog: FC<Props> = ({ blog }) => {
  const t = useTranslations("latest-blog");
  if (blog.length === 0) {
    return null;
  }
  return (
    <div className="relative">
      <Container className="py-20">
        <h1 className="text-3xl font-semibold mb-3 text-blue-800">
          {t("title")}
        </h1>
        <p className="text-lg mb-8 text-blue-700">{t("description")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {blog.map((post, index) => (
            <BlogCard blog={post} key={index} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default LatestBlog;
