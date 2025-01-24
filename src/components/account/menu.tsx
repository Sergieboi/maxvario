"use client";
import Link from "next/link";
import { FC } from "react";
import Container from "../shared/container";
import { useTranslations } from "next-intl";
import { Button, cn, Tooltip } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const AccountMenu: FC = () => {
  const t = useTranslations();
  const path = usePathname();
  const session = useSession();
  return (
    <div className="bg-primary text-white py-4 flex items-center">
      <Container className="flex justify-between items-center">
        <ul className="flex text-sm font-medium items-center">
          <li>
            <Link
              href="/account"
              title={t("account.menu.profile")}
              className={cn(
                "py-2 px-3 rounded-lg",
                path.endsWith("account") && "bg-white text-primary border-0"
              )}
            >
              {t("account.menu.profile")}
            </Link>
          </li>
          {session.data?.user.user?.roles?.includes("contributor") && (
            <li>
              <Link
                href="/account/my-content"
                title={t("account.menu.posts")}
                className={cn(
                  "py-2 px-3 rounded-lg flex items-center gap-1",
                  path.endsWith("my-content") &&
                    "bg-white text-primary border-0"
                )}
              >
                {t("account.menu.posts")}
                <Tooltip content={t("account.menu.postsTooltip")}>
                  <InformationCircleIcon className="size-4" />
                </Tooltip>
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/account/notifications"
              title={t("account.menu.notifications")}
              className={cn(
                "py-2 px-3 rounded-lg",
                path.endsWith("notifications") &&
                  "bg-white text-primary border-0"
              )}
            >
              {t("account.menu.notifications")}
            </Link>
          </li>
        </ul>
        <Button
          variant="faded"
          color="danger"
          className="border-0"
          size="sm"
          onPress={() => signOut()}
        >
          {t("account.menu.signout")}
        </Button>
      </Container>
    </div>
  );
};

export default AccountMenu;
