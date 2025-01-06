"use client";
import { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Container from "../shared/container";
import SingleEvent from "./single-event";
import { useLocale } from "next-intl";
import { CalendarEvent } from "@/lib/types/misc";

const MainCalendar: FC = () => {
  const locale = useLocale();
  const events: CalendarEvent[] = [];
  return (
    <Container className="py-28">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventContent={SingleEvent}
        locale={locale}
        eventInteractive
        eventBackgroundColor="transparent"
        eventBorderColor="transparent"
        events={events}
        // events={[
        //   {
        //     title: "event 1",
        //     start: "2025-01-08",
        //     end: "2025-01-15",
        //     allDay: true,
        //     extendedProps: {
        //         post_type: "event",
        //     }

        //   },
        //   { title: "event 2", start: "2025-01-04", end: "2025-01-10", extendedProps: {post_type: 'race'} },
        // ]}
      />
    </Container>
  );
};

export default MainCalendar;
