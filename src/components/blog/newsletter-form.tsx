"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface NLForm {
  email: string;
}
const NewsletterForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<NLForm>({
    defaultValues: {
      email: "",
    },
  });
  const t = useTranslations();
  const subscribe = async (data: NLForm) => {
    try {
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
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, recaptchaToken: token }),
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          toast.success(t("newsletter.success"));
          return;
        }
      }
    } catch {}
    toast.error(t("newsletter.error"));
  };
  return (
    <form onSubmit={handleSubmit(subscribe)}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            {...field}
            type="email"
            label={t("newsletter.email")}
            variant="flat"
            classNames={{
              inputWrapper: "bg-white",
              mainWrapper: "w-full bg-white",
            }}
            endContent={
              <Button
                isIconOnly
                type="submit"
                variant="solid"
                color="primary"
                isLoading={isSubmitting}
              >
                <PaperAirplaneIcon className="size-5" />
              </Button>
            }
          />
        )}
      />
    </form>
  );
};

export default NewsletterForm;
