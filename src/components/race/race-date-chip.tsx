"use client";
import { MVRace } from "@/lib/types/misc";
import { Avatar, Chip } from "@nextui-org/react";
import { FC } from "react";

const RaceDateChip: FC<{ race: MVRace }> = ({ race }) => {
  if (!race.start_date) return null;
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
        {race.start_date?.substring(0, 10)}
      </span>
    </Chip>
  );
};

export default RaceDateChip;
