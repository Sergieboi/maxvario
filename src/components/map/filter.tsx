"use client";
import { FLAGS } from "@/lib/flags";
import { FilterOptions, MVRace } from "@/lib/types/misc";
import {
  Avatar,
  Button,
  DatePicker,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  visible: boolean;
  hide: () => void;
  filter_options: FilterOptions;
  update: (data: MVRace[]) => void;
};

interface FilterFields {
  dateFrom: string;
  dateTo: string;
  country: string;
  title: string;
  athleteCategory: string;
  faiCategory: string;
  raceFormat: string;
}

const MapFilter: FC<Props> = ({ hide, filter_options, update, visible }) => {
  const locale = useLocale();
  const t = useTranslations();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (visible) {
      onOpen();
    } else {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FilterFields>({
    defaultValues: {
      dateFrom: "", // new Date().toISOString(),
      dateTo: "",
      country: "",
      title: "",
      athleteCategory: "",
      faiCategory: "",
      raceFormat: "",
    },
  });

  const onSubmit = async (data: FilterFields) => {
    const req = await fetch("/api/calendar/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (req.status !== 200) {
      return;
    }
    const res = await req.json();
    update(res?.data?.calendar);
    onClose();
    window.setTimeout(hide, 500);
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        onClose={() => {
          window.setTimeout(hide, 500);
        }}
        classNames={{
          base: "data-[placement=right]:m-2 data-[placement=left]:m-2 rounded-medium w-[calc(100%-16px)]",
        }}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader>{t("map.filter.title")}</DrawerHeader>
              <DrawerBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="my-4 grid grid-cols-1 gap-4"
                >
                  <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <Input
                        {...field}
                        label={t("calendar.filter.name.title")}
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
                        label={t("calendar.filter.country.title")}
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
                        label={t("calendar.filter.after.title")}
                        lang={locale}
                        isInvalid={invalid}
                        errorMessage={error?.message}
                        onChange={(dateValue) => {
                          setValue("dateFrom", dateValue ?? "");
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
                        label={t("calendar.filter.before.title")}
                        onChange={(dateValue) => {
                          setValue("dateTo", dateValue ?? "");
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
                          label={t("calendar.filter.faiCategory.title")}
                        >
                          {(filter_options.fai_categories ?? []).map(
                            (category) => {
                              return (
                                <SelectItem key={category.term_id}>
                                  {category.name}
                                </SelectItem>
                              );
                            }
                          )}
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
                          label={t("calendar.filter.athleteCategory.title")}
                        >
                          {(filter_options.athlete_categories ?? []).map(
                            (category) => {
                              return (
                                <SelectItem key={category.term_id}>
                                  {category.name}
                                </SelectItem>
                              );
                            }
                          )}
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
                          label={t("calendar.filter.raceFormat.title")}
                        >
                          {(filter_options.race_formats ?? []).map(
                            (category) => {
                              return (
                                <SelectItem key={category.term_id}>
                                  {category.name}
                                </SelectItem>
                              );
                            }
                          )}
                        </Select>
                      )}
                    />
                  </div>
                </form>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  onPress={() => {
                    onClose();
                    window.setTimeout(hide, 500);
                  }}
                  color="danger"
                  fullWidth
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  type="button"
                  onPress={() => handleSubmit(onSubmit)()}
                  color="primary"
                  fullWidth
                  isLoading={isSubmitting}
                  className="col-span-2 md:col-span-5"
                >
                  {t("calendar.filter.submit")}
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MapFilter;
