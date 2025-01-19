"use client";
import { SidebarContent } from "@/lib/types/misc";
import { FC } from "react";
import MVAd from "../ad/ad";
import SummaryCard from "../map/summary-card";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

type Props = {
  sidebar?: SidebarContent | null;
};

const Sidebar: FC<Props> = ({ sidebar }) => {
  const t = useTranslations();

  if (!sidebar) return null;
  return (
    <aside className="bg-gray-100 w-full rounded-lg border-1 p-2 space-y-6 sticky top-28">
      {sidebar.ads.length > 0 && (
        <div className="space-y-2">
          {sidebar.ads.map((ad, index) => (
            <MVAd key={index} ad={ad} />
          ))}
        </div>
      )}
      {sidebar.upcoming.length > 0 && (
        <>
          <h3 className="font-semibold">{t("sidebar.upcomingRaces")}</h3>
          <div className="space-y-2 flex flex-col">
            {sidebar.upcoming.map((race) => (
              <SummaryCard
                race={race}
                key={race.id}
                cardClick={(r) => {
                  redirect(`/races/${r.slug}`);
                }}
              />
            ))}
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
