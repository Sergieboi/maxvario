import { MVBlog, MVNews } from "@/lib/types/misc";
import { FC } from "react";
import Container from "../shared/container";
import Sidebar from "./sidebar";
import { useTranslations } from "next-intl";
import Comments from "./comments";

type Props = {
  blog: MVNews | MVBlog;
};

const SingleBlog: FC<Props> = ({ blog }) => {
  const t = useTranslations();
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
          <div>Post content will be here</div>
          <h2 className="text-lg font-semibold">{t("blog.comments.title")}</h2>
          {<Comments comments={blog.comments} postId={blog.id} />}
        </div>
        <div className="w-full xl:w-1/4">
          <Sidebar />
        </div>
      </Container>
    </div>
  );
};

export default SingleBlog;
