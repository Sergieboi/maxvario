"use client";

import { MAP_ID } from "@/lib/constants";
import { Input } from "@nextui-org/input";
import { Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useTranslations } from "next-intl";
import { FC, useEffect, useRef, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type PlaceDetails = {
  lat: number;
  lng: number;
  address?: string;
  place_id?: string;
  city?: string;
  state?: string;
  country?: string;
  country_code?: string; // Added country code
};

type Props = {
  onLocationChange: (location: PlaceDetails) => void;
  defaultLocation?: {
    search: string;
    coords: google.maps.LatLngLiteral;
  };
  errors?: Merge<
    FieldError,
    FieldErrorsImpl<{
      lat: number;
      lng: number;
      place_id: string;
      address: string;
    }>
  >;
};

// Helper function to extract city, state, country, and country code
const extractAddressComponents = (
  components: google.maps.GeocoderAddressComponent[]
): {
  city?: string;
  state?: string;
  country?: string;
  country_code?: string;
} => {
  const result: {
    city?: string;
    state?: string;
    country?: string;
    country_code?: string;
  } = {};

  components.forEach((component) => {
    const types = component.types;
    if (types.includes("locality")) {
      result.city = component.long_name;
    } else if (types.includes("administrative_area_level_1")) {
      result.state = component.long_name;
    } else if (types.includes("country")) {
      result.country = component.long_name;
      result.country_code = component.short_name; // Get 2-letter country code
    }
  });

  return result;
};

// Utility function to extract detailed place information
const extractPlaceDetails = (
  place: google.maps.places.PlaceResult
): PlaceDetails => {
  if (!place.geometry) {
    throw new Error("Place does not have geometry information.");
  }

  const lat = place.geometry.location?.lat() ?? 0;
  const lng = place.geometry.location?.lng() ?? 0;
  const addressComponents = place.address_components || [];
  const { city, state, country, country_code } =
    extractAddressComponents(addressComponents);

  return {
    lat,
    lng,
    address: place.formatted_address || "",
    place_id: place.place_id || "",
    city,
    state,
    country,
    country_code,
  };
};

const LocationPicker: FC<Props> = ({ onLocationChange, defaultLocation }) => {
  const defaultMapCenter = defaultLocation?.coords ?? { lat: 0, lng: 0 };
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState(defaultLocation?.search ?? "");
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral>(defaultMapCenter);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!placesLib || !inputRef.current || !map) return;

    const options: google.maps.places.AutocompleteOptions = {
      fields: [
        "formatted_address",
        "geometry",
        "place_id",
        "address_components",
      ],
      types: ["geocode"], // Limit results to geocode types
    };
    setPlaceAutocomplete(new placesLib.Autocomplete(inputRef.current, options));
  }, [placesLib, map]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();

      if (place.geometry) {
        const details = extractPlaceDetails(place);
        setSearchQuery(place.formatted_address || searchQuery);
        setMarkerPosition({ lat: details.lat, lng: details.lng });
        onLocationChange(details);

        map?.setCenter({ lat: details.lat, lng: details.lng });
        map?.setZoom(15);
      }
    });
  }, [placeAutocomplete, searchQuery, onLocationChange, map]);

  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (lat && lng) {
      setMarkerPosition({ lat, lng });

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const details = extractPlaceDetails(results[0]);
          onLocationChange(details);
        }
      });
    }
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder={t("common.searchPlace")}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="absolute top-2 left-2 z-10 max-w-72"
        color="primary"
        variant="faded"
      />
      <div className="w-full h-96 relative rounded-xl overflow-hidden">
        <Map
          disableDefaultUI
          mapId={MAP_ID}
          zoomControl
          defaultZoom={3}
          minZoom={2}
          defaultCenter={defaultMapCenter}
        >
          {markerPosition && (
            <Marker
              position={markerPosition}
              draggable
              onDragEnd={handleDragEnd}
            />
          )}
        </Map>
      </div>
    </div>
  );
};

export default LocationPicker;
