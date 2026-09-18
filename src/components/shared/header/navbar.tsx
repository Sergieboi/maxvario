"use client";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC, useState } from "react";

type NavItem =
  | { type?: "link"; href: string; title: string }
  | { type: "dropdown"; title: string; children: { href: string; title: string }[] };

const ResourcesDropdown: FC<{ label: string; children: { href: string; title: string }[] }> = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="p-3 transition-all rounded-md text-white flex items-center gap-1">
        {label}
        <ChevronDownIcon className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-1 min-w-[180px] z-50">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

const Navbar: FC = () => {
  const t = useTranslations("header");
  const session = useSession();

  const items: NavItem[] = [
    { href: "/races", title: t("nav.races") },
    { href: "/calendar", title: t("nav.calendar") },
    { href: `/pages/${t("nav.aboutSlug")}`, title: t("nav.about") },
    { href: "/news", title: t("nav.news") },
    { href: "/blog", title: t("nav.blog") },
    { href: "/gear", title: t("nav.gear") },
    {
      type: "dropdown",
      title: t("nav.resources"),
      children: [
        { href: "/resources", title: t("nav.studyMaterials") },
        { href: "/resources/mission-planner", title: t("nav.adventurePlanning") },
      ],
    },
    {
      href: session.status === "authenticated" ? "/account" : "/auth/signin",
      title: session.status === "authenticated" ? t("nav.account") : t("nav.signin"),
    },
  ];

  const flatItems = items.flatMap((item) =>
    item.type === "dropdown"
      ? item.children
      : [{ href: item.href, title: item.title }]
  );

  return (
    <nav>
      <ul className="hidden lg:flex space-x-4">
        {items.map((item, index) =>
          item.type === "dropdown" ? (
            <ResourcesDropdown key={index} label={item.title} children={item.children} />
          ) : (
            <li key={index} className="relative">
              <Link
                href={item.href}
                title={item.title}
                className="p-3 transition-all rounded-md text-white"
              >
                {item.title}
              </Link>
            </li>
          )
        )}
      </ul>
      <div className="lg:hidden">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light" className="text-white">
              <Bars3Icon className="size-5" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {flatItems.map((item, index) => (
              <DropdownItem
                key={index}
                onPress={() => {
                  redirect(item.href);
                }}
              >
                {item.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
