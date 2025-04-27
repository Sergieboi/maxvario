"use client";
import { MAPS_KEY } from "@/lib/constants";
import { APIProvider } from "@vis.gl/react-google-maps";
import { FC } from "react";
import MainMap from "./main-map";
import { CalendarResponse } from "@/lib/types/misc";

const MapProvider: FC<CalendarResponse> = ({ calendar, filter_options }) => {
  return (
    <APIProvider apiKey={MAPS_KEY}>
      <MainMap calendar={calendar} filter_options={filter_options} key='races-map' />
    </APIProvider>
  );
};

export default MapProvider;
