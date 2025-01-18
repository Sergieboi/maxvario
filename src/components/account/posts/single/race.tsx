/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import ImagesPicker from "@/components/shared/images-picker";
import LocationPicker from "@/components/shared/location-picker";
import { MAPS_KEY } from "@/lib/constants";
import { MVRace, Taxonomy } from "@/lib/types/misc";
import {
  Avatar,
  Button,
  DateRangePicker,
  Input,
  type RangeValue,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { APIProvider } from "@vis.gl/react-google-maps";
import { useLocale, useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import CurrentTimezone from "./current-timezone";
import MVEditor from "@/components/shared/blocks/editor";
import { extractBlockInnerHTML } from "@/lib/utils";
import { parseZonedDateTime, ZonedDateTime } from "@internationalized/date";

const getDateTime = (date: ZonedDateTime) => {
  // eslint-disable-next-line prefer-const
  let { year, month, day, hour, minute } = date;
  if (month < 10) {
    month = `0${month}` as unknown as number;
  }
  if (day < 10) {
    day = `0${day}` as unknown as number;
  }
  if (hour < 10) {
    hour = `0${hour}` as unknown as number;
  }
  if (minute < 10) {
    minute = `0${minute}` as unknown as number;
  }
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

interface SingleRaceProps {
  title: string;
  content: string;
  athlete_category: string;
  fai_category: string;
  race_format: string;
  thumbnail: File;
  backgroundImage: File;
  country: string;
  countryShort: string;
  state: string;
  city: string;
  post_code?: string;
  name?: string;
  lat: number;
  lng: number;
  address: string;
  placeId: string;
  duration: string;
  facebook: string;
  instagram: string;
  website: string;
  tiktok: string;
  youtube: string;
  x: string;
  trackingUrl: string;
  resultsUrl: string;
  raceDateRange: RangeValue<ZonedDateTime> | null;
  raceRegistrationDateRange: RangeValue<ZonedDateTime> | null;
}

interface SingleRaceParams {
  init?: MVRace;
  fai_categories: Array<Taxonomy>;
  athlete_categories: Array<Taxonomy>;
  race_formats: Array<Taxonomy>;
}

const SingleRace: FC<SingleRaceParams> = ({
  init,
  athlete_categories,
  fai_categories,
  race_formats,
}) => {
  const [postContent, setPostContent] = useState(
    extractBlockInnerHTML(init?.content ?? []) || ""
  );

  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    if (window.innerWidth > 768) {
      setIsMobile(false);
    }
  }, []);

  const defaultRaceDateRange =
    init?.start_date && init?.end_date
      ? {
          start: parseZonedDateTime(
            init.start_date.replace(" ", "T") + `[UTC]`
          ),
          end: parseZonedDateTime(init.end_date.replace(" ", "T") + `[UTC]`),
        }
      : undefined;
  const defaultRaceRegistrationDateRange =
    init?.registration_date && init?.registration_end_date
      ? {
          start: parseZonedDateTime(
            init.registration_date.replace(" ", "T") + `[UTC]`
          ),
          end: parseZonedDateTime(
            init.registration_end_date.replace(" ", "T") + `[UTC]`
          ),
        }
      : undefined;

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
    formState: { isSubmitting, errors: formErrors },
  } = useForm<SingleRaceProps>({
    reValidateMode: "onBlur",
    defaultValues: {
      title: init?.title || "",
      content: "",
      backgroundImage: undefined,
      thumbnail: undefined,
      tiktok: init?.tiktok || "",
      youtube: init?.youtube || "",
      facebook: init?.facebook || "",
      x: init?.x || "",
      instagram: init?.instagram || "",
      website: init?.website || "",
      trackingUrl: init?.tracking_url || "",
      resultsUrl: init?.results_url || "",
      lat: init?.location_data.lat || 0,
      lng: init?.location_data.lng || 0,
      placeId: init?.location_data?.place_id || "",
      country: init?.location_data.country || "",
      countryShort: init?.location_data.country_short || "",
      city: init?.location_data.city || "",
      state: init?.location_data.state || "",
      address: init?.location_data.address || "",
      duration: init?.duration ? (init?.duration as unknown as string) : "",
      athlete_category: init?.athlete_category?.[0]?.term_id?.toString() || "",
      fai_category: init?.fai_category?.[0]?.term_id?.toString() || "",
      race_format: init?.race_format?.[0]?.term_id
        ? init.race_format.map((c) => c.term_id.toString()).join(",")
        : "",
      post_code: init?.location_data?.post_code || "",
      name: init?.location_data?.name || "",
      raceDateRange: defaultRaceDateRange,
      raceRegistrationDateRange: defaultRaceRegistrationDateRange,
    },
  });
  const locale = useLocale();
  const t = useTranslations();
  const onSubmit = async (data: SingleRaceProps) => {
    try {
      // Execute reCAPTCHA and get the token
      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA as string, {
              action: "registration_form",
            })
            .then(resolve)
            .catch(reject);
        });
      });

      const formData = new FormData();

      // timeline data
      formData.append("duration", data.duration);
      if (data.backgroundImage) {
        formData.append("backgroundImage", data.backgroundImage);
      }
      if (data.raceDateRange?.start && data.raceDateRange) {
        formData.append("start_date", getDateTime(data.raceDateRange.start));
      }
      if (data.raceDateRange?.end && data.raceDateRange) {
        formData.append("end_date", getDateTime(data.raceDateRange.end));
      }
      if (
        data.raceRegistrationDateRange?.start &&
        data.raceRegistrationDateRange
      ) {
        formData.append(
          "registration_date",
          getDateTime(data.raceRegistrationDateRange.start)
        );
      }
      if (
        data.raceRegistrationDateRange?.end &&
        data.raceRegistrationDateRange
      ) {
        formData.append(
          "registration_end_date",
          getDateTime(data.raceRegistrationDateRange.end)
        );
      }
      // base data
      formData.append("title", data.title);
      formData.append("content", postContent);
      formData.append("fai_category", data.fai_category);
      formData.append("athlete_category", data.athlete_category);
      formData.append("race_format", data.race_format);
      // location data
      formData.append("lat", data.lat.toString());
      formData.append("lng", data.lng.toString());
      formData.append("address", data.address);
      formData.append("country", data.country);
      formData.append("countryShort", data.countryShort);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("placeId", data.placeId);
      // links
      formData.append("facebook", data.facebook);
      formData.append("instagram", data.instagram);
      formData.append("website", data.website);
      formData.append("x", data.x);
      formData.append("youtube", data.youtube);
      formData.append("tiktok", data.tiktok);
      formData.append("trackingUrl", data.trackingUrl);
      formData.append("resultsUrl", data.resultsUrl);
      if (data?.post_code) {
        formData.append("post_code", data.post_code);
      }
      if (data?.name) {
        formData.append("name", data.name);
      }

      // media
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }
      formData.append("lang", locale);
      formData.append("recaptchaToken", token);

      if (init?.id) {
        formData.append("id", `${init.id}`);
      }

      const res = await fetch("/api/account/content/race", {
        method: init ? "PUT" : "POST",
        body: formData,
      });

      if (res.ok) {
        window.location.href = "/account";
      }
      const result = await res.json();
      if (Array.isArray(result.messages)) {
        window.alert(result.messages[0]);
      }
    } catch {
      window.alert(t("common.genericError"));
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl font-semibold">
        {init?.id ? t("add.edit.race.title") : t("add.new.race.title")}
      </h1>
      <div className="flex gap-4 items-center flex-col md:flex-row">
        <Controller
          name="title"
          control={control}
          rules={{ required: t("account.new.title.required") }}
          render={({ field, fieldState: { invalid, error } }) => {
            return (
              <Input
                {...field}
                onBlur={() => {
                  trigger("title");
                  field.onBlur();
                }}
                isInvalid={invalid}
                errorMessage={error?.message}
                isRequired
                type="text"
                label={t("account.new.title.label")}
              />
            );
          }}
        />
        <Controller
          name="athlete_category"
          control={control}
          rules={{ required: t("account.new.athleteCategory.required") }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              {...field}
              label={t("account.new.athleteCategory.label")}
              isRequired
              // onBlur={() => {
              //   trigger("athlete_category");
              //   field.onBlur();
              // }}
              isInvalid={invalid}
              errorMessage={error?.message}
              defaultSelectedKeys={
                init?.athlete_category?.[0].term_id
                  ? new Set([init?.athlete_category?.[0].term_id.toString()])
                  : []
              }
            >
              {athlete_categories.map((category) => (
                <SelectItem key={category.term_id}>{category.name}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="fai_category"
          control={control}
          rules={{ required: t("account.new.faiCategory.required") }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              {...field}
              label={t("account.new.faiCategory.label")}
              isRequired
              // onBlur={() => {
              //   trigger("fai_category");
              //   field.onBlur();
              // }}
              isInvalid={invalid}
              errorMessage={error?.message}
              defaultSelectedKeys={
                init?.fai_category?.[0].term_id
                  ? new Set([init?.fai_category?.[0].term_id.toString()])
                  : []
              }
            >
              {fai_categories.map((category) => (
                <SelectItem key={category.term_id}>{category.name}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="race_format"
          control={control}
          rules={{ required: t("account.new.raceFormat.required") }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              {...field}
              // onBlur={() => {
              //   trigger("race_format");
              //   field.onBlur();
              // }}
              label={t("account.new.raceFormat.label")}
              isRequired
              isInvalid={invalid}
              selectionMode="multiple"
              errorMessage={error?.message}
              defaultSelectedKeys={
                init?.race_format?.[0].term_id
                  ? new Set(
                      init.race_format.map((cat) => cat.term_id.toString())
                    )
                  : []
              }
            >
              {race_formats.map((category) => (
                <SelectItem key={category.term_id}>{category.name}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg relative">
        <MVEditor
          content={postContent}
          onUpdate={(content) => setPostContent(content)}
          editable={true}
        />
      </div>
      <h3 className="text-xl font-semibold">
        {t("account.new.race.timeline")}
      </h3>
      <p>
        {t.rich("account.new.race.timelineDescription", {
          timezone: () => (
            <span className="font-semibold">
              UTC
              <CurrentTimezone />
            </span>
          ),
        })}
      </p>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5">
        <Controller
          name="raceDateRange"
          control={control}
          rules={{ required: t("account.new.raceDateRange.required") }}
          render={({ field, fieldState: { invalid, error } }) => (
            <DateRangePicker
              fullWidth
              className="xl:col-span-2"
              shouldForceLeadingZeros
              isRequired
              onBlur={() => {
                trigger("raceDateRange");
                field.onBlur();
              }}
              granularity="minute"
              hideTimeZone={isMobile}
              label={t("account.new.raceDateRange.label")}
              defaultValue={defaultRaceDateRange}
              onChange={(value) => {
                if (value) {
                  setValue("raceDateRange", value);
                }
              }}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="raceRegistrationDateRange"
          control={control}
          render={({ fieldState: { invalid, error } }) => (
            <DateRangePicker
              fullWidth
              className="xl:col-span-2"
              shouldForceLeadingZeros
              granularity="minute"
              hideTimeZone={isMobile}
              label={t("account.new.raceRegistrationDateRange.label")}
              defaultValue={
                init?.registration_date && init?.registration_end_date
                  ? {
                      start: parseZonedDateTime(
                        init.registration_date.replace(" ", "T") + `[UTC]`
                      ),
                      end: parseZonedDateTime(
                        init.registration_end_date.replace(" ", "T") + `[UTC]`
                      ),
                    }
                  : undefined
              }
              onChange={(value) => {
                setValue("raceRegistrationDateRange", value);
              }}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="duration"
          control={control}
          rules={{ required: t("account.new.duration.required") }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              fullWidth
              onBlur={() => {
                trigger("duration");
                field.onBlur();
              }}
              isRequired
              label={t("account.new.duration.label")}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
      </div>
      <h3 className="text-xl font-semibold">
        {t("account.new.race.location")}
      </h3>
      <p>{t("account.new.race.locationDescription")}</p>
      <div className="flex gap-4 items-start flex-col md:flex-row">
        <div className="w-full md:w-3/4">
          <APIProvider apiKey={MAPS_KEY}>
            <LocationPicker
              defaultLocation={
                init?.location_data?.lat && init?.location_data?.lng
                  ? {
                      coords: {
                        lat: parseFloat(
                          init.location_data.lat as unknown as string
                        ),
                        lng: parseFloat(
                          init.location_data.lng as unknown as string
                        ),
                      },
                      search: init.location_data.address,
                    }
                  : undefined
              }
              onLocationChange={(location) => {
                setValue("lat", location.lat);
                setValue("lng", location.lng);
                setValue("address", location.address ?? "");
                setValue("country", location.country ?? "");
                setValue("countryShort", location.country_code ?? "");
                setValue("city", location.city ?? "");
                setValue("state", location.state ?? "");
                setValue("placeId", location.place_id ?? "");
                setValue("post_code", location.post_code ?? "");
                setValue("name", location.name ?? "");
                trigger("lat");
                trigger("lng");
                trigger("address");
                trigger("country");
                trigger("placeId");
              }}
            />
          </APIProvider>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p>{t("common.extractedAddress")}</p>
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                isRequired
                size="sm"
                color="primary"
                label={t("account.new.address.label")}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
          <div className="flex gap-1">
            <Controller
              name="lat"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  value={field.value.toString()}
                  isRequired
                  disabled
                  size="sm"
                  label={t("account.new.lat.label")}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="lng"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  value={field.value.toString()}
                  isRequired
                  disabled
                  size="sm"
                  label={t("account.new.lng.label")}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>

          <Controller
            name="country"
            control={control}
            rules={{ required: t("account.new.country.required") }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                isRequired
                disabled
                size="sm"
                label={t("account.new.country.label")}
                isInvalid={invalid}
                errorMessage={error?.message}
                endContent={
                  getValues("countryShort") ? (
                    <Avatar
                      size="sm"
                      className="min-w-8"
                      src={`/assets/flags/${getValues(
                        "countryShort"
                      ).toLowerCase()}.svg`}
                    />
                  ) : (
                    ""
                  )
                }
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                color="primary"
                size="sm"
                label={t("account.new.state.label")}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                color="primary"
                size="sm"
                label={t("account.new.city.label")}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="placeId"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                size="sm"
                disabled
                label={t("account.new.placeId.label")}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
      </div>
      <h3 className="text-xl font-semibold">{t("account.new.race.media")}</h3>
      <div className="flex gap-4 items-start flex-col md:flex-row">
        <div className="flex-1">
          <ImagesPicker
            setSelectedImages={(images) => setValue("thumbnail", images)}
            selectedImages={getValues("thumbnail")}
            buttonText={t("common.logo")}
            defaultPreviews={init?.thumbnail ? [init?.thumbnail] : []}
          />
          {formErrors.thumbnail && (
            <span className="text-sm text-danger">
              {formErrors.thumbnail.message}
            </span>
          )}
        </div>
        <div className="flex-1">
          <ImagesPicker
            setSelectedImages={(images) => setValue("backgroundImage", images)}
            selectedImages={getValues("backgroundImage")}
            buttonText={t("common.backgroundImage")}
            defaultPreviews={
              init?.background_image ? [init?.background_image] : []
            }
          />
          {formErrors.backgroundImage && (
            <span className="text-sm text-danger">
              {formErrors.backgroundImage.message}
            </span>
          )}
        </div>
      </div>
      <h3 className="text-xl font-semibold">{t("account.new.race.links")}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Controller
          name="website"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              size="sm"
              startContent={
                <Icon icon="ic:sharp-link" width="16" height="16" />
              }
              label={t("account.new.website.label")}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="facebook"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              size="sm"
              startContent={
                <Icon icon="ri:facebook-fill" width="16" height="16" />
              }
              label={t("account.new.facebook.label")}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="instagram"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              size="sm"
              startContent={
                <Icon icon="mingcute:instagram-fill" width="16" height="16" />
              }
              label={t("account.new.instagram.label")}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="x"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              size="sm"
              label={t("account.new.x.label")}
              startContent={
                <Icon icon="ri:twitter-x-line" width="16" height="16" />
              }
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="youtube"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              size="sm"
              startContent={
                <Icon icon="iconoir:youtube-solid" width="16" height="16" />
              }
              label={t("account.new.youtube.label")}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="tiktok"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              size="sm"
              startContent={
                <Icon icon="line-md:tiktok" width="16" height="16" />
              }
              label={t("account.new.tiktok.label")}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />

        <Controller
          name="trackingUrl"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              size="sm"
              startContent={
                <Icon icon="fluent:live-24-regular" width="16" height="16" />
              }
              label={t("account.new.trackingUrl.label")}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="resultsUrl"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              size="sm"
              startContent={
                <Icon icon="carbon:result" width="16" height="16" />
              }
              label={t("account.new.resultsUrl.label")}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
      </div>
      <Button
        type="submit"
        variant="solid"
        color="primary"
        isLoading={isSubmitting}
      >
        {t("common.submit")}
      </Button>
    </form>
  );
};

export default SingleRace;
