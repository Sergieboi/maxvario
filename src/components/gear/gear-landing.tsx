"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { GearCategory } from "@/lib/types/misc";
import Container from "@/components/shared/container";

type CategoryCard = GearCategory & {
  thumbnail: string | null;
  count: number;
};

type Props = {
  categories: CategoryCard[];
};

const GearLanding: FC<Props> = ({ categories }) => {
  const t = useTranslations("gear");
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-blue-900 text-white pt-32 pb-16">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("hero.title")}</h1>
          <p className="text-lg text-blue-200 max-w-2xl">{t("hero.description")}</p>
        </Container>
      </div>

      {/* Category grid */}
      <div className="bg-gray-50 py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => router.push(`/gear?category=${cat.slug}` as never)}
                className="group relative overflow-hidden rounded-2xl aspect-video bg-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 text-left"
              >
                {cat.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cat.thumbnail}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-blue-900" />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white text-2xl font-bold mb-1">{cat.name}</h2>
                  <p className="text-white/70 text-sm">
                    {cat.count} {cat.count === 1 ? t("item") : t("items")} →
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default GearLanding;
