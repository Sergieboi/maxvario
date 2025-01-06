import { CalendarEvent } from "@/lib/types/misc";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import { FC } from "react";

type Props = {
  event: CalendarEvent;
};

const SingleEvent: FC<Props> = ({ event }) => {
  return (
    <div
      className={clsx(
        "rounded",
        event.extendedProps?.post_type === "event"
          ? "bg-blue-300"
          : "bg-red-400"
      )}
      onClick={() => {
        
      }}
    >
      <Button 
      disableAnimation
      disableRipple
      className="w-full rounded text-white" size="sm" variant="light" onPress={() => {alert('clicked')}}>
        {event.title}
      </Button>
    </div>
  );
};

export default SingleEvent;
