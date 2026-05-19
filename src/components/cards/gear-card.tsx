"use client";

import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import { MVGear } from "@/lib/types/misc";
import Link from "next/link";
import { FC } from "react";

type Props = {
  gear: MVGear;
};

const GearCard: FC<Props> = ({ gear }) => {
  return (
    <Card
      as={Link}
      href={`/gear/${gear.slug}`}
      isPressable
      className="group w-full"
    >
      <CardBody className="p-0 overflow-hidden">
        <div className="relative w-full aspect-[4/3] bg-default-100 overflow-hidden">
          {gear.thumbnail || gear.thumbnail_full ? (
            <Image
              removeWrapper
              alt={gear.title}
              src={gear.thumbnail ?? gear.thumbnail_full ?? ""}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-default-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex flex-wrap gap-1">
          {gear.gear_categories.map((cat) => (
            <Chip key={cat.id} size="sm" variant="flat" color="primary">
              {cat.name}
            </Chip>
          ))}
        </div>
        <h3 className="text-medium font-semibold leading-snug line-clamp-2">
          {gear.title}
        </h3>
        {gear.brand && (
          <p className="text-small text-default-500">{gear.brand}</p>
        )}
        {gear.short_description && (
          <p className="text-small text-default-600 line-clamp-3">
            {gear.short_description}
          </p>
        )}
        {gear.price && (
          <p className="text-medium font-semibold text-primary mt-1">
            {gear.price}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default GearCard;
