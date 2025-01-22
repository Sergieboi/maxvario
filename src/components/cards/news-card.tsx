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
    <Card className="w-full max-w-[720px]" {...props}>
      <CardBody className="flex p-0 flex-nowrap">
        {(news.thumbnail || news.thumbnail_full) && (
          <Link
            href={`/news/${news.slug}`}
            className="w-full min-w-48 max-h-40 flex"
            title={news.title}
          >
            <Image
              removeWrapper
              isBlurred
              alt={news.title}
              className="h-auto w-full flex-none object-cover object-top"
              src={news.thumbnail ?? news.thumbnail_full}
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
            <p className="line-clamp-3">{news.excerpt}</p>
          </div>

          {news.news_category.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {news.news_category.map((category, index) => (
                <Chip key={index} variant="flat" color="success" size="sm">
                  <Link href={`/news-category/${category.slug}`}>
                    {category.name}
                  </Link>
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
