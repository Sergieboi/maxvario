"use client";

import type { CardProps } from "@nextui-org/react";

import React, { FC } from "react";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import { MVRace } from "@/lib/types/misc";

export type SummaryCardProps = CardProps & {
  race: MVRace;
  onClick: (race: MVRace) => void;
};

const SummaryCard: FC<SummaryCardProps> = ({ race, onClick, ...props }) => {
  return (
    <Card
      isPressable
      className="bg-cover bg-center min-h-28"
      style={{ backgroundImage: `url(${race.thumbnail_lg})` }}
      onPress={() => onClick(race)}
      {...props}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"></div>
      <CardBody className="p-0 overflow-hidden">
        <div className="absolute flex items-center w-[calc(100%-16px)] h-full px-2 gap-1.5 z-20">
          <Avatar
            size="sm"
            src={`/assets/flags/${race.location_data.country_short?.toLowerCase()}.svg`}
          />
          <div className="flex flex-col gap-1.5">
            <p className="text-white">{race.title}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
SummaryCard.displayName = "SummaryCard";

export default SummaryCard;
