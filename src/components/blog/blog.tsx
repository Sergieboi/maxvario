import { MVBlog, MVNews } from "@/lib/types/misc";
import { FC, Fragment } from "react";
import Container from "../shared/container";
import { useTranslations } from "next-intl";
import NewsCard from "../cards/news-card";
import BlogCard from "../cards/blog-card";

type Props = {
  items: Array<MVBlog | MVNews>;
  postType: "news" | "post";
};

const Blog: FC<Props> = ({ items, postType }) => {
  const t = useTranslations();
  return (
    <div className="mt-24">
      <div
        className="flex items-center bg-cover bg-center bg-no-repeat bg-fixed min-h-60 relative"
        style={{
          backgroundImage:
            "url(/assets/tourist-making-a-sip-from-bottle-during-hiking-tour.jpg)",
        }}
      >
        <div className="z-10 bg-opacity-60 bg-black absolute top-0 left-0 w-full h-full"></div>
        <Container className="relative z-20 text-white">
          <h1 className="text-4xl  font-bold">
            {postType === "news"
              ? t("news.index.title")
              : t("blog.index.title")}
          </h1>
          <p className="text-lg">
            {postType === "news"
              ? t("news.index.description")
              : t("blog.index.description")}
          </p>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-4">
          {items.map((item) => (
            <Fragment key={item.id}>
              {postType === "news" ? (
                <NewsCard news={item as MVNews} />
              ) : (
                <BlogCard blog={item as MVBlog} />
              )}
            </Fragment>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Blog;
