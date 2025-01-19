"use client";

import { Avatar } from "@nextui-org/react";
import { FC } from "react";

const RaceAvatar: FC<{ src: string }> = ({ src }) => {
  if (!src) return null;
  return <Avatar src={src} />;
};

export default RaceAvatar;
