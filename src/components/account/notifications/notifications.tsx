"use client";
import { FC } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { UserSubscription } from "@/lib/types/misc";
import { useTranslations } from "next-intl";
import Subscription from "./subscription";

type Props = {
  subscriptions: Array<UserSubscription>;
};

const Notifications: FC<Props> = ({ subscriptions }) => {
  const t = useTranslations();
  return (
    <>
      <Card>
        <CardBody>
          <h1 className="text-2xl font-semibold mb-1">
            {t("account.notifications.title")}
          </h1>
          <p className=" mb-4">{t("account.notifications.description")}</p>
          {subscriptions?.map((sub, index) => (
            <Subscription key={index} subscription={sub} />
          ))}
        </CardBody>
      </Card>
    </>
  );
};

export default Notifications;
