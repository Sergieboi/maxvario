import { FC } from "react";
import Link from "next/link";
import Container from "@/components/shared/container";

const ResourcesCta: FC = () => (
  <div className="bg-gray-50 py-16">
    <Container>
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
        Pilot Resources
      </p>
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-10">
        Everything you need to fly further
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Study Materials */}
        <Link
          href="/resources"
          className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 h-64 flex flex-col justify-between">
            <span className="text-5xl">📖</span>
            {/* Decorative circles */}
            <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute right-6 -top-6 w-28 h-28 rounded-full bg-white/5" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-1">Study Materials</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Books, podcasts, apps, and guides curated for hike and fly pilots at every level.
              </p>
              <span className="inline-block mt-4 text-white font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Browse resources →
              </span>
            </div>
          </div>
        </Link>

        {/* Adventure Planning */}
        <Link
          href="/resources/mission-planner"
          className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 h-64 flex flex-col justify-between">
            <span className="text-5xl">🗺️</span>
            {/* Decorative circles */}
            <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute right-6 -top-6 w-28 h-28 rounded-full bg-white/5" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-1">Adventure Planning</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Plan your next hike and fly mission — weather, route, gear checklist, and a printable mission brief.
              </p>
              <span className="inline-block mt-4 text-white font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Plan your mission →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Container>
  </div>
);

export default ResourcesCta;
