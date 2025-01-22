"use client";
import { FC, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../shared/container";
import { useTranslations } from "next-intl";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { HomePhoto } from "@/lib/types/misc";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type Props = {
  images: Array<HomePhoto>;
};

const HomeIntro: FC<Props> = ({ images }) => {
  const t = useTranslations("homeIntro");
  const introTitleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.innerWidth > 1024) {
      gsap.fromTo(
        introTitleRef.current,
        {
          opacity: 0,
          y: 200,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introTitleRef.current,
            scrub: true,
            start: "top bottom", // when the top of the trigger hits the top of the viewport
          },
        }
      );
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: true,
        smoothTouch: false,
        effects: true,
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.kill();
    };
  }, []);
  return (
    <div id="images-grid">
      <div className="text-white pt-10 pb-24">
        <Container className="flex items-start justify-between flex-wrap">
          <div
            ref={introTitleRef}
            className="w-full lg:w-1/3 2xl:w-1/4 mb-6 pe-4"
          >
            <h1 className="text-2xl lg:text-4xl font-semibold mb-6">
              {t("introTitle")}
            </h1>
            <p data-speed={1.05} className="text-lg mb-6">
              {t("introDescription")}
            </p>
            <Button
              data-speed={1.05}
              as={Link}
              href="/calendar"
              variant="solid"
              className="bg-white"
            >
              {t("cta.title")}
            </Button>
          </div>
          <div className="w-full lg:w-2/3 2xl:w-3/4 grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4 ">
            {[0, 2, 4, 6].map((number, index) => (
              <div
                key={index}
                data-speed={1 + 0.25 * index}
                className="overflow-hidden rounded-lg relative w-full flex flex-col gap-4"
              >
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="relative overflow-hidden">
                    <Link
                      href={`${images?.[number + i]?.pathname}`}
                      title={`${images?.[number + i]?.title}`}
                    >
                      <Image
                        isZoomed
                        src={`${images?.[number + i]?.thumbnail}`}
                        alt={`${images?.[number + i]?.title}`}
                        className="w-full h-auto rounded-xl shadow object-cover grayscale-[0.7]"
                        width={300}
                        height={300}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HomeIntro;
