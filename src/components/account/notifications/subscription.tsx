"use client";
import MVToast, { ToastProps } from "@/components/shared/toast";
import { UserSubscription } from "@/lib/types/misc";
import { Switch } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";

type Props = {
  subscription: UserSubscription;
};

const Subscription: FC<Props> = ({ subscription }) => {
  const t = useTranslations();
  const [isSelected, setIsSelected] = useState<boolean>(
    subscription.deleted_at === null
  );
  const [toast, setToast] = useState<ToastProps & { show: boolean }>({
    message: "",
    modelType: "success",
    show: false,
  });

  const updateSubscription = async (newStatus: string) => {
    const res = await fetch("/api/account/subscription", {
      method: "POST",
      body: JSON.stringify({
        subscriptionId: subscription.subscription_id,
        action: newStatus,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const result = await res.json();
      if (Array.isArray(result.messages) && result.messages.length) {
        setToast({
          show: true,
          message: result.messages[0],
          modelType: "error",
        });
      } else {
        setToast({
          show: true,
          message: t("account.notifications.updateSuccess"),
          modelType: "success",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-between ">
      <div>
        <p className="text-lg font-semibold">{subscription.post_title}</p>
        <p className="text-sm text-gray-500">
          {new Intl.DateTimeFormat("en-US", {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Ensures the date/time is adjusted to the user's timezone
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(new Date(`${subscription.created_at}Z`))}
        </p>
      </div>
      <Switch
        isSelected={isSelected}
        onValueChange={(isSelected) => {
          setIsSelected(isSelected);
          updateSubscription(isSelected ? "on" : "off");
        }}
        className="text-sm"
      />
      {toast.show && (
        <MVToast
          message={toast.message}
          modelType={toast.modelType}
          hide={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default Subscription;
