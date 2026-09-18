"use client";

import { FC } from "react";
import Link from "next/link";
import Container from "@/components/shared/container";
import { RESOURCES, Category } from "@/components/resources/resource-data";

const CATEGORY_META: Record<Category, {
  label: string;
  gradient: string;
  icon: string;
  accentBg: string;
  accentText: string;
}> = {
  book: {
    label: "Books",
    gradient: "from-amber-500 to-orange-600",
    icon: "📖",
    accentBg: "bg-amber-100",
    accentText: "text-amber-800",
  },
  pdf: {
    label: "Free PDFs & Guides",
    gradient: "from-emerald-500 to-teal-600",
    icon: "📄",
    accentBg: "bg-emerald-100",
    accentText: "text-emerald-800",
  },
  podcast: {
    label: "Podcasts",
    gradient: "from-purple-500 to-violet-600",
    icon: "🎙️",
    accentBg: "bg-purple-100",
    accentText: "text-purple-800",
  },
  youtube: {
    label: "YouTube",
    gradient: "from-red-500 to-rose-600",
    icon: "▶",
    accentBg: "bg-red-100",
    accentText: "text-red-800",
  },
  app: {
    label: "Apps & Tools",
    gradient: "from-blue-500 to-indigo-600",
    icon: "📱",
    accentBg: "bg-blue-100",
    accentText: "text-blue-800",
  },
  course: {
    label: "Courses",
    gradient: "from-teal-500 to-cyan-600",
    icon: "🎓",
    accentBg: "bg-teal-100",
    accentText: "text-teal-800",
  },
};

const ResourceCard: FC<{ resource: typeof RESOURCES[0] }> = ({ resource }) => {
  const meta = CATEGORY_META[resource.category];
  const isExternal = resource.url !== "#";

  return (
    <a
      href={isExternal ? resource.url : undefined}
      target={isExternal ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`group flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${!isExternal ? "cursor-default" : ""}`}
    >
      {/* Large visual header */}
      <div className={`relative bg-gradient-to-br ${meta.gradient} flex flex-col justify-between p-6 h-48 overflow-hidden`}>
        {/* Free badge */}
        {resource.free && (
          <span className="self-start bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            Free
          </span>
        )}
        {/* Decorative circles */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute right-8 -top-4 w-20 h-20 rounded-full bg-white/5" />
        {/* Icon + title at bottom */}
        <div className="mt-auto relative z-10">
          <p className="text-white/70 text-sm font-medium">{resource.author}</p>
          <h3 className="text-white font-bold text-lg leading-snug line-clamp-2 mt-0.5">
            {resource.title}
          </h3>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
          {resource.description}
        </p>
        <div className="flex items-center justify-between">
          {resource.platform && (
            <span className="text-xs text-gray-400">{resource.platform}</span>
          )}
          {isExternal && (
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline ml-auto">
              Open →
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

type Props = { category: Category };

const StudyMaterials: FC<Props> = ({ category }) => {
  const meta = CATEGORY_META[category];
  const resources = RESOURCES.filter((r) => r.category === category);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${meta.gradient} text-white pt-32 pb-16`}>
        <Container>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            ← All Categories
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{meta.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{meta.label}</h1>
              <p className="text-white/70 mt-1">{resources.length} resource{resources.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <ResourceCard key={i} resource={r} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default StudyMaterials;
