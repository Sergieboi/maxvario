"use client";
import { languages } from "@/lib/constants";
import { SearchResult } from "@/lib/types/misc";
import {
  ArrowRightCircleIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SearchResults from "./search-results";

interface SiteSearch {
  query: string;
  multilingual: boolean;
}

const HeaderActions: FC = () => {
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);
  const locale = useLocale();
  const t = useTranslations();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitted },
  } = useForm<SiteSearch>();

  const doSearch = async (data: SiteSearch) => {
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
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...{
            search: data.query,
            lang: data.multilingual ? "" : locale,
          },
          recaptchaToken: token,
        }),
      });
      if (res.ok) {
        const result = await res.json();
        setSearchResults(result?.data ?? []);
      } else {
        setSearchResults([]);
      }
    } catch {}
  };
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Button size="sm" variant="flat" isIconOnly onPress={onOpen}>
        <MagnifyingGlassIcon width={20} height={20} className="text-white" />
      </Button>
      <Button
        size="sm"
        as={Link}
        href="/account"
        className="flex lg:hidden"
        variant="flat"
        isIconOnly
      >
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
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="left"
        classNames={{
          base: "data-[placement=right]:m-2 data-[placement=left]:m-2  rounded-medium",
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {t("common.fullSearch.title")}
              </DrawerHeader>
              <DrawerBody>
                <form onSubmit={handleSubmit(doSearch)} className="space-y-3">
                  <Controller
                    name="multilingual"
                    control={control}
                    render={({ field }) => (
                      <Switch {...field} value={`${field.value}`} size="sm">
                        {t("common.fullSearch.multilingual")}
                      </Switch>
                    )}
                  />
                  <Controller
                    name="query"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={t("common.fullSearch.placeholder")}
                        type="text"
                        isRequired
                        endContent={
                          <Button
                            type="submit"
                            variant="flat"
                            color="primary"
                            // size="sm"
                            isIconOnly
                            isLoading={isSubmitting}
                          >
                            <ArrowRightCircleIcon className="size-6" />
                          </Button>
                        }
                      />
                    )}
                  />
                </form>
                {isSubmitted && (
                  <SearchResults closeFn={onClose} results={searchResults} />
                )}
              </DrawerBody>
              <DrawerFooter>
                <Button onPress={onClose} color="danger" fullWidth>
                  {t("common.cancel")}
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default HeaderActions;
