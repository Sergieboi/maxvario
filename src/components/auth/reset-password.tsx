"use client";
import Link from "next/link";
import { Alert, Button, Input } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

interface AuthResetPasswordProps {
  password: string;
  passwordConfirmation: string;
}

const AuthResetPassword: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState<"success" | "danger">("danger");
  const sp = useSearchParams();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<AuthResetPasswordProps>({
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: AuthResetPasswordProps) => {
    try {
      // Execute reCAPTCHA and get the token
      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA as string, {
              action: "forgot_password_form",
            })
            .then(resolve)
            .catch(reject);
        });
      });
      const res = await fetch("/api/account/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          lang: locale,
          recaptchaToken: token,
          hash: sp.get("hash"),
        }),
      });

      const result = await res.json();

      if (result.success) {
        setShowAlert(true);
        setAlertType("success");
        setAlertTitle(t("auth.resetPassword.success"));
        setAlertMessage(t("auth.resetPassword.successDescription"));
        reset();
        return; // Stop further execution if successful
      }
      // Handle errors
      setAlertMessage((result?.messages ?? []).join(", "));
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during signup:", error);
      setAlertMessage(t("auth.resetPassword.genericError"));
    }
    setAlertTitle(t("common.error"));
    setAlertType("danger");
    setShowAlert(true);
  };

  return (
    <div className="flex max-w-[calc(100%-32px)] mx-auto w-96 flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
      <p className="pb-2 text-xl font-medium">
        {t("auth.resetPassword.title")}
      </p>
      {showAlert && (
        <Alert
          color={alertType}
          title={alertTitle}
          description={alertMessage}
        />
      )}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="password"
          rules={{ required: t("auth.resetPassword.password.required") }}
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label={t("auth.resetPassword.password.title")}
              name="password"
              placeholder={t("auth.resetPassword.password.placeholder")}
              type="password"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="passwordConfirmation"
          rules={{ required: t("auth.resetPassword.confirmPassword.required") }}
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label={t("auth.resetPassword.confirmPassword.title")}
              name="passwordConfirmation"
              placeholder={t("auth.resetPassword.confirmPassword.placeholder")}
              type="password"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Button color="primary" type="submit" isLoading={isSubmitting}>
          {t("auth.resetPassword.button")}
        </Button>
      </form>
      <p className="text-center text-small">
        <Link href="/auth/signin" className="text-primary">
          {t("auth.forgotPassword.backToSignin")}
        </Link>
      </p>
    </div>
  );
};

export default AuthResetPassword;
