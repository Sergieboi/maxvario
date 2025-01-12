"use client";
import Link from "next/link";
import { Alert, Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { signIn, SignInOptions } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface AuthForgotPasswordProps {
  email: string;
  password: string;
}

const AuthForgotPassword: FC = () => {
  const [showError, setShowError] = useState(false);
  const t = useTranslations();
  const sp = useSearchParams();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AuthForgotPasswordProps>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: AuthForgotPasswordProps) => {
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
      <p className="pb-2 text-xl font-medium">
        {t("auth.forgotPassword.title")}
      </p>
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
        <Button color="primary" type="submit" isLoading={isSubmitting}>
          {t("auth.forgotPassword.button")}
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

export default AuthForgotPassword;
