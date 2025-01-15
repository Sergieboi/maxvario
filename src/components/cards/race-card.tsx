"use client";
import { MVRace } from "@/lib/types/misc";
import { FC } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardProps,
  Chip,
  Image,
  Spacer,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = CardProps & {
  race: MVRace;
};

const RaceCard: FC<Props> = ({ race, ...props }) => {
  const t = useTranslations();
  const thumbnail = race.background_image
    ? race.background_image
    : race.thumbnail_lg;
  const flag = race?.location_data?.country_short
    ? race?.location_data?.country_short?.toLowerCase()
    : null;

  return (
    <Card
      {...props}
      classNames={{
        base: "w-full",
      }}
    >
      <CardBody className="px-3 pb-1 w-full">
        {(thumbnail?.length ?? 0) > 0 && (
          <Image
            alt={race.title}
            className="aspect-video w-full object-cover object-top"
            src={thumbnail}
            isZoomed
          />
        )}
        <Spacer y={2} />
        <div className="flex flex-col gap-3 px-2">
          <h3 className="text-lg font-semibold text-black">{race.title}</h3>
          <Chip color="success" size="sm" variant="flat">
            {race?.start_date ? race.start_date.substring(0, 10) : "N/A"} -{" "}
            {race?.end_date ? race.end_date.substring(0, 10) : "N/A"}
          </Chip>
          {race.excerpt && (
            <p className="text-small text-default-600 line-clamp-3">
              {race.excerpt}
            </p>
          )}
          {flag ? (
            <div className="flex items-center gap-1 text-xs">
              <Image
                src={`/assets/flags/${flag}.svg`}
                alt={flag}
                width={24}
                height={24}
              />
              <span>
                {race.location_data.city ?? race.location_data.state},{" "}
                {race.location_data.country}
              </span>
            </div>
          ) : null}
          <div className="flex items-center gap-1 text-xs">
            {race?.athlete_category?.length > 0 && (
              <>
                {race.athlete_category.map((category, index) => (
                  <Chip variant="flat" key={index} color="warning" size="sm">
                    {category.name}
                  </Chip>
                ))}
              </>
            )}
            {race?.fai_category?.length > 0 && (
              <>
                {race.fai_category.map((category, index) => (
                  <Chip variant="flat" key={index} color="secondary" size="sm">
                    {category.name}
                  </Chip>
                ))}
              </>
            )}
            {race?.race_format?.length > 0 && (
              <>
                {race.race_format.map((category, index) => (
                  <Chip variant="flat" key={index} color="primary" size="sm">
                    {category.name}
                  </Chip>
                ))}
              </>
            )}
          </div>
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
