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
  },
  {
    key: "pdf",
    slug: "pdfs",
    label: "Free PDFs & Guides",
    description: "Downloadable manuals, safety guides, and technical resources from leading aviation organisations.",
  },
  {
    key: "podcast",
    slug: "podcasts",
    label: "Podcasts",
    description: "Elite athlete interviews, safety discussions, and adventure stories — perfect for training runs.",
  },
  {
    key: "youtube",
    slug: "youtube",
    label: "YouTube",
    description: "Technique breakdowns, gear reviews, and race footage from the sport's best channels.",
  },
  {
    key: "app",
    slug: "apps",
    label: "Apps & Tools",
    description: "Weather, navigation, and flight tracking tools used by professional hike and fly athletes.",
  },
  {
    key: "course",
    slug: "courses",
    label: "Courses",
    description: "Structured online training programs to accelerate your progression as a pilot.",
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
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-blue-900 px-6 pt-8 pb-6 flex flex-col gap-8 relative overflow-hidden">
                  <p className="text-sm text-blue-300">
                    {count} resource{count !== 1 ? "s" : ""}
                  </p>
                  <h2 className="text-2xl font-semibold text-white">{cat.label}</h2>
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute right-4 -top-4 w-20 h-20 rounded-full bg-white/5" />
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{cat.description}</p>
                  <span className="text-sm font-semibold text-blue-800 dark:text-blue-400 group-hover:underline">
                    Browse {cat.label} &rarr;
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
