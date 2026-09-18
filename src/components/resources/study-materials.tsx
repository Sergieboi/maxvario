"use client";

import { FC } from "react";
import Link from "next/link";
import Container from "@/components/shared/container";
import { RESOURCES, Category } from "@/components/resources/resource-data";

const CATEGORY_META: Record<Category, {
  label: string;
}> = {
  book:    { label: "Books" },
  pdf:     { label: "Free PDFs & Guides" },
  podcast: { label: "Podcasts" },
  youtube: { label: "YouTube" },
  app:     { label: "Apps & Tools" },
  course:  { label: "Courses" },
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
      <div className="relative h-52 overflow-hidden">
        {resource.image && !resource.logoOnGradient && !resource.logoOnLight ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </>
        ) : resource.image && resource.logoOnLight ? (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resource.image}
              alt={resource.title}
              className="max-w-[75%] max-h-28 object-contain"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center">
            {resource.image && resource.logoOnGradient && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resource.image}
                alt={resource.title}
                className="w-32 h-auto object-contain opacity-90"
              />
            )}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute right-8 -top-4 w-20 h-20 rounded-full bg-white/5" />
          </div>
        )}
        {/* Free badge */}
        {resource.free && (
          <span className="absolute top-3 left-3 bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm z-10">
            Free
          </span>
        )}
        {/* Title overlay at bottom — only on dark/gradient headers */}
        {!resource.logoOnLight && (
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <p className="text-white/80 text-xs font-medium">{resource.author}</p>
            <h3 className="text-white font-bold text-base leading-snug line-clamp-2 mt-0.5 drop-shadow">
              {resource.title}
            </h3>
          </div>
        )}
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
      <div className="bg-blue-900 text-white pt-32 pb-16">
        <Container>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-blue-300 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            &larr; All Categories
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">{meta.label}</h1>
          <p className="text-blue-200 mt-2">{resources.length} resource{resources.length !== 1 ? "s" : ""}</p>
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
