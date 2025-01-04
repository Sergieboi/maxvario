'use client';
import { MVEvent } from "@/lib/types/misc";
import { Button, Card, CardBody, CardFooter, CardProps, Image, Spacer } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";

type Props = CardProps & {
    event: MVEvent;
}

const EventCard: FC<Props> = ({ event, ...props }) => {
    const t = useTranslations();
  return (
    <Card {...props} classNames={{ base: "w-full" }}>
      <CardBody className="px-3 pb-1">
        {event.thumbnail_lg && (
          <Image
            alt="Card image"
            className="aspect-video w-full object-cover object-top"
            src={event.thumbnail_lg ?? null}
            isZoomed
          />
        )}
        <Spacer y={2} />
        <div className="flex flex-col gap-2 px-2">
          <h3 className="text-lg font-semibold text-black">{event.title}</h3>
          {event.excerpt && (
            <p className="text-small text-default-600 line-clamp-3">
              {event.excerpt}
            </p>
          )}
          {event.location?.country_short && (
            <div className="flex items-center gap-1 text-xs">
              <Image
                src={`/assets/flags/${event.location?.country_short.toLowerCase()}.svg`}
                alt={event.location?.country_short}
                width={24}
                height={24}
              />
              <span>
                {event.location.state ?? event.location.city},{" "}
                {event.location.country}
              </span>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <Button
          as={Link}
          href={`/events/${event.slug}`}
          title={event.title}
          fullWidth
          className="bg-blue-900 text-white"
        >
          {t("common.details")}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EventCard;