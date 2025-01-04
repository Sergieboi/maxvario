'use client';
import { MVRace } from "@/lib/types/misc";
import { Image } from "@nextui-org/react";
import { FC } from "react";

const RaceImage: FC<{race: MVRace}> = ({race}) => {
    return (
        <Image src={race.thumbnail} alt={race.title} isZoomed style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
        }} />
    )
};

export default RaceImage;