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
      <CardBody className="flex p-0 flex-nowrap">
        {(blog.thumbnail || blog.thumbnail_full) && (
          <Link
            href={`/blog/${blog.slug}`}
            className="w-full min-w-48 max-h-40 flex"
            title={blog.title}
          >
            <Image
              removeWrapper
              isBlurred
              alt={blog.title}
              className="h-auto w-full flex-none object-cover object-top"
              src={blog.thumbnail ?? blog.thumbnail_full}
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
          {blog?.category.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {blog.category.map((c, index) => (
                <Chip key={index} variant="flat" color="success" size="sm">
                  {c.name}
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
