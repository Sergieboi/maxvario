import { FC } from "react";
import Hero from "./hero";
import HomeIntro from "./intro";
import Upcoming from "./upcoming";

const Home: FC = () => {
  return (
    <>
      <div className="bg-blue-900">
        <Hero />
        <HomeIntro />
          <Upcoming events={[]} />

      </div>
    </>
  );
};

export default Home;
