"use client";

import type { CardProps } from "@nextui-org/react";

import React, { FC } from "react";
import { Card, Image, CardBody, Chip } from "@nextui-org/react";
import { MVNews } from "@/lib/types/misc";
import Link from "next/link";

type Props = CardProps & {
  news: MVNews;
};

const NewsCard: FC<Props> = ({ news, ...props }) => {
  return (
    <Card className="w-full max-w-[520px]" {...props}>
      <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
        {news.thumbnail && (
          <Link
            href={`/news/${news.slug}`}
            className="w-full md:w-48 flex"
            title={news.title}
          >
            <Image
              removeWrapper
              isBlurred
              alt={news.title}
              className="h-auto w-full flex-none object-cover object-top"
              src={news.thumbnail}
            />
          </Link>
        )}
        <div className="px-4 py-5">
          <h3 className="text-large font-medium">
            <Link href={`/news/${news.slug}`} title={news.title}>
              {news.title}
            </Link>
          </h3>
          <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
            <p className="line-clamp-2">{news.excerpt}</p>
          </div>

          {news.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {news.categories.map((category, index) => (
                <Chip key={index} variant="flat" color="success" size="sm">
                  {category.name}
                </Chip>
              ))}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default NewsCard;
