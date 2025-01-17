"use client";
import { FC, useEffect, useState } from "react";

const CurrentTimezone: FC = () => {
  const [show, setShow] = useState(false);
  const [hourDiff, setHourDiff] = useState("");
  useEffect(() => {
    setShow(true);
    const offsetInMinutes = new Date().getTimezoneOffset();
    const res = -offsetInMinutes / 60;
    setHourDiff(res >= 0 ? `+${res}` : `${res}`);
  }, []);

  if (!show) {
    return null;
  }

  return <>{hourDiff}</>;
};

export default CurrentTimezone;
