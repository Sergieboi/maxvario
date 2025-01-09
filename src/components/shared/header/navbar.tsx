import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
    const t = useTranslations("header");
    return (
        <nav>
            <ul className="hidden lg:flex space-x-4">
              <li>
                <Link href="/races" title={t("nav.races")} className="p-3 transition-all rounded-md text-white">
                  {t("nav.races")}
                </Link>
              </li>
              <li>
                <Link href="/calendar" title={t("nav.calendar")} className="p-3 transition-all rounded-md text-white">
                  {t("nav.calendar")}
                </Link>
              </li>
              <li>
                <Link href="/about" title={t("nav.about")} className="p-3 transition-all rounded-md text-white">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/news" title={t("nav.news")} className="p-3 transition-all rounded-md text-white">
                  {t("nav.news")}
                </Link>
              </li>
              <li>
                <Link href="/contact" title={t("nav.blog")} className="p-3 transition-all rounded-md text-white">
                  {t("nav.blog")}
                </Link>
              </li>
            </ul>
          </nav>
    )
};

export default Navbar;