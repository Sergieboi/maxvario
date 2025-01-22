import { MVBlog, MVNews, TaxonomyPage } from "@/lib/types/misc";
import { FC, Fragment } from "react";
import Container from "./shared/container";
import NewsCard from "./cards/news-card";
import BlogCard from "./cards/blog-card";

type Props = {
  data: TaxonomyPage;
  postType: "news" | "post";
};

const Taxonomy: FC<Props> = ({ data, postType }) => {
  return (
    <div className="mt-24">
      <div
        className="flex items-center bg-cover bg-center bg-no-repeat bg-fixed min-h-64 relative"
        style={{
          backgroundImage: `url(${data.taxonomy.image})`,
        }}
      >
        <div className="z-10 bg-opacity-60 bg-black absolute top-0 left-0 w-full h-full"></div>
        <Container className="relative z-20 text-white">
          <h1 className="text-4xl  font-bold">{data.taxonomy.term}</h1>
          <p className="text-lg">{data.taxonomy.description}</p>
        </Container>
      </div>
      <Container className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {data.data.map((item) => (
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

export default Taxonomy;
