"use client";

import { FC, useState, useMemo } from "react";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { MVGear, GearCategory } from "@/lib/types/misc";
import GearCard from "@/components/cards/gear-card";
import Container from "@/components/shared/container";

type Props = {
  gear: MVGear[];
  categories: GearCategory[];
};

const Gear: FC<Props> = ({ gear, categories }) => {
  const t = useTranslations("gear");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return gear;
    return gear.filter((item) =>
      item.gear_categories.some((c) => c.slug === activeCategory)
    );
  }, [gear, activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-blue-900 text-white pt-32 pb-16">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("hero.title")}</h1>
          <p className="text-lg text-blue-200 max-w-2xl">{t("hero.description")}</p>
        </Container>
      </div>

      {/* Category filter */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <Container>
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Button
              size="sm"
              variant={activeCategory === "all" ? "solid" : "flat"}
              color={activeCategory === "all" ? "primary" : "default"}
              onPress={() => setActiveCategory("all")}
              className="shrink-0"
            >
              {t("filter.all")}
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.slug}
                size="sm"
                variant={activeCategory === cat.slug ? "solid" : "flat"}
                color={activeCategory === cat.slug ? "primary" : "default"}
                onPress={() => setActiveCategory(cat.slug)}
                className="shrink-0"
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </Container>
      </div>

      {/* Grid */}
      <div className="bg-gray-50 py-12">
        <Container>
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-default-400">
              <p className="text-lg">{t("noItems")}</p>
            </div>
          ) : (
            <>
              <p className="text-small text-default-500 mb-6">
                {filtered.length} {filtered.length === 1 ? t("item") : t("items")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((item) => (
                  <GearCard key={item.id} gear={item} />
                ))}
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Gear;
