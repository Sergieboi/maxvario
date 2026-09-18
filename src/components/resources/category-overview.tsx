"use client";

import { FC } from "react";
import Link from "next/link";
import Container from "@/components/shared/container";
import { RESOURCES } from "@/components/resources/resource-data";

const CATEGORIES = [
  {
    key: "book",
    slug: "books",
    label: "Books",
    description: "Essential reading for hike and fly pilots, from beginner manuals to elite athlete insights.",
    gradient: "from-amber-500 to-orange-600",
    icon: "📖",
    bg: "bg-amber-50 dark:bg-amber-950",
  },
  {
    key: "pdf",
    slug: "pdfs",
    label: "Free PDFs & Guides",
    description: "Downloadable manuals, safety guides, and technical resources from leading aviation organisations.",
    gradient: "from-emerald-500 to-teal-600",
    icon: "📄",
    bg: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    key: "podcast",
    slug: "podcasts",
    label: "Podcasts",
    description: "Elite athlete interviews, safety discussions, and adventure stories — perfect for training runs.",
    gradient: "from-purple-500 to-violet-600",
    icon: "🎙️",
    bg: "bg-purple-50 dark:bg-purple-950",
  },
  {
    key: "youtube",
    slug: "youtube",
    label: "YouTube",
    description: "Technique breakdowns, gear reviews, and race footage from the sport's best channels.",
    gradient: "from-red-500 to-rose-600",
    icon: "▶",
    bg: "bg-red-50 dark:bg-red-950",
  },
  {
    key: "app",
    slug: "apps",
    label: "Apps & Tools",
    description: "Weather, navigation, and flight tracking tools used by professional hike and fly athletes.",
    gradient: "from-blue-500 to-indigo-600",
    icon: "📱",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    key: "course",
    slug: "courses",
    label: "Courses",
    description: "Structured online training programs to accelerate your progression as a pilot.",
    gradient: "from-teal-500 to-cyan-600",
    icon: "🎓",
    bg: "bg-teal-50 dark:bg-teal-950",
  },
];

const CategoryOverview: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-blue-900 text-white pt-32 pb-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Study Materials</h1>
          <p className="text-blue-200 text-lg max-w-2xl leading-relaxed">
            The best books, podcasts, apps, and online resources specifically curated for hike and fly pilots — from beginner to elite.
          </p>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const count = RESOURCES.filter((r) => r.category === cat.key).length;
            return (
              <Link
                key={cat.slug}
                href={`/resources/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient background */}
                <div className={`bg-gradient-to-br ${cat.gradient} p-8 h-56 flex flex-col justify-between`}>
                  <span className="text-5xl">{cat.icon}</span>
                  <div>
                    <span className="inline-block text-white/70 text-sm font-medium mb-1">
                      {count} resource{count !== 1 ? "s" : ""}
                    </span>
                    <h2 className="text-2xl font-bold text-white">{cat.label}</h2>
                  </div>
                  {/* Decorative circle */}
                  <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5 group-hover:scale-125 transition-transform duration-500" />
                </div>
                {/* Description */}
                <div className={`${cat.bg} p-5`}>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{cat.description}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-gray-900 dark:text-white group-hover:underline">
                    Browse {cat.label} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default CategoryOverview;
