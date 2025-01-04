"use client";
import { MVRace } from "@/lib/types/misc";
import { FC } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Spacer,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  race: MVRace;
};

const RaceCard: FC<Props> = ({ race }) => {
  const t = useTranslations();
  return (
    <Card>
      <CardBody className="px-3 pb-1">
        {race.thumbnail_lg && (
          <Image
            alt="Card image"
            className="aspect-video w-full object-cover object-top"
            src={race.thumbnail_lg}
            isZoomed
          />
        )}
        <Spacer y={2} />
        <div className="flex flex-col gap-2 px-2">
          <h3 className="text-lg font-semibold text-black">{race.title}</h3>
          {race.excerpt && (
            <p className="text-small text-default-600 line-clamp-3">
              {race.excerpt}
            </p>
          )}
          {race.location?.country_short && (
            <div className="flex items-center gap-1 text-xs">
              <Image
                src={`/assets/flags/${race.location?.country_short.toLowerCase()}.svg`}
                alt={race.location?.country_short}
                width={24}
                height={24}
              />
              <span>
                {race.location.state ?? race.location.city},{" "}
                {race.location.country}
              </span>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <Button
          as={Link}
          href={`/races/${race.slug}`}
          title={race.title}
          fullWidth
          className="bg-blue-900 text-white"
        >
          {t("common.details")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RaceCard;
