"use client";
import { languages } from "@/lib/constants";
import { UserIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { FC } from "react";

const HeaderActions: FC = () => {
  const locale = useLocale();

  return (
    <div className="flex items-center gap-4">
      <Button size="sm" as={Link} href="/account" variant="flat" isIconOnly>
        <UserIcon width={20} height={20} className="text-white" />
      </Button>
      <Dropdown>
        <DropdownTrigger>
          <Button
            size="sm"
            variant="flat"
            className="text-white uppercase"
            isIconOnly
          >
            {locale}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {Object.keys(languages).map((lang) => (
            <DropdownItem
              classNames={{
                title: "flex items-center gap-2 capitalize",
              }}
              key={lang}
              href={`/${lang}`}
            >
              <Avatar
                size="sm"
                src={`/assets/flags/${
                  languages[lang as keyof typeof languages].flag
                }.svg`}
              />
              <span>{languages[lang as keyof typeof languages].label}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default HeaderActions;
