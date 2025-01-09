"use client";
import { MVRace } from "@/lib/types/misc";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { FC } from "react";
import RaceCard from "../cards/race-card";

type Props = {
  onClick: (race: MVRace) => void;
  selected: boolean;
  race: MVRace;
  position: {
    lat: number;
    lng: number;
  };
};

const MarkerWithInfoWindow: FC<Props> = ({
  race,
  position,
  selected,
  onClick,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  // if the maps api closes the infowindow, we have to synchronize our state

  return (
    <AdvancedMarker
      ref={markerRef}
      position={position}
      clickable
      onClick={() => onClick(race)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-blue-700"
      >
        <path d="M18 6c0-3.314-2.687-6-6-6s-6 2.686-6 6c0 2.972 2.164 5.433 5 5.91v12.09l2-2v-10.09c2.836-.477 5-2.938 5-5.91zm-8.66-1.159c-.53-.467-.516-1.372.034-2.023.548-.65 1.422-.799 1.952-.333s.515 1.372-.033 2.021c-.549.652-1.423.801-1.953.335z" />
      </svg>
      {selected && (
        <InfoWindow
          anchor={marker}
          headerDisabled
          maxWidth={280}
          style={{
            minHeight: "200px",
          }}
        >
          <RaceCard race={race} className="rounded-none" />
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default MarkerWithInfoWindow;
