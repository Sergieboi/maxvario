"use client";
import { MVBlog, MVNews, MVRace } from "@/lib/types/misc";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import RacesTable from "./races/races";

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
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="blog" title={t("account.posts.blog.title")}>
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AccountPosts;
