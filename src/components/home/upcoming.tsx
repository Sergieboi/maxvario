import { useTranslations } from "next-intl";
import { FC } from "react";
import Container from "../shared/container";

type Props = {
    events: number[];
}

const Upcoming: FC<Props> = ({ events }) => {
  const t = useTranslations("upcoming");
  return (
    <div className="bg-white">
      <Container className="py-20">
        <h1 className="text-3xl font-semibold mb-3 text-blue-800">{t("title")}</h1>
        <p className="text-lg mb-8 text-blue-700">{t("description")}</p>
        <div className="flex flex-wrap">
            {events?.map((event, index) => (
                <div key={index} className="flex w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <div className="aspect-square ">
                </div>
                </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Upcoming;
