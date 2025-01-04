import { FC } from "react";
import Hero from "./hero";
import HomeIntro from "./intro";
import Upcoming from "./upcoming";
// import Cta from "../shared/cta";
import { HomeResponse } from "@/lib/types/misc";

type Props = {
  data: HomeResponse;
}

const Home: FC<Props> = ({ data }) => {
  return (
    <>
      <div className="bg-blue-900">
        <Hero />
        <HomeIntro />
        <Upcoming events={data?.upcoming} />
        {/* <Cta /> */}
      </div>
    </>
  );
};

export default Home;
