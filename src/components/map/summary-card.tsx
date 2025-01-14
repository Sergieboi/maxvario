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
      className="bg-cover bg-no-repeat bg-center min-h-32"
      style={{ backgroundImage: `url(${race.background_image})` }}
      onPress={() => onClick(race)}
      {...props}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10"></div>
      <CardBody className="p-0 overflow-hidden">
        <div className="absolute top-0 left-3 flex items-center justify-between text-center w-[calc(100%-24px)] h-full gap-2 z-20">
          <Avatar
            size="sm"
            className="min-w-8"
            isBordered
            color="danger"
            src={`/assets/flags/${race.location_data.country_short?.toLowerCase()}.svg`}
          />
          <div className="flex flex-col gap-1.5">
            <p className="text-white font-semibold">{race.title}</p>
          </div>
          <Avatar
            size="sm"
            isBordered
            color="danger"
            className="max-w-8 min-w-8 min-h-8 max-h-8 "
            src={race.thumbnail}
          />
        </div>
      </CardBody>
    </Card>
  );
};
SummaryCard.displayName = "SummaryCard";

export default SummaryCard;
