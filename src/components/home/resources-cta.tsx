"use client";

import { FC } from "react";
import Link from "next/link";
import Container from "@/components/shared/container";
import { useTranslations } from "next-intl";

const ResourcesCta: FC = () => {
  const t = useTranslations("resourcesCta");

  return (
    <div className="py-20">
      <Container>
        <h2 className="text-3xl font-semibold text-blue-800 mb-3">
          {t("heading")}
        </h2>
        <p className="text-lg text-blue-700 mb-10">
          {t("tagline")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Study Materials */}
          <Link
            href="/resources"
            className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 h-64 flex flex-col justify-between">
              <p className="text-sm text-blue-300">{t("studyMaterials.subtitle")}</p>
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute right-6 -top-6 w-28 h-28 rounded-full bg-white/5" />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-2">{t("studyMaterials.title")}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {t("studyMaterials.description")}
                </p>
                <span className="inline-block mt-4 text-white font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  {t("studyMaterials.cta")} &rarr;
                </span>
              </div>
            </div>
          </Link>

          {/* Adventure Planning */}
          <Link
            href="/resources/mission-planner"
            className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-8 h-64 flex flex-col justify-between">
              <p className="text-sm text-blue-300">{t("adventurePlanning.subtitle")}</p>
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute right-6 -top-6 w-28 h-28 rounded-full bg-white/5" />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-2">{t("adventurePlanning.title")}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {t("adventurePlanning.description")}
                </p>
                <span className="inline-block mt-4 text-white font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  {t("adventurePlanning.cta")} &rarr;
                </span>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ResourcesCta;
