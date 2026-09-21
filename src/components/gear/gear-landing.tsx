"use client";

import { FC, ReactNode } from "react";
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

const GRADIENT_VARIANTS = [
  "from-blue-900 to-blue-800",
  "from-blue-800 to-blue-700",
  "from-slate-800 to-blue-900",
  "from-blue-900 to-slate-800",
  "from-blue-700 to-blue-900",
  "from-slate-900 to-blue-800",
];

function getCategoryIcon(slug: string, name: string): ReactNode {
  const key = `${slug} ${name}`.toLowerCase();

  // Wing / paraglider
  if (key.includes("wing") || key.includes("paraglid") || key.includes("glider")) {
    return (
      <svg viewBox="0 0 80 52" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 44 Q40 6 76 44" />
        <path d="M10 44 Q40 14 70 44" opacity="0.5" />
        <line x1="21" y1="26" x2="18" y2="44" />
        <line x1="40" y1="17" x2="40" y2="44" />
        <line x1="59" y1="26" x2="62" y2="44" />
        <line x1="30" y1="20" x2="28" y2="44" />
        <line x1="50" y1="20" x2="52" y2="44" />
      </svg>
    );
  }

  // Harness
  if (key.includes("harness")) {
    return (
      <svg viewBox="0 0 64 76" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Pod body — rounded cocoon shape */}
        <path d="M16 36 Q15 58 32 64 Q49 58 48 36 L48 30 Q48 24 42 24 L22 24 Q16 24 16 30 Z" />
        {/* Left A-riser pair going up to carabiner */}
        <path d="M22 24 L12 8" />
        <path d="M28 24 L16 8" />
        <line x1="12" y1="8" x2="16" y2="8" />
        {/* Right A-riser pair going up to carabiner */}
        <path d="M42 24 L52 8" />
        <path d="M36 24 L48 8" />
        <line x1="48" y1="8" x2="52" y2="8" />
        {/* Speed bar / foot stirrup at bottom */}
        <path d="M24 62 L24 70 Q32 72 40 70 L40 62" opacity="0.6" />
      </svg>
    );
  }

  // Helmet
  if (key.includes("helmet")) {
    return (
      <svg viewBox="0 0 64 60" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 36 Q13 12 32 12 Q51 12 51 36" />
        <path d="M9 36 L55 36" />
        <path d="M15 36 L15 45 Q15 52 22 52 L42 52 Q49 52 49 45 L49 36" />
        <line x1="21" y1="36" x2="21" y2="52" />
        <line x1="43" y1="36" x2="43" y2="52" />
        <path d="M21 44 L43 44" />
      </svg>
    );
  }

  // Reserve / rescue parachute
  if (key.includes("reserve") || key.includes("rescue") || key.includes("chute")) {
    return (
      <svg viewBox="0 0 64 68" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 30 Q10 6 32 6 Q54 6 54 30" />
        <path d="M10 30 Q12 38 20 34" />
        <path d="M54 30 Q52 38 44 34" />
        <line x1="20" y1="34" x2="32" y2="58" />
        <line x1="32" y1="14" x2="32" y2="58" />
        <line x1="44" y1="34" x2="32" y2="58" />
        <circle cx="32" cy="60" r="3" />
      </svg>
    );
  }

  // Variometer / instrument / GPS / electronics
  if (key.includes("vario") || key.includes("instrument") || key.includes("electronic") || key.includes("gps") || key.includes("device") || key.includes("gadget")) {
    return (
      <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="22" />
        <circle cx="32" cy="32" r="2.5" />
        <line x1="32" y1="29.5" x2="32" y2="14" />
        <line x1="32" y1="10" x2="32" y2="13" />
        <line x1="10" y1="32" x2="13" y2="32" />
        <line x1="54" y1="32" x2="51" y2="32" />
        <line x1="17.1" y1="17.1" x2="19.2" y2="19.2" />
        <line x1="46.9" y1="17.1" x2="44.8" y2="19.2" />
        <path d="M20 38 Q26 44 32 44 Q38 44 44 38" opacity="0.5" />
      </svg>
    );
  }

  // Backpack / pack / bag
  if (key.includes("pack") || key.includes("bag") || key.includes("backpack") || key.includes("rucksack")) {
    return (
      <svg viewBox="0 0 64 76" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="20" width="32" height="44" rx="8" />
        <path d="M24 20 L24 12 Q24 8 32 8 Q40 8 40 12 L40 20" />
        <path d="M16 28 Q8 28 8 36 L8 52 Q8 60 16 60" />
        <line x1="16" y1="38" x2="48" y2="38" />
        <line x1="22" y1="50" x2="42" y2="50" />
      </svg>
    );
  }

  // Footwear / shoes / boots / trail
  if (key.includes("shoe") || key.includes("boot") || key.includes("footwear") || key.includes("trail") || key.includes("foot")) {
    return (
      <svg viewBox="0 0 80 52" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 40 L8 22 Q8 12 20 12 L38 12 L54 26 L68 26 Q76 26 76 34 L76 40" />
        <path d="M6 40 L76 40" />
        <line x1="20" y1="12" x2="20" y2="24" />
        <path d="M20 20 Q29 18 38 20" />
        <path d="M54 26 L56 40" />
      </svg>
    );
  }

  // Clothing / apparel / jacket / soft goods
  if (key.includes("cloth") || key.includes("apparel") || key.includes("jacket") || key.includes("wear") || key.includes("fleece") || key.includes("layer")) {
    return (
      <svg viewBox="0 0 72 68" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 8 L6 24 L18 30 L18 60 L54 60 L54 30 L66 24 L50 8" />
        <path d="M22 8 Q28 16 36 16 Q44 16 50 8" />
        <line x1="18" y1="30" x2="54" y2="30" />
        <line x1="36" y1="16" x2="36" y2="60" opacity="0.4" />
      </svg>
    );
  }

  // Accessories / misc
  if (key.includes("accessor") || key.includes("misc") || key.includes("gear")) {
    return (
      <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="8" />
        <path d="M32 8 L32 16" />
        <path d="M32 48 L32 56" />
        <path d="M8 32 L16 32" />
        <path d="M48 32 L56 32" />
        <path d="M15.5 15.5 L21.2 21.2" />
        <path d="M42.8 42.8 L48.5 48.5" />
        <path d="M48.5 15.5 L42.8 21.2" />
        <path d="M21.2 42.8 L15.5 48.5" />
      </svg>
    );
  }

  // Default: mountain silhouette
  return (
    <svg viewBox="0 0 80 56" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 50 L28 14 L40 30 L52 18 L76 50" />
      <path d="M2 50 L78 50" />
      <path d="M28 14 L33 22" opacity="0.5" />
      <circle cx="52" cy="10" r="4" opacity="0.6" />
    </svg>
  );
}

const GearLanding: FC<Props> = ({ categories }) => {
  const t = useTranslations("gear");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-blue-900 text-white pt-32 pb-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("hero.title")}</h1>
          <p className="text-lg text-blue-200 max-w-2xl leading-relaxed">{t("hero.description")}</p>
        </Container>
      </div>

      {/* Category grid */}
      <Container className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => router.push(`/gear?category=${cat.slug}` as never)}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
            >
              {/* Gradient header with line-art icon */}
              <div className={`bg-gradient-to-br ${GRADIENT_VARIANTS[i % GRADIENT_VARIANTS.length]} relative overflow-hidden h-44 flex flex-col justify-between p-6`}>
                {/* Decorative circle accent */}
                <div className="absolute -left-8 -top-8 w-36 h-36 rounded-full bg-white/[0.04]" />

                {/* White line-art icon — decorative, bottom-right */}
                <div
                  className="absolute bottom-4 right-4 w-28 h-28 opacity-20 group-hover:opacity-35 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  {getCategoryIcon(cat.slug, cat.name)}
                </div>

                <p className="text-xs text-blue-300 font-medium relative z-10">
                  {cat.count} {cat.count === 1 ? t("item") : t("items")}
                </p>
                <h2 className="text-2xl font-semibold text-white relative z-10">{cat.name}</h2>
              </div>

              {/* Footer */}
              <div className="px-6 py-5">
                <span className="text-sm font-semibold text-blue-800 dark:text-blue-400 group-hover:underline">
                  {cat.name} &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default GearLanding;
