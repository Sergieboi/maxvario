"use client";
import { MVRace } from "@/lib/types/misc";
import { formatDateRange } from "@/lib/utils";
import { Avatar, Chip } from "@nextui-org/react";
import { FC } from "react";

const RaceDateChip: FC<{ race: MVRace }> = ({ race }) => {
  if (!race.start_date) return null;
  console.log(race.start_date, race.end_date);
  return (
    <Chip
      color="primary"
      classNames={{
        content: "flex items-center gap-2",
      }}
      size="lg"
      avatar={
        <Avatar
          src={`/assets/flags/${race?.location_data?.country_short?.toLowerCase()}.svg`}
        />
      }
    >
      <span className="leading-4 font-semibold">
        {formatDateRange(race.start_date, race.end_date)
          .filter((d) => d)
          .map((d) => new Date(d).toLocaleDateString())
          .join(" - ")}
      </span>
    </Chip>
  );
};

export default RaceDateChip;
