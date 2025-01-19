import Link from "next/link";
import { FC } from "react";
import Container from "../container";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

const Footer: FC = () => {
  const t = useTranslations("footer");
  return (
    <footer className="mx-auto bg-blue-900 flex w-full py-10 text-white">
      <Container>
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8 md:pr-8">
            <div className="flex items-center justify-start">
              <Link href="/" className="text-xl font-bold">
                <svg
                  width="62.012"
                  height="50.682"
                  viewBox="0 0 620.12 506.82"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 2"
                >
                  <path
                    fill="#FFFFFF"
                    d="m0.31,505.49l252.58,-446.54l91.97,163.96l-8.68,13.71l-83.27,-144.33l-223.28,397.19l147.99,2.04l72.62,-136.65l61.96,98.63l112.65,-201.25l195.28,254.57l-186.61,0l-48.79,-81.28l4.82,-13.36l3.01,1.69l50.29,80.95l153.29,0l-169.27,-217.27l-115.33,209.96s-1.45,-2.27 -2.29,-3.74c-18.19,-31.83 -36.45,-63.8 -55.39,-95.19c-0.82,-1.36 0.21,-2.37 -2.94,-1.73l-62.67,118.63l-187.94,0l0,0.01z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="m618.78,205.57l-4.63,-20.02c-58.22,-164.38 -291.07,-196.26 -437.61,-149.64c-77.72,24.72 -164.13,82.37 -174.91,169.66c-2.33,-0.35 -1.51,-7.02 -1.38,-8.72c5.77,-75.68 72.73,-133.31 137.78,-162.13c104.29,-46.2 238.82,-46.38 343.05,0c68.37,30.43 136.7,90.46 137.71,170.85l-0.01,0z"
                  />
                </svg>
              </Link>
            </div>
            <p className="text-small text-default-200">{t("description")}</p>
            <div className="flex space-x-6">
              <Link
                className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                href="https://www.instagram.com/maxvariohq/"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                role="link"
              >
                <span className="sr-only">Maxvario Instagram</span>
                <Icon icon="ri:instagram-fill" width="24" height="24" />
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:grid sm:grid-cols-2 sm:gap-8 lg:w-auto lg:text-right xl:mt-0">
            <div>
              <h3 className="text-small font-semibold text-default-200">
                {t("footer.races.title")}
              </h3>
              <ul className="mt-4 space-y-3 sm:mt-6 md:space-y-4">
                <li>
                  <Link
                    className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                    href="/calendar"
                    target="_self"
                    tabIndex={0}
                    role="link"
                  >
                    {t("footer.races.calendar")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                    href="/races"
                    target="_self"
                    tabIndex={0}
                    role="link"
                  >
                    {t("footer.races.allRaces")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                    href="/news"
                    target="_self"
                    tabIndex={0}
                    role="link"
                  >
                    {t("footer.races.news")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                    href="/blog"
                    target="_self"
                    tabIndex={0}
                    role="link"
                  >
                    {t("footer.races.blog")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <div>
                <h3 className="text-small font-semibold text-default-200">
                  {t("footer.resources.title")}
                </h3>
                <ul className="mt-4 space-y-3 sm:mt-6 md:space-y-4">
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/pages/terms"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      {t("footer.resources.terms")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/pages/privacy"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      {t("footer.resources.privacy")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/pages/terms"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      {t("footer.resources.cookies")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                      href="/pages/terms"
                      target="_self"
                      tabIndex={0}
                      role="link"
                    >
                      {t("footer.resources.contact")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
