"use client";
import { FC, Fragment, useEffect, useState } from "react";

import { Map, useMap } from "@vis.gl/react-google-maps";
import { MAP_ID } from "@/lib/constants";
import { CalendarResponse, MVRace } from "@/lib/types/misc";
import SummaryCard from "./summary-card";
import { groupAndSortByDate } from "@/lib/utils";
import MarkerWithInfoWindow from "./marker-with-infowindow";
import { Button } from "@nextui-org/react";
import MapFilter from "./filter";
import RaceCard from "../cards/race-card";
import Container from "../shared/container";
import { useTranslations } from "next-intl";

const MainMap: FC<CalendarResponse> = ({ calendar, filter_options }) => {
  const t = useTranslations("map");
  const [data, setData] = useState<MVRace[]>(calendar);
  const mapRef: google.maps.Map | null = useMap();

  const [showFilter, setShowFilter] = useState(false);

  const [selectedRace, setSelectedRace] = useState<MVRace | null>(null);

  useEffect(() => {
    if (!selectedRace || !mapRef) return;
    mapRef?.panTo({
      lat: selectedRace.location_data.lat,
      lng: selectedRace.location_data.lng,
    });
  }, [
    mapRef,
    selectedRace,
    selectedRace?.location_data.lat,
    selectedRace?.location_data.lng,
  ]);
  const goToList = () => {
    const el = document.querySelector("#list-view");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="pt-24">
      <div className="flex h-[calc(100dvh-96px)] relative">
        <div className="hidden md:flex flex-col p-3 gap-2 absolute md:w-72 xl:w-80 md:max-h-[calc(100%-16px)] h-fit bg-white bg-opacity-40 backdrop-blur-sm  top-2 left-2 z-10 rounded-lg overflow-auto">
          {groupAndSortByDate(data).map((raceGroup) => {
            return (
              <Fragment key={raceGroup.key}>
                <h3 className="font-bold text-center text-lg">
                  {raceGroup.key}
                </h3>
                {raceGroup.items.map((race) => (
                  <SummaryCard
                    race={race}
                    key={race.id}
                    cardClick={(r) => setSelectedRace(r)}
                  />
                ))}
              </Fragment>
            );
          })}
        </div>
        <div className="h-full w-full bg-gray-50 relative">
          <Map
            className="w-full h-full"
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            mapId={MAP_ID}
            streetViewControl={false}
            mapTypeControl={false}
            minZoom={2}
            onClick={() => setSelectedRace(null)}
            fullscreenControl={false}
          >
            {(data ?? [])
              .filter((e) => e.location_data?.lat && e.location_data.lng)
              .map((race) => (
                <MarkerWithInfoWindow
                  selected={selectedRace?.id === race.id}
                  key={race.id}
                  race={race}
                  onClick={(race) => setSelectedRace(race)}
                  position={{
                    lat: race.location_data?.lat as number,
                    lng: race.location_data?.lng as number,
                  }}
                />
              ))}
          </Map>
          <div className="flex items-center gap-2 absolute top-2 right-2 z-10">
            <Button
              className="md:hidden"
              variant="solid"
              color="danger"
              onPress={goToList}
            >
              {t("listView")}
            </Button>
            <Button
              isIconOnly
              color="primary"
              onPress={() => setShowFilter(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <Container className="py-20">
        <div className="flex flex-wrap gap-4" id="list-view">
          {data?.map((event, index) => (
            <div
              key={index}
              className="upcoming-card flex w-full md:w-[calc(50%-8px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(25%-12px)] 2xl:w-[calc(20%-12.8px)]"
            >
              <RaceCard race={event} />
            </div>
          ))}
        </div>
      </Container>
      <MapFilter
        hide={() => setShowFilter(false)}
        filter_options={filter_options}
        update={(data: Array<MVRace>) => setData(data)}
        visible={showFilter}
      />
    </div>
  );
};

export default MainMap;
