"use client";
import Link from "next/link";
import { Alert, Button, Input } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { redirect } from "next/navigation";

interface AuthSignupProps {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const AuthSignin: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState<"success" | "danger">("danger");

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm<AuthSignupProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: AuthSignupProps) => {
    if (data.password !== data.passwordConfirmation) {
      setError("passwordConfirmation", {
        type: "manual",
        message: t("auth.signup.passwordConfirmation.error"),
      });
      return;
    }

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

      // Make the API request
      const res = await fetch("/api/account/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, locale, recaptchaToken: token }),
      });

      const result = await res.json();

      if (result.success) {
        setShowAlert(true);
        setAlertType("success");
        setAlertTitle(t("auth.signup.success"));
        setAlertMessage(t("auth.signup.successDescription"));
        reset();
        window.setTimeout(() => {
          redirect("/auth/signin");
        }, 5000);
        return; // Stop further execution if successful
      }
      // Handle errors
      setAlertMessage((result?.messages ?? []).join(", "));
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during signup:", error);
      setAlertMessage(t("auth.signup.genericError"));
    }
    setAlertTitle(t("common.error"));
    setAlertType("danger");
    setShowAlert(true);
  };

  return (
    <div className="flex max-w-[calc(100%-32px)] mx-auto w-96 flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
      <p className="pb-2 text-xl font-medium">{t("auth.signup.title")}</p>
      {showAlert && (
        <Alert
          color={alertType}
          title={alertTitle}
          description={alertMessage}
          classNames={{
            title: "text-base font-medium",
          }}
        />
      )}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          rules={{ required: t("auth.signup.name.required") }}
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label={t("auth.signup.name.title")}
              name="name"
              placeholder={t("auth.signup.name.placeholder")}
              type="name"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="email"
          rules={{ required: t("auth.signup.email.required") }}
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label={t("auth.signup.email.title")}
              name="email"
              placeholder={t("auth.signup.email.placeholder")}
              type="email"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: t("auth.signup.password.required") }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label={t("auth.signup.password.title")}
              name="password"
              placeholder={t("auth.signup.password.placeholder")}
              type="password"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="passwordConfirmation"
          control={control}
          rules={{ required: t("auth.signup.passwordConfirmation.required") }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label={t("auth.signup.passwordConfirmation.title")}
              name="password"
              placeholder={t("auth.signup.password.placeholder")}
              type="password"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Button color="primary" type="submit" isLoading={isSubmitting}>
          {t("auth.signup.button")}
        </Button>
      </form>
      {/* <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="shrink-0 text-tiny text-default-500">{t("common.or")}</p>
        <Divider className="flex-1" />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          startContent={
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              tabIndex={-1}
            >
              <path
                fill="#EA4335 "
                d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
              ></path>
              <path
                fill="#34A853"
                d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
              ></path>
              <path
                fill="#4A90E2"
                d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
              ></path>
              <path
                fill="#FBBC05"
                d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
              ></path>
            </svg>
          }
          variant="bordered"
        >
          {t("auth.signup.google")}
        </Button>
      </div> */}
      <p className="text-center text-small">
        {t("auth.alreadyHaveAccount")}&nbsp;
        <Link href="/auth/signin" className="text-primary">
          {t("auth.signin.title")}
        </Link>
      </p>
    </div>
  );
};

export default AuthSignin;
