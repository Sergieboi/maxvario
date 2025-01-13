"use client";
import { MVBlog, MVNews, MVRace } from "@/lib/types/misc";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import RacesTable from "./races/races";
import BlogTable from "./blog/blog";

type Props = {
  data: Array<MVRace | MVBlog | MVNews>;
};

const AccountPosts: FC<Props> = ({ data }) => {
  const t = useTranslations();
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="races" title={t("account.posts.races.title")}>
          <Card>
            <CardBody>
              <RacesTable
                races={data.filter((p) => p.post_type === "race") as MVRace[]}
              />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="news" title={t("account.posts.news.title")}>
          <Card>
            <CardBody>
              <BlogTable
                blog={data.filter((p) => p.post_type === "news")}
                postType="news"
              />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="blog" title={t("account.posts.blog.title")}>
          <Card>
            <CardBody>
              <BlogTable
                blog={data.filter((p) => p.post_type === "post")}
                postType="post"
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AccountPosts;
