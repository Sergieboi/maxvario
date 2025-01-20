"use client";
import { useTranslations } from "next-intl";
import { FC } from "react";
import Container from "../shared/container";
import { MVRace } from "@/lib/types/misc";
import RaceCard from "../cards/race-card";

type Props = {
  events: Array<MVRace>;
};

const Upcoming: FC<Props> = ({ events }) => {
  const t = useTranslations("upcoming");
  return (
    <div className="relative">
      <Container className="py-20">
        <h1 className="text-3xl font-semibold mb-3 text-blue-800">
          {t("title")}
        </h1>
        <p className="text-lg mb-8 text-blue-700">{t("description")}</p>
        <div className="flex flex-wrap gap-4">
          {events?.map((event, index) => (
            <div
              key={index}
              className=" flex w-full md:w-[calc(50%-8px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(25%-12px)] 2xl:w-[calc(20%-12.8px)]"
            >
              <RaceCard race={event} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Upcoming;
