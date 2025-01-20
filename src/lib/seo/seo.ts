import { Metadata } from "next";
import { Locale, MVBlog, MVNews, MVRace, PageName } from "../types/misc";
import { getTranslations } from "next-intl/server";
import { DEFAULT_LOCALE } from "../constants";

type Props = {
  page: PageName;
  locale: Locale;
  data?: Record<string, unknown>;
};

export const seoContent = async ({
  page,
  locale = DEFAULT_LOCALE,
  data,
}: Props): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: "seo" });
  const md: Metadata = {};
  md.openGraph = {};
  md.title = t("title");
  md.description = t("description");
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
    case "calendar":
    case "map":
    case "forgotPassword":
    case "resetPassword":
    case "signup":
      md.title += ` - ${t(`${page}.title`)}`;
      break;
    case "race":
      md.title += ` - ${(data as MVRace)?.title}`;
      md.robots = {
        index: true,
        follow: true,
        "max-image-preview": "large",
      };
      md.openGraph.images = [];
      break;
    case 'single-blog':
      md.title += ` - ${(data as MVNews | MVBlog)?.title}`;
      md.robots = {
        index: true,
        follow: true,
        "max-image-preview": "large",
      };
      md.openGraph.images = [];
      break;
    case "single-page":
      md.title += ` - ${(data as MVBlog)?.title}`;
      md.robots = {
        index: true,
        follow: true,
        "max-image-preview": "large",
      };
      md.openGraph.images = [];
      break;
  }
  md.openGraph.title = md.title;
  md.openGraph.description = md.description;
  md.openGraph.locale = locale;

  return md;
};
