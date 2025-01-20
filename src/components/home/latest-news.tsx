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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {news.map((post, index) => (
            <NewsCard news={post} key={index} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default LatestNews;
