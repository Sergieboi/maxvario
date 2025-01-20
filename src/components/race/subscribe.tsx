"use client";
import {
  ArrowRightCircleIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MVToast, { ToastProps } from "../shared/toast";
import { useSession } from "next-auth/react";

type Props = {
  raceId: number;
};

interface SubscribeInterface {
  email: string;
  raceId: number;
}

const RaceSubscription: FC<Props> = ({ raceId }) => {
  const session = useSession();
  const [toast, setToast] = useState<ToastProps & { show: boolean }>({
    message: "",
    modelType: "success",
    show: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting },
  } = useForm<SubscribeInterface>({
    reValidateMode: "onChange",
    defaultValues: {
      email: session?.data?.user?.user.email ?? "",
      raceId: raceId,
    },
  });

  const subscribe = async (data: SubscribeInterface) => {
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
      const res = await fetch("/api/account/race-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken: token,
        }),
      });
      const result = await res.json();
      setIsOpen(false);

      if (result.success) {
        setToast({
          message: t("subscription.success"),
          modelType: "success",
          show: true,
        });
      } else {
        setToast({
          message: result.messages.join(", "),
          modelType: "error",
          show: true,
        });
      }
    } catch {
      setToast({
        message: t("subscription.error"),
        modelType: "error",
        show: true,
      });
    }
  };
  return (
    <>
      <Popover
        onOpenChange={(open) => {
          setIsOpen(open);
          window.setTimeout(() => setFocus("email"), 300);
        }}
        isOpen={isOpen}
        backdrop="opaque"
        classNames={{
          content:
            "min-w-80  p-0 outline-0 border-0 bg-transparent overflow-hidden",
        }}
      >
        <PopoverTrigger>
          <Button
            color="primary"
            type="button"
            fullWidth
            className="mb-6"
            onPress={() => {
              setFocus("email");
            }}
          >
            {t("subscribe.getNotified")}
            <BellAlertIcon className="w-6 h-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 outline-0 border-0 bg-transparent overflow-hidden">
          <form
            className="flex items-center"
            onSubmit={handleSubmit(subscribe)}
          >
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              }}
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  label={t("common.email")}
                  placeholder={t("subscribe.email")}
                  className="min-w-80"
                  disabled={isSubmitting}
                  endContent={
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      color="primary"
                      isIconOnly
                    >
                      <ArrowRightCircleIcon className="size-6" />
                    </Button>
                  }
                />
              )}
            />
          </form>
        </PopoverContent>
      </Popover>
      {toast.show && (
        <MVToast
          message={toast.message}
          modelType={toast.modelType}
          hide={() => setToast({ ...toast, show: false })}
        />
      )}
    </>
  );
};

export default RaceSubscription;
