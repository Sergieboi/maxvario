import { FC } from "react";
import Hero from "./hero";
import HomeIntro from "./intro";
import Upcoming from "./upcoming";
import ResourcesCta from "./resources-cta";
import { HomeResponse } from "@/lib/types/misc";
import LatestBlog from "./latest-blog";
import LatestNews from "./latest-news";

type Props = {
  data: HomeResponse;
};

const Home: FC<Props> = ({ data }) => {
  return (
    <>
      <div className="bg-blue-900">
        <Hero />
        <HomeIntro images={data.images} />
        <div className="bg-white light-section">
          <ResourcesCta />
          <Upcoming events={data?.upcoming} />
          <LatestBlog blog={data?.blog} />
          <LatestNews news={data?.news} />
        </div>
      </div>
    </>
  );
};

export default Home;
