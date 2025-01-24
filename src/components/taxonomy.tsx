import {
  MVBlog,
  MVNews,
  SidebarContent,
  SiteTaxonomies,
  TaxonomyPage,
} from "@/lib/types/misc";
import { FC, Fragment } from "react";
import Container from "./shared/container";
import NewsCard from "./cards/news-card";
import BlogCard from "./cards/blog-card";
import Link from "next/link";
import Sidebar from "./blog/sidebar";

type Props = {
  data: TaxonomyPage;
  postType: "news" | "post";
  categories: SiteTaxonomies;
  sidebar?: SidebarContent | null;
};

const Taxonomy: FC<Props> = ({ data, postType, categories, sidebar }) => {
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
      <div className="bg-primary py-4">
        <Container className="flex items-center gap-3 flex-wrap">
          {(postType === "news"
            ? categories.news_categories
            : categories.categories
          ).map((cat) => {
            return (
              <Link
                href={`/${postType === "news" ? "news-category" : "category"}/${
                  cat.slug
                }`}
                key={cat.term_id}
                className="text-white text-sm hover:underline border-1 border-white/20 px-2 py-1 rounded-md"
              >
                {cat.name}
              </Link>
            );
          })}
        </Container>
      </div>
      <Container className="py-20 flex flex-col lg:flex-row gap-4">
        <div className="w-full xl:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
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
        </div>
        <div className="w-full xl:w-1/4">
          {sidebar && <Sidebar sidebar={sidebar} />}
        </div>
      </Container>
    </div>
  );
};

export default Taxonomy;
