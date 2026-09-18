"use client";

import { FC, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import Container from "@/components/shared/container";

type Category = "all" | "book" | "pdf" | "podcast" | "youtube" | "app" | "course";

type Resource = {
  title: string;
  author?: string;
  description: string;
  category: Exclude<Category, "all">;
  url: string;
  free: boolean;
  platform?: string;
};

const RESOURCES: Resource[] = [
  // ── Books ────────────────────────────────────────────────────────────────
  {
    title: "The Art of Paragliding",
    author: "Dennis Pagen",
    description: "The most comprehensive English-language paragliding manual covering theory, technique, weather, and cross-country flying.",
    category: "book",
    url: "https://pagenbooks.com/category/books/",
    free: false,
  },
  {
    title: "Touching Cloudbase",
    author: "Ian Currer",
    description: "XC flying theory and decision-making used widely in pilot training. Covers reading thermals, route planning, and risk management.",
    category: "book",
    url: "https://touchingcloudbase.co.uk/",
    free: false,
  },
  {
    title: "Understanding the Sky",
    author: "Dennis Pagen",
    description: "Weather specifically written for free flight pilots — thermals, fronts, mountain meteorology, and forecasting.",
    category: "book",
    url: "https://pagenbooks.com/category/books/",
    free: false,
  },
  {
    title: "Performance Flying",
    author: "Dennis Pagen",
    description: "Advanced cross-country and competition flying. Covers speed-to-fly, glide optimization, and race strategy.",
    category: "book",
    url: "https://pagenbooks.com/category/books/",
    free: false,
  },
  {
    title: "Advanced Paragliding",
    author: "Gavin McClurg",
    description: "In-depth guide to advanced paragliding skills from one of the world's top hike and fly athletes and a multiple Red Bull X-Alps finisher.",
    category: "book",
    url: "https://www.cloudbasemayhem.com/product/advanced-paragliding-by-gavin-mcclurg/",
    free: false,
  },
  {
    title: "The Wanderbird Strategy",
    author: "Paul Guschlbauer",
    description: "A unique strategic approach to hike and fly adventure racing — mission planning, movement, and decision-making in the mountains.",
    category: "book",
    url: "https://wanderbirdshop.com/en/products/wanderbird-strategy-by-paul-guschlbauer",
    free: false,
  },
  {
    title: "Der Überflieger",
    author: "Chrigel Maurer",
    description: "Insights from the most decorated Red Bull X-Alps athlete of all time — training, mindset, and the art of hike and fly at the elite level. Available in German only.",
    category: "book",
    url: "https://hikeandfly.com/en-ch/products/chrigel-maurer-der-uberflieger",
    free: false,
  },
  {
    title: "101 Ways to Fly Better",
    author: "Bruce Goldsmith et al.",
    description: "Practical tips from legendary paraglider designer Bruce Goldsmith and co-authors — 101 concise lessons covering technique, safety, equipment, and mindset for pilots at every level.",
    category: "book",
    url: "https://xcmag.com/product/paragliding-101-ways-to-fly-better/",
    free: false,
  },

  // ── Free PDFs ────────────────────────────────────────────────────────────
  {
    title: "DHV SIV Manual",
    author: "DHV",
    description: "Comprehensive guide to safety maneuvers, reserve deployment, and incident recovery. Free download from Germany's DHV.",
    category: "pdf",
    url: "https://www.dhv.de/fliegen/sicherheitstraining/",
    free: true,
    platform: "DHV",
  },
  {
    title: "Enhancing Safety and Performance in Paragliding: The Role of SIV Training Supported by Science",
    author: "Dilan Benedetti",
    description: "A research-backed deep dive into SIV training — how science validates safety maneuver practice and what pilots should know to fly more safely.",
    category: "pdf",
    url: "https://xcmag.com/fly-better/paragliding-techniques-paramotoring-skills/the-essential-role-of-siv-download/",
    free: true,
  },
  {
    title: "Meteorology for Paraglider Pilots",
    author: "DHV",
    description: "Excellent weather theory specific to paragliding — thermals, convergence, sea breezes, and mountain effects.",
    category: "pdf",
    url: "https://www.dhv.de/wetter/wetterwissen/",
    free: true,
    platform: "DHV",
  },
  {
    title: "DHV Hike & Fly Resources",
    author: "DHV",
    description: "Germany's DHV compiles hike and fly regulations, safety guidelines, equipment requirements, and site information for hike and fly pilots.",
    category: "pdf",
    url: "https://www.dhv.de/flugbetrieb/hike-fly/",
    free: true,
    platform: "DHV",
  },
  {
    title: "XC Skies User Guide",
    author: "XC Skies",
    description: "Learn to read the forecast tools used by every XC pilot — RASP, BLIPMAPs, sounding data, and more.",
    category: "pdf",
    url: "https://docs.xcskies.com/",
    free: true,
    platform: "XC Skies",
  },

  // ── Podcasts ─────────────────────────────────────────────────────────────
  {
    title: "Cloudbase Mayhem",
    author: "Gavin McClurg",
    description: "The gold standard paragliding podcast. Elite athletes and coaches discuss decision-making, near-misses, and high-level technique.",
    category: "podcast",
    url: "https://cloudbasemayhem.com",
    free: true,
    platform: "All platforms",
  },
  {
    title: "The Paragliding Atlas",
    author: "Aninder Singh",
    description: "Exploring the world's best paragliding destinations — site guides, local knowledge, and travel stories for the flying adventurer.",
    category: "podcast",
    url: "https://paraglidingatlas.com/podcast.html",
    free: true,
    platform: "Spotify",
  },
  {
    title: "XC Mag Podcast",
    author: "Cross Country Magazine",
    description: "In-depth interviews and stories from the world of free flight — covering XC, hike and fly, competition, and safety from the sport's leading magazine.",
    category: "podcast",
    url: "https://xcmag.com/podcasts/",
    free: true,
    platform: "All platforms",
  },
  {
    title: "The Wanderbird Podcast",
    author: "Paul Guschlbauer",
    description: "Stories, strategy, and inspiration from the hike and fly community — adventure travel, races, and athlete journeys across the mountains.",
    category: "podcast",
    url: "https://www.wanderbird.io/wanderbird-podcast",
    free: true,
    platform: "All platforms",
  },
  {
    title: "Que Hay de Vuelo",
    author: "Joanna Di Grígoli",
    description: "Leading Spanish-language paragliding podcast covering technique, weather, safety, and adventures in the Spanish-speaking flying community.",
    category: "podcast",
    url: "https://open.spotify.com/show/316XviQkPv5m5qLg8uGMo7",
    free: true,
    platform: "Spotify",
  },

  // ── YouTube ──────────────────────────────────────────────────────────────
  {
    title: "Flybubble Paragliding",
    author: "Flybubble",
    description: "The best YouTube channel for technique, gear reviews, and theory. Extremely well produced and beginner-friendly.",
    category: "youtube",
    url: "https://www.youtube.com/flybubbleparagliding",
    free: true,
    platform: "YouTube",
  },
  {
    title: "XCmag",
    author: "Cross Country Magazine",
    description: "Competition flying, athlete interviews, race course footage, and technique videos from the world's leading free flight magazine.",
    category: "youtube",
    url: "https://www.youtube.com/@xcmag",
    free: true,
    platform: "YouTube",
  },
  {
    title: "Ari in the Air",
    author: "Ari",
    description: "Hike and fly adventure content, wing reviews, and travel vlogs from a passionate free flight pilot exploring the world's best flying destinations.",
    category: "youtube",
    url: "https://www.youtube.com/@AriintheAir",
    free: true,
    platform: "YouTube",
  },
  {
    title: "Red Bull X-Alps",
    author: "Red Bull",
    description: "Official race coverage, athlete vlogs, and behind-the-scenes content from the world's toughest hike and fly race.",
    category: "youtube",
    url: "https://www.youtube.com/@redbullx-alps",
    free: true,
    platform: "YouTube",
  },
  {
    title: "Gin Gliders",
    author: "Gin Gliders",
    description: "SIV videos, safety demonstrations, and wing review content from one of the leading paraglider manufacturers.",
    category: "youtube",
    url: "https://www.youtube.com/@Ginglidersinc",
    free: true,
    platform: "YouTube",
  },

  // ── Apps ─────────────────────────────────────────────────────────────────
  {
    title: "Burnair",
    author: "Burnair",
    description: "Swiss-made paragliding weather and airspace app — thermal forecasts, wind overlays, and live flight tracking built specifically for free flight pilots.",
    category: "app",
    url: "https://burnair.ch",
    free: false,
    platform: "iOS & Android",
  },
  {
    title: "Windy",
    author: "Windy.com",
    description: "The best general weather tool for pilots. Visualize wind layers, thermals, precipitation, and forecasts across multiple models.",
    category: "app",
    url: "https://www.windy.com",
    free: true,
    platform: "iOS & Android",
  },
  {
    title: "XCTrack",
    author: "XCTrack",
    description: "Free Android flight computer for navigation, waypoints, airspace alerts, and live tracking during XC and race flying.",
    category: "app",
    url: "https://xctrack.org",
    free: true,
    platform: "Android",
  },
  {
    title: "Flyskyhy",
    author: "Flyskyhy",
    description: "iOS flight tracking and airspace alert app — variometer, GPS logging, live tracking, and airspace warnings.",
    category: "app",
    url: "https://www.flyskyhy.com",
    free: false,
    platform: "iOS",
  },
  {
    title: "XC Skies",
    author: "XC Skies",
    description: "Thermal and XC-specific weather forecast tool. Shows cloud base, thermal strength, and glide ratios for cross-country planning.",
    category: "app",
    url: "https://xcskies.com",
    free: true,
    platform: "Browser / iOS",
  },
  {
    title: "MeteoBlue",
    author: "MeteoBlue",
    description: "Detailed mountain weather forecasting used by professional athletes — CAPE index, wind shear, and multi-day mountain forecasts.",
    category: "app",
    url: "https://www.meteoblue.com",
    free: true,
    platform: "iOS & Android",
  },
  {
    title: "Relief Maps",
    author: "Relief Maps",
    description: "Beautiful 3D terrain visualization app for iOS — plan routes on photorealistic topography with elevation profiles and shading.",
    category: "app",
    url: "https://reliefmaps.io/",
    free: false,
    platform: "iOS",
  },
  {
    title: "OsmAnd Maps",
    author: "OsmAnd",
    description: "Powerful open-source offline navigation app. Download full country maps, record tracks, and navigate without mobile signal in remote terrain.",
    category: "app",
    url: "https://osmand.net",
    free: true,
    platform: "iOS & Android",
  },
  {
    title: "SeeYou Navigator",
    author: "Naviter",
    description: "Advanced navigation app for paragliding and hang gliding — airspace, waypoints, task flying, and live tracking used by competition pilots worldwide.",
    category: "app",
    url: "https://naviter.com/seeyou-navigator/",
    free: false,
    platform: "iOS & Android",
  },
  {
    title: "Fatmap / Strava",
    author: "Fatmap",
    description: "3D outdoor map platform for route planning — view terrain in detail, find established hike and fly routes, and track fitness.",
    category: "app",
    url: "https://fatmap.com",
    free: true,
    platform: "iOS & Android",
  },
  {
    title: "Komoot",
    author: "Komoot",
    description: "Hike and trail planning with detailed surface and elevation data. Useful for planning the hike-up portion of a mission.",
    category: "app",
    url: "https://www.komoot.com",
    free: true,
    platform: "iOS & Android",
  },

  // ── Courses ──────────────────────────────────────────────────────────────
  {
    title: "Master Acro Tutorial Series",
    author: "Pal Takats",
    description: "In-depth acrobatic paragliding tutorial videos from one of the greatest acro pilots of all time — covering maneuvers, safety, and progression from beginner to advanced.",
    category: "course",
    url: "https://paltakats.com/masteracro",
    free: false,
    platform: "Online",
  },
  {
    title: "Online Paragliding Training Course",
    author: "Fly With Greg",
    description: "Structured online paragliding training from Greg Hamerton — theory, technique, and decision-making lessons for pilots at all levels.",
    category: "course",
    url: "https://flywithgreg.com/pages/online-paragliding-training-course",
    free: false,
    platform: "Online",
  },
];

const CATEGORIES: { key: Category; label: string; emoji: string }[] = [
  { key: "all", label: "All", emoji: "✦" },
  { key: "book", label: "Books", emoji: "📖" },
  { key: "pdf", label: "Free PDFs", emoji: "📄" },
  { key: "podcast", label: "Podcasts", emoji: "🎙️" },
  { key: "youtube", label: "YouTube", emoji: "▶" },
  { key: "app", label: "Apps", emoji: "📱" },
  { key: "course", label: "Courses", emoji: "🎓" },
];

const CATEGORY_COLORS: Record<Exclude<Category, "all">, string> = {
  book: "bg-amber-100 text-amber-800",
  pdf: "bg-green-100 text-green-800",
  podcast: "bg-purple-100 text-purple-800",
  youtube: "bg-red-100 text-red-800",
  app: "bg-blue-100 text-blue-800",
  course: "bg-teal-100 text-teal-800",
};

const ResourceCard: FC<{ resource: Resource }> = ({ resource }) => (
  <a
    href={resource.url === "#" ? undefined : resource.url}
    target={resource.url === "#" ? undefined : "_blank"}
    rel="noopener noreferrer"
    className={`group flex flex-col gap-3 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-shadow hover:shadow-md ${resource.url === "#" ? "cursor-default" : "cursor-pointer"}`}
  >
    <div className="flex items-start justify-between gap-2">
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[resource.category]}`}>
        {CATEGORIES.find(c => c.key === resource.category)?.emoji}{" "}
        {CATEGORIES.find(c => c.key === resource.category)?.label.replace(/s$/, "")}
      </span>
      {resource.free ? (
        <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full shrink-0">Free</span>
      ) : (
        <span className="text-xs text-gray-400 shrink-0">Paid</span>
      )}
    </div>
    <div>
      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors leading-snug">
        {resource.title}
      </h3>
      {resource.author && (
        <p className="text-sm text-gray-500 mt-0.5">{resource.author}</p>
      )}
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">{resource.description}</p>
    {resource.platform && (
      <p className="text-xs text-gray-400">{resource.platform}</p>
    )}
    {resource.url !== "#" && (
      <span className="text-xs text-blue-600 font-medium group-hover:underline">Open →</span>
    )}
  </a>
);

const StudyMaterials: FC = () => {
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? RESOURCES : RESOURCES.filter(r => r.category === active);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-blue-900 text-white pt-32 pb-16">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Study Materials</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            The best books, podcasts, apps, and online resources specifically curated for hike and fly pilots — from beginner to elite.
          </p>
        </Container>
      </div>

      <Container className="py-12">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <Button
              key={cat.key}
              size="sm"
              variant={active === cat.key ? "solid" : "flat"}
              color={active === cat.key ? "primary" : "default"}
              onPress={() => setActive(cat.key)}
              className="shrink-0"
            >
              {cat.emoji} {cat.label}
              {cat.key !== "all" && (
                <Chip size="sm" variant="flat" className="ml-1 h-4 text-[10px]">
                  {RESOURCES.filter(r => r.category === cat.key).length}
                </Chip>
              )}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r, i) => (
            <ResourceCard key={i} resource={r} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default StudyMaterials;
