"use client";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { FC } from "react";

type Props = {
  url: string;
};

const ShareButtons: FC<Props> = ({ url }) => {
  const t = useTranslations();
  if (!url) {
    return null;
  }
  return (
    <div className="inline-flex gap-2 border rounded-full py-2 px-4">
      <span className="text-sm font-semibold">{t("common.shareOn")}</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <Icon
          icon="akar-icons:facebook-fill"
          width={22}
          height={22}
          className="hover:text-[#1877f2]"
        />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <Icon icon="akar-icons:x-fill" width={22} height={22} />
      </a>
    </div>
  );
};

export default ShareButtons;
