'use client'
import { useTranslations } from "next-intl";
import { FC, useEffect } from "react";
import Container from "../shared/container";
import { MVEvent, MVRace } from "@/lib/types/misc";
import RaceCard from "../cards/race-card";
import gsap from "gsap";
import EventCard from "../cards/event-card";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
    events: Array<MVEvent | MVRace>;
}

const Upcoming: FC<Props> = ({ events }) => {
  const t = useTranslations("upcoming");
  useEffect(() => {

      gsap.fromTo(
        '.upcoming-card',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.85,
          ease: "expo.inOut",
          stagger: {
            amount: 0.9,
            from: "random",
          },
          scrollTrigger: {
            id: "upcoming",
            trigger: ".upcoming-card",
            start: "top 80%",
            scrub: false,
            once: false,
          },
        }
      );
      return () => {
        ScrollTrigger.getById("upcoming")?.kill();
      }
  }, []);
  return (
    <div className="relative">
      <Container className="py-20">
        <h1 className="text-3xl font-semibold mb-3 text-blue-800">{t("title")}</h1>
        <p className="text-lg mb-8 text-blue-700">{t("description")}</p>
        <div className="flex flex-wrap">
            {events?.map((event, index) => (
                <div key={index} className="upcoming-card flex w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 p-2">
                    {event.post_type === "event" ? <EventCard event={event} /> : <RaceCard race={event} />}
                </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Upcoming;
