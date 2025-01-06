import { FC } from "react";
import Container from "../shared/container";
import { useTranslations } from "next-intl";
import { MVNews } from "@/lib/types/misc";
import NewsCard from "../cards/news-card";

type Props = {
  news: Array<MVNews>;
};

const LatestNews: FC<Props> = ({ news }) => {
  const t = useTranslations("latest-news");
  if (news.length === 0) {
    return null;
  }
  return (
    <div className=" relative">
      <Container className="py-20">
        <h1 className="text-3xl font-semibold mb-3 text-blue-800">
          {t("title")}
        </h1>
        <p className="text-lg mb-8 text-blue-700">{t("description")}</p>
        <div className="flex flex-wrap gap-4">
        {news.map((post, index) => (
          <div key={index} className="flex w-full md:w-[calc(50%-8px)] 2xl:w-[calc(33.3333%-16px)]">
            <NewsCard news={post} />
          </div>
        ))}
        </div>
      </Container>
    </div>
  );
};

export default LatestNews;
