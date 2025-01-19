"use client";
import { MVRace } from "@/lib/types/misc";
import { Icon } from "@iconify/react";
import { Card } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC } from "react";

type Props = {
  race: MVRace;
};

const SocialLinks: FC<Props> = ({ race }) => {
  const t = useTranslations();
  const links = [
    {
      title: t("social.facebook"),
      icon: <Icon icon="akar-icons:facebook-fill" width={48} height={48} />,
      url: race.facebook,
    },
    {
      title: t("social.tiktok"),
      icon: <Icon icon="akar-icons:tiktok-fill" width={48} height={48} />,
      url: race.tiktok,
    },
    {
      title: t("social.instagram"),
      icon: <Icon icon="akar-icons:instagram-fill" width={48} height={48} />,
      url: race.instagram,
    },
    {
      title: t("social.twitter"),
      icon: <Icon icon="akar-icons:x-fill" width={48} height={48} />,
      url: race.x,
    },
    {
      title: t("social.youtube"),
      icon: <Icon icon="iconoir:youtube-solid" width={48} height={48} />,
      url: race.youtube,
    },
    {
      title: t("social.website"),
      icon: <Icon icon="ic:sharp-link" width="48" height="48" />,
      url: race.website,
    },
    {
      title: t("social.tracking"),
      icon: <Icon icon="fluent:live-24-regular" width="48" height="48" />,
      url: race.tracking_url,
    },
    {
      title: t("social.results"),
      icon: <Icon icon="carbon:result" width="48" height="48" />,
      url: race.results_url,
    },
  ].filter((link) => link.url);
  return (
    <>
      <h3 className="font-semibold">{t("common.socialLinks")}</h3>
      {links.length === 0 && <p>N/A</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {links.map((link, index) => (
          <Card
            isPressable
            key={index}
            onPress={() => window.open(link.url, "_blank")}
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center px-2 gap-4 py-4 bg-gray-100 rounded-md shadow-none"
          >
            {link.icon}
            <span className="text-sm font-semibold">{link.title}</span>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SocialLinks;
