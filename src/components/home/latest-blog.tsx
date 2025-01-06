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
        <div className="flex flex-wrap  gap-4">
        {blog.map((post, index) => (
          <div key={index} className="flex w-full md:w-[calc(50%-8px)] 2xl:w-[calc(33.3333%-16px)]">
            <BlogCard blog={post} />
          </div>
        ))}
        </div>
      </Container>
    </div>
  );
};

export default LatestBlog;
