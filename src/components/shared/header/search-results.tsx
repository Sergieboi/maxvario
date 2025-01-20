"use client";
import { SearchResult } from "@/lib/types/misc";
import { Avatar } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";

const SearchResults: FC<{ results: Array<SearchResult> }> = ({ results }) => {
  const t = useTranslations();
  const races = (results ?? []).filter((p) => p.type === "race");
  const posts = (results ?? []).filter((p) => p.type === "post");
  const news = (results ?? []).filter((p) => p.type === "news");
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="flex items-center justify-between font-semibold">
          <span>{t("common.races")}</span>
          <span>{races.length}</span>
        </h4>
        {races.map((race, index) => {
          return (
            <Link
              href={`/${String(race.language)}/races/${race.slug}`}
              key={index}
              className="flex items-center gap-3"
            >
              <Avatar src={race.thumbnail} />
              <span>{race.title}</span>
            </Link>
          );
        })}
      </div>
      <div className="space-y-2">
        <h4 className="flex items-center justify-between font-semibold">
          <span>{t("common.posts")}</span>
          <span>{posts.length}</span>
        </h4>
        {posts.map((post, index) => {
          return (
            <Link
              href={`/${String(post.language)}/blog/${post.slug}`}
              key={index}
              className="flex items-center gap-3"
            >
              <Avatar src={post.thumbnail} />
              <span>{post.title}</span>
            </Link>
          );
        })}
      </div>
      <div className="space-y-2">
        <h4 className="flex items-center justify-between font-semibold">
          <span>{t("common.news")}</span>
          <span>{news.length}</span>
        </h4>
        {news.map((n, index) => {
          return (
            <Link
              href={`/${String(n.language)}/news/${n.slug}`}
              key={index}
              className="flex items-center gap-3"
            >
              <Avatar src={n.thumbnail} />
              <span>{n.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
