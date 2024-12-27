import { Metadata } from "next";
import { Locale, PageName } from "../types/misc";
import { getTranslations } from "next-intl/server";
import { DEFAULT_LOCALE } from "../constants";

type Props = {
  page: PageName;
  locale: Locale;
};

export const seoContent = async ({
  page,
  locale = DEFAULT_LOCALE,
}: Props): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: "seo" });
  let title = t("title");
  const description = t("description");
  switch (page) {
    case "blog":
    case "news":
    case "404":
    case "home":
    case "about":
    case "contact":
    case "account":
    case "privacy":
    case "terms":
    case "signin":
    case "events":
    case "races":
      title += ` - ${t(`${page}.title`)}`;
      break;
  }
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale,
    },
  };
};
