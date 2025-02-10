"use client";
import { ProfileFields } from "@/lib/types/misc";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  user: ProfileFields;
};

const AccountProfile: FC<Props> = ({ user }) => {
  const t = useTranslations();
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<ProfileFields>({
    defaultValues: {
      name: user?.name,
      password: "",
      passwordConfirmation: "",
      youtube: user?.youtube,
      instagram: user?.instagram,
      url: user?.url,
    },
  });
  const onSubmit = async (data: ProfileFields) => {
    const { password, passwordConfirmation } = data;
    if (password !== passwordConfirmation) {
      setError("passwordConfirmation", {
        type: "manual",
        message: t("account.profile.passwordsDoNotMatch"),
      });
      return;
    }
    const res = await fetch("/api/account/profile", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const result = await res.json();
      if (Array.isArray(result.messages) && result.messages.length) {
        toast.error(result.messages[0]);
      } else {
        toast.success(t("account.profile.success"));
      }
    }
  };
  return (
    <>
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold mb-1">
            {t("account.profile.title")}
          </h1>
          <p className=" mb-4">{t("account.profile.description")}</p>

          <form
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { error, invalid } }) => (
                <Input
                  {...field}
                  isRequired
                  label={t("account.profile.name")}
                  errorMessage={error?.message}
                  isInvalid={invalid}
                />
              )}
            />
            <Controller
              name="url"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <Input
                  {...field}
                  label={t("account.profile.website")}
                  errorMessage={error?.message}
                  isInvalid={invalid}
                />
              )}
            />
            <Controller
              name="youtube"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <Input
                  {...field}
                  label={t("account.profile.youtube")}
                  errorMessage={error?.message}
                  isInvalid={invalid}
                />
              )}
            />
            <Controller
              name="instagram"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <Input
                  {...field}
                  label={t("account.profile.instagram")}
                  errorMessage={error?.message}
                  isInvalid={invalid}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <Input
                  {...field}
                  label={t("account.profile.password")}
                  errorMessage={error?.message}
                  isInvalid={invalid}
                  type="password"
                />
              )}
            />
            <Controller
              name="passwordConfirmation"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <Input
                  {...field}
                  label={t("account.profile.passwordConfirmation")}
                  errorMessage={error?.message}
                  isInvalid={invalid}
                  type="password"
                />
              )}
            />
            <div>
              <Button type="submit" color="primary" isLoading={isSubmitting}>
                {t("common.submit")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default AccountProfile;
