"use client";

import type { CardProps } from "@nextui-org/react";

import React, { FC } from "react";
import { Card, Image, CardBody, Chip } from "@nextui-org/react";
import { MVBlog } from "@/lib/types/misc";
import Link from "next/link";

type Props = CardProps & {
  blog: MVBlog;
};

const BlogCard: FC<Props> = ({ blog, ...props }) => {
  return (
    <Card className="w-full max-w-[720px]" {...props}>
      <CardBody className="flex flex-row p-0 flex-nowrap">
        {blog.thumbnail && (
          <Link
            href={`/blog/${blog.slug}`}
            className="w-full min-w-48 max-w-48 max-h-48   flex"
            title={blog.title}
          >
            <Image
              removeWrapper
              isBlurred
              alt={blog.title}
              className="h-auto w-full flex-none object-cover object-top"
              src={blog.thumbnail}
            />
          </Link>
        )}
        <div className="px-4 py-5 w-full">
          <h3 className="text-large font-medium">
            <Link href={`/blog/${blog.slug}`} title={blog.title}>
              {blog.title}
            </Link>
          </h3>
          <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
            <p className="line-clamp-3">{blog.excerpt}</p>
          </div>
          {blog.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {blog.categories.map((category, index) => (
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

export default BlogCard;
