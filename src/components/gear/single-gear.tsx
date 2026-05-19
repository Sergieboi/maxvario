"use client";

import { FC } from "react";
import { Button, Chip, Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { MVGear } from "@/lib/types/misc";
import Container from "@/components/shared/container";
import Blocks from "@/components/shared/blocks/blocks";

type StarRatingProps = { rating: number };

const StarRating: FC<StarRatingProps> = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`size-4 ${i < rating ? "text-yellow-400" : "text-default-200"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

type Props = {
  gear: MVGear;
};

const SingleGear: FC<Props> = ({ gear }) => {
  const t = useTranslations("gear");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero image */}
      <div className="relative w-full bg-blue-900" style={{ minHeight: 340 }}>
        {(gear.thumbnail_full || gear.thumbnail) && (
          <Image
            removeWrapper
            alt={gear.title}
            src={gear.thumbnail_full ?? gear.thumbnail ?? ""}
            className="w-full object-cover object-center"
            style={{ maxHeight: 480, minHeight: 340 }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <Container>
            <div className="flex flex-wrap gap-2 mb-3">
              {gear.gear_categories.map((cat) => (
                <Chip key={cat.id} size="sm" variant="flat" className="bg-white/20 text-white border-white/30">
                  {cat.name}
                </Chip>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-1">
              {gear.title}
            </h1>
            {gear.brand && (
              <p className="text-blue-200 text-lg">{gear.brand}</p>
            )}
          </Container>
        </div>
      </div>

      <Container className="py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Short description */}
            {gear.short_description && (
              <p className="text-lg text-default-600 mb-8 leading-relaxed">
                {gear.short_description}
              </p>
            )}

            {/* Full content blocks */}
            {gear.content_json && gear.content_json.length > 0 && (
              <div className="prose max-w-none mb-10">
                <Blocks blocks={gear.content_json} />
              </div>
            )}

            {/* Athlete reviews */}
            {gear.athlete_reviews && gear.athlete_reviews.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold mb-6">{t("reviews.title")}</h2>
                <div className="flex flex-col gap-6">
                  {gear.athlete_reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-sm border border-default-100"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        {review.athlete_photo ? (
                          <Image
                            src={review.athlete_photo}
                            alt={review.athlete_name}
                            className="size-14 rounded-full object-cover shrink-0"
                            removeWrapper
                          />
                        ) : (
                          <div className="size-14 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <span className="text-blue-700 font-bold text-xl">
                              {review.athlete_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{review.athlete_name}</p>
                          {review.athlete_country && (
                            <p className="text-small text-default-400">
                              {review.athlete_country}
                            </p>
                          )}
                          {review.rating > 0 && (
                            <StarRating rating={review.rating} />
                          )}
                        </div>
                      </div>
                      <p className="text-default-600 leading-relaxed">
                        &ldquo;{review.review_text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-default-100 p-6 sticky top-24">
              {gear.price && (
                <p className="text-3xl font-bold text-primary mb-4">
                  {gear.price}
                </p>
              )}

              {gear.buy_url && (
                <Button
                  as="a"
                  href={gear.buy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  size="lg"
                  className="w-full mb-6"
                >
                  {t("buyNow")}
                </Button>
              )}

              {/* Specs */}
              {gear.specifications && gear.specifications.length > 0 && (
                <div>
                  <h3 className="font-semibold text-medium mb-3">
                    {t("specifications")}
                  </h3>
                  <dl className="divide-y divide-default-100">
                    {gear.specifications.map((spec, i) => (
                      <div key={i} className="flex justify-between py-2 text-small">
                        <dt className="text-default-500">{spec.label}</dt>
                        <dd className="font-medium text-right">{spec.value}</dd>
                      </div>
                    ))}
                    {gear.weight && (
                      <div className="flex justify-between py-2 text-small">
                        <dt className="text-default-500">{t("weight")}</dt>
                        <dd className="font-medium">{gear.weight}</dd>
                      </div>
                    )}
                    {gear.brand && (
                      <div className="flex justify-between py-2 text-small">
                        <dt className="text-default-500">{t("brand")}</dt>
                        <dd className="font-medium">{gear.brand}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
};

export default SingleGear;
