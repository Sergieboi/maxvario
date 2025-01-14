"use client";
import { MVBlog, MVNews, MVRace } from "@/lib/types/misc";
import { Card, CardBody } from "@nextui-org/react";
import { FC } from "react";
import RacesTable from "./races/races";

type Props = {
  data: Array<MVRace | MVBlog | MVNews>;
};

const AccountPosts: FC<Props> = ({ data }) => {
  return (
    <div>
      <Card>
        <CardBody>
          <RacesTable
            racesList={data.filter((p) => p.post_type === "race") as MVRace[]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default AccountPosts;
