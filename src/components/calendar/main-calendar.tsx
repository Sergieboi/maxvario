"use client";
import { FC, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Container from "../shared/container";
import SingleEvent from "./single-event";
import { useLocale, useTranslations } from "next-intl";
import { CalendarEvent, CalendarResponse } from "@/lib/types/misc";
import { useForm, Controller } from "react-hook-form";
import {
  Avatar,
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FLAGS } from "@/lib/flags";

interface FilterOptions {
  dateFrom: string;
  dateTo: string;
  country: string;
  city: string;
  title: string;
}

const MainCalendar: FC<CalendarResponse> = ({ calendar }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const t = useTranslations("calendar");
  const locale = useLocale();
  useEffect(() => {
    const mappedEvents: CalendarEvent[] = calendar.map((event) => {
      return {
        title: event.title,
        start: event.start_date?.substring(0, 10),
        end: event.end_date?.substring(0, 10),
        extendedProps: {
          ...event,
        },
      };
    });
    setEvents(mappedEvents);
  }, [calendar]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FilterOptions>({
    defaultValues: {
      dateFrom: "",
      dateTo: "",
      country: "",
      city: "",
      title: "",
    },
  });

  const onSubmit = async (data: FilterOptions) => {
    const req = await fetch('/api/calendar/filter', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(data)
    });
    const response = await req.json();
    console.log(response);
    if (req.status === 200) {
      console.log(response);
      const mappedEvents: CalendarEvent[] = (response?.data as CalendarResponse).calendar.map((event) => {
        return {
          title: event.title,
          start: event.start_date?.substring(0, 10),
          end: event.end_date?.substring(0, 10),
          extendedProps: {
            ...event,
          },
        };
      });
      setEvents(mappedEvents);
    }
  };

  return (
    <>
      <div
        className="relative pt-48 pb-32 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            "url(/assets/maxvario-events-runners-on-the-street-healthy-lifestyle-jogging.jpg)",
        }}
      >
        <div className="absolute w-full h-full bg-black top-0 bg-opacity-70"></div>
        <Container className="relative z-10 text-white">
          <h1 className="text-3xl font-bold mb-6">{t("page.title")}</h1>
          <p className="leading-8">{t("page.description")}</p>
        </Container>
      </div>
      <Container>
        {/* FILTER */}
        <h2 className="font-bold text-2xl mt-8">{t("filter.title")}</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-4 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label={t("filter.name.title")}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="country"
            render={({ field, fieldState: { invalid, error } }) => (
              <Select
                {...field}
                label={t("filter.country.title")}
                isInvalid={invalid}
                errorMessage={error?.message}
              >
                {
                  FLAGS.map((flag) => {
                    return (
                      <SelectItem
                        key={flag.code}
                        startContent={
                          <Avatar
                            alt="Argentina"
                            className="w-6 h-6"
                            src={`/assets/flags/${flag.code}.svg`}
                          />
                        }
                      >
                        {flag.name}
                      </SelectItem>
                    )
                  })
                }
              </Select>
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label={t("filter.city.title")}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="dateFrom"
            control={control}
            render={({ fieldState: { invalid, error } }) => (
              <DatePicker
                label={t("filter.after.title")}
                isInvalid={invalid}
                errorMessage={error?.message}
                onChange={(dateValue) => {
                  setValue("dateFrom", dateValue?.toString() ?? "");
                }}
              />
            )}
          />
          <Controller
            name="dateTo"
            control={control}
            render={({ fieldState: { invalid, error } }) => {
              return (
                <DatePicker
                  defaultValue={undefined}
                  label={t("filter.before.title")}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  onChange={(dateValue) => {
                    setValue("dateTo", dateValue?.toString() ?? "");
                  }}
                />
              );
            }}
          />
          <div>
            <Button
              type="submit"
              color="primary"
              isLoading={isSubmitting}
              className="col-span-2 md:col-span-5"
            >
              {t("filter.submit")}
            </Button>
          </div>
        </form>
        {/* CALENDAR  */}
        <FullCalendar
          plugins={[dayGridPlugin]}
          dayHeaderClassNames={() => {
            return "calendar-header-cell";
          }}
          headerToolbar={{
            start: "title",
            end: "prev,next",
          }}
          initialView="dayGridMonth"
          eventContent={SingleEvent}
          locale={locale}
          eventInteractive
          aspectRatio={1.9}
          eventBackgroundColor="transparent"
          eventBorderColor="transparent"
          events={events}
          datesSet={(dateInfo) => {
            console.log(dateInfo);
          }}
          dayCellClassNames={({ isOther }) => {
            if (isOther) {
              return "relative bg-gray-50 px-3 py-2 text-gray-500 opacity-100";
            }
            return "relative bg-white px-3 py-2";
          }}
        />
      </Container>
    </>
  );
};

export default MainCalendar;
