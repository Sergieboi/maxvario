import { MVBlog, MVNews, SidebarContent } from "@/lib/types/misc";
import { FC } from "react";
import Container from "../shared/container";
import Sidebar from "./sidebar";
import Comments from "./comments";
import Blocks from "../shared/blocks/blocks";
import ShareButtons from "../shared/share";
import { SITE_URL } from "@/lib/constants";
import { useLocale } from "next-intl";

type Props = {
  blog: MVNews | MVBlog;
  sidebar?: SidebarContent | null;
};

const SingleBlog: FC<Props> = ({ blog, sidebar }) => {
  const locale = useLocale();
  return (
    <div className="mt-24">
      <div
        className="flex items-center bg-cover bg-center bg-no-repeat bg-fixed min-h-64 relative"
        style={{
          backgroundImage: `url(${blog.thumbnail_full})`,
        }}
      >
        <div className="z-10 bg-opacity-60 bg-black absolute top-0 left-0 w-full h-full"></div>
        <Container className="relative z-20 text-white">
          <h1 className="text-4xl  font-bold">{blog.title}</h1>
          {blog.excerpt && <p className="text-lg">{blog.excerpt}</p>}
        </Container>
      </div>
      <Container className="py-20 flex flex-col lg:flex-row gap-10">
        <div className="w-full xl:w-3/4 space-y-5">
          <Blocks blocks={blog.content_json} />
          <ShareButtons
            url={`${SITE_URL}/${locale}/${
              blog.post_type === "news" ? "news" : "blog"
            }/${blog.slug}`}
          />
          {<Comments comments={blog.comments} postId={blog.id} />}
        </div>
        <div className="w-full xl:w-1/4">
          <Sidebar sidebar={sidebar} />
        </div>
      </Container>
    </div>
  );
};

export default SingleBlog;
