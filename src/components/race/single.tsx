import { MVRace, SidebarContent } from "@/lib/types/misc";
import { FC, ReactNode } from "react";
import Container from "../shared/container";
import RaceDateChip from "./race-date-chip";
import { useTranslations } from "next-intl";
import RaceAvatar from "./race-avatar";
import Blocks from "../shared/blocks/blocks";
import Sidebar from "../blog/sidebar";
import Comments from "../blog/comments";

type Props = {
  race: MVRace;
  sidebar?: SidebarContent | null;
};

const SingleRace: FC<Props> = ({ race, sidebar }) => {
  const t = useTranslations();

  const raceSummary: Array<{ label: string; content: ReactNode }> = [
    {
      label: t("race.location.title"),
      content: (
        <span className="text-sm">{`${race.location_data?.country} (${race.location_data?.country_short})`}</span>
      ),
    },
    {
      label: t("race.duration.title"),
      content: <span className="text-sm">{race.duration ?? "N/A"}</span>,
    },

    {
      label: t("race.registration.title"),
      content: (
        <span className="text-sm">
          {race?.registration_date?.substring(0, 10) ?? "N/A"} -{" "}
          {race?.registration_end_date?.substring(0, 10) ?? "N/A"}
        </span>
      ),
    },
    {
      label: t("race.athleteCategory.title"),
      content: (
        <span className="text-sm">
          {race?.athlete_category?.length > 0
            ? race.athlete_category.map((category) => category.name).join(", ")
            : "N/A"}
        </span>
      ),
    },
    {
      label: t("race.faiCategory.title"),
      content: (
        <span className="text-sm">
          {race?.fai_category?.length > 0
            ? race.fai_category.map((category) => category.name).join(", ")
            : "N/A"}
        </span>
      ),
    },
    {
      label: t("race.raceFormat.title"),
      content: (
        <span className="text-sm">
          {race?.race_format?.length > 0
            ? race.race_format.map((category) => category.name).join(", ")
            : "N/A"}
        </span>
      ),
    },
  ];
  return (
    <>
      <div
        className="min-h-80 bg-cover bg-center bg-fixed flex items-center mt-24 relative"
        style={{ backgroundImage: `url(${race.background_image})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70"></div>
        <Container className="relative z-20 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="text-white flex flex-col gap-2">
            {race.thumbnail_full && <RaceAvatar src={race.thumbnail_full} />}
            <h1 className="font-bold text-3xl ">{race.title}</h1>
            {race?.excerpt && (
              <p className="text-lg max-w-sm">{race.excerpt}</p>
            )}
          </div>
          <RaceDateChip race={race} />
        </Container>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-primary text-white">
        {raceSummary.map((item, index) => (
          <div key={index} className="p-2 md:p-3 lg:p-5 relative">
            <h2 className="font-bold text-lg">{item.label}</h2>
            <div>{item.content}</div>
          </div>
        ))}
      </div>
      <Container className="py-20 flex flex-col lg:flex-row gap-10">
        <div className="w-full xl:w-3/4 space-y-5">
          <Blocks blocks={race?.content_json} />
          <Comments comments={race.comments} postId={race.id} />
        </div>
        <div className="w-full xl:w-1/4">
          <Sidebar sidebar={sidebar} />
        </div>
      </Container>
    </>
  );
};

export default SingleRace;
