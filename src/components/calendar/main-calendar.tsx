"use client";
import { FC, useEffect, useRef, useState } from "react";
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
  ButtonGroup,
  Chip,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FLAGS } from "@/lib/flags";

import { parseDate } from "@internationalized/date";

interface FilterOptions {
  dateFrom: string;
  dateTo: string;
  country: string;
  title: string;
  athleteCategory: string;
  faiCategory: string;
  raceFormat: string;
}

const MainCalendar: FC<CalendarResponse> = ({ calendar, filter_options }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const t = useTranslations("calendar");
  const locale = useLocale();
  const [currentMonth, setCurrentMonth] = useState<string>();
  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev(); // Navigate to the previous month
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next(); // Navigate to the next month
  };

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
      dateFrom: new Date().toISOString(),
      dateTo: "",
      country: "",
      title: "",
      athleteCategory: "",
      faiCategory: "",
      raceFormat: "",
    },
  });

  const onSubmit = async (data: FilterOptions) => {
    const req = await fetch("/api/calendar/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await req.json();
    if (req.status === 200) {
      const mappedEvents: CalendarEvent[] = (
        response?.data as CalendarResponse
      ).calendar.map((event) => {
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
      <Container className="pb-20">
        {/* FILTER */}
        <div className="flex items-center justify-between  mt-8">
          <h2 className="font-bold text-2xl">{t("filter.title")}</h2>
          <Chip
            color={events.length > 0 ? "primary" : "warning"}
            className="text-sm text-white italic"
          >
            {t("resultsfound", { count: events.length })}
          </Chip>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-4 grid grid-cols-2 grid-rows-2 md:grid-cols-5 gap-4"
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
                selectionMode="multiple"
                label={t("filter.country.title")}
                isInvalid={invalid}
                errorMessage={error?.message}
              >
                {FLAGS.map((flag) => {
                  return (
                    <SelectItem
                      key={flag.code}
                      startContent={
                        flag.code ? (
                          <Avatar
                            alt="Argentina"
                            className="w-6 h-6"
                            src={`/assets/flags/${flag.code}.svg`}
                          />
                        ) : null
                      }
                    >
                      {flag.name}
                    </SelectItem>
                  );
                })}
              </Select>
            )}
          />

          <Controller
            name="dateFrom"
            control={control}
            render={({ fieldState: { invalid, error } }) => (
              <DatePicker
                label={t("filter.after.title")}
                lang={locale}
                isInvalid={invalid}
                errorMessage={error?.message}
                defaultValue={parseDate(new Date().toISOString().split("T")[0])}
                onChange={(dateValue) => {
                  setValue("dateFrom", dateValue?.toString() ?? "");
                }}
              />
            )}
          />
          <Controller
            name="dateTo"
            control={control}
            render={() => (
              <DatePicker
                defaultValue={undefined}
                label={t("filter.before.title")}
                onChange={(dateValue) => {
                  setValue("dateTo", dateValue?.toString() ?? "");
                }}
              />
            )}
          />

          <div>
            <Controller
              control={control}
              name="faiCategory"
              render={({ field }) => (
                <Select
                  {...field}
                  selectionMode="multiple"
                  label={t("filter.faiCategory.title")}
                >
                  {(filter_options.fai_categories ?? []).map((category) => {
                    return (
                      <SelectItem key={category.term_id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </Select>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="athleteCategory"
              render={({ field }) => (
                <Select
                  {...field}
                  selectionMode="multiple"
                  label={t("filter.athleteCategory.title")}
                >
                  {(filter_options.athlete_categories ?? []).map((category) => {
                    return (
                      <SelectItem key={category.term_id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </Select>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="raceFormat"
              render={({ field }) => (
                <Select
                  {...field}
                  selectionMode="multiple"
                  label={t("filter.raceFormat.title")}
                >
                  {(filter_options.race_formats ?? []).map((category) => {
                    return (
                      <SelectItem key={category.term_id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </Select>
              )}
            />
          </div>
          <div className="col-span-2 md:col-span-5">
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
        <div className="flex items-center justify-between border-b border-l border-t rounded-t-lg border-r border-gray-200 px-6 py-4 lg:flex-none bg-gray-50">
          <h1 className="font-bold">{currentMonth}</h1>
          <ButtonGroup>
            <Button isIconOnly color="primary" onPress={handlePrev}>
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
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            </Button>
            <Button isIconOnly color="primary" onPress={handleNext}>
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
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </ButtonGroup>
        </div>
        <FullCalendar
          ref={calendarRef}
          height="auto"
          plugins={[dayGridPlugin]}
          dayHeaderClassNames={() => {
            return "calendar-header-cell";
          }}
          headerToolbar={false}
          initialView="dayGridMonth"
          eventContent={SingleEvent}
          locale={locale}
          eventInteractive
          eventBackgroundColor="transparent"
          eventBorderColor="transparent"
          events={events}
          datesSet={(dateInfo) => {
            const activeDate = new Date(dateInfo.view.currentStart); // The first date of the active view (aligned to the displayed month)

            const loc = dateInfo.view.calendar.getOption("locale"); // Get FullCalendar's active locale
            const monthName = activeDate.toLocaleString(loc?.toString(), {
              month: "long",
            });
            const year = activeDate.getFullYear();
            setCurrentMonth(
              `${
                monthName.charAt(0).toUpperCase() + monthName.slice(1)
              }. ${year}`
            );
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
