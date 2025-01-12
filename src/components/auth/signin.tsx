"use client";
import Link from "next/link";
import { Alert, Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { signIn, SignInOptions } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface AuthSigninProps {
  email: string;
  password: string;
}

const AuthSignin: FC = () => {
  const [showError, setShowError] = useState(false);
  const t = useTranslations();
  const sp = useSearchParams();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AuthSigninProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthSigninProps) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      } as SignInOptions);
      if (res?.error) {
        setShowError(true);
      } else {
        const target = sp.get("redirect") || "/account";
        window.location.href = target as string;
      }
    } catch {
      setShowError(true);
    }
  };

  return (
    <div className="flex max-w-[calc(100%-32px)] mx-auto w-96 flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
      <p className="pb-2 text-xl font-medium">{t("auth.signin.title")}</p>
      {showError && (
        <Alert
          color="danger"
          title={t("common.error")}
          description={t("auth.signin.error.invalidcredentials")}
        />
      )}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          rules={{ required: t("auth.signin.email.required") }}
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label={t("auth.signin.email.title")}
              name="email"
              placeholder={t("auth.signin.email.placeholder")}
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
          rules={{ required: t("auth.signin.password.required") }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label={t("auth.signin.password.title")}
              name="password"
              placeholder={t("auth.signin.password.placeholder")}
              type="password"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <div className="flex w-full items-center justify-end px-1 py-2">
          <Link className="text-default-500" href="/auth/forgot-password">
            {t("auth.signin.forgot")}?
          </Link>
        </div>
        <Button color="primary" type="submit" isLoading={isSubmitting}>
          {t("auth.signin.button")}
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
          {t("auth.signin.google")}
        </Button>
      </div> */}
      <p className="text-center text-small">
        {t("auth.noAccount")}&nbsp;
        <Link href="/auth/signup" className="text-primary">
          {t("auth.signup.title")}
        </Link>
      </p>
    </div>
  );
};

export default AuthSignin;
