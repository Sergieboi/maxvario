import { FC } from "react";
import Hero from "./hero";
import HomeIntro from "./intro";

const Home: FC = () => {
    return (
        <div className="bg-blue-900">
            <Hero />
            <HomeIntro />
        </div>
    )
};

export default Home;