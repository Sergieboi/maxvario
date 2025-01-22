"use client";
import { MVAd as MVAdType } from "@/lib/types/misc";
import { Card, Image } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { FC } from "react";

type Props = {
  ad: MVAdType;
};

const MVAd: FC<Props> = ({ ad }) => {
  const session = useSession();
  return (
    <Card
      isPressable
      className="border-1 p-2 border-gray-300 bg-gray-50 space-y-2 cursor-pointer"
      onPress={() => {
        // send click event to google analytics
        window?.gtag("event", "mvad_click", {
          ad_id: ad.id,
          ad_title: ad.title,
          user_id: session?.data?.user?.id ?? "N/A",
          debug_mode: true,
        });
        // open in a new tab
        if (ad.url) {
          window.open(ad.url, "_blank");
        }
      }}
    >
      {ad.thumbnail && <Image src={ad.thumbnail} alt={ad.title} />}
      {ad.title && <p className="font-bold">{ad.title}</p>}
      {ad.content && <p>{ad.content}</p>}
    </Card>
  );
};

export default MVAd;
