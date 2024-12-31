"use client";
import { useTranslations } from "next-intl";
import { FC, useEffect, useRef } from "react";
import Container from "../shared/container";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Button } from "@nextui-org/react";
import Link from "next/link";

gsap.registerPlugin(SplitText);

const Hero: FC = () => {
  const t = useTranslations("home");
  const titleWrapper = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const mainHero = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // Animation for large screens
            gsap.to(videoRef.current, {
                scale: 1.2,
                duration: 22,
                ease: "easeInOut",
                repeat: -1,
                yoyo: true,
            });
        });
    if (titleRef.current && descriptionRef.current) {
      // Split the text into words
      const titleSplit = new SplitText(titleRef.current, { type: "chars" });
      const textSplit = new SplitText(textRef.current, { type: "lines" });

      const tl = gsap.timeline();

      gsap.set(mainHero.current, { autoAlpha: 0 });
      gsap.set(mainHero.current, { autoAlpha: 1 });
      gsap.set(textRef.current, { perspective: 400 });
      const upDistance = window.innerHeight / 5;

      // show title
      tl.fromTo(
        titleSplit.chars,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.045, duration: 0.45, ease: "power2.out" }
      )
        // show description
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 0 },
          { opacity: 1, y: 0, ease: "power2.out" },
          "-=0.25"
        )
        .to([titleWrapper.current, descriptionRef.current], {
          y: `-=${upDistance}`,
          duration: 0.65,
          ease: "power4.inOut",
          stagger: 0.1,
        })
        .set(textRef.current, { y: `-=${upDistance}` })
        .set(actionsRef.current, { y: `-=${upDistance}` })
        .fromTo(
          textSplit.lines,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.045,
            duration: 0.45,
            ease: "power2.out",
          }
        )
        .fromTo(actionsRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
        }, {
          opacity: 1,
        })

      // Cleanup on unmount
      return () => {
        titleSplit.revert();
        textSplit.revert();
        tl.kill();
        mm.revert();
      };
    }
  }, []);

  return (
    <div className="h-dvh w-full relative overflow-hidden">
      <video
        ref={videoRef}
        src="/assets/paragliding.mp4"
        autoPlay
        muted
        loop
        poster="/assets/paragliding.jpeg"
        className="min-w-full h-full object-cover"
        preload="auto"
        // variants={{
        //   animate: {
        //     scale: [1, 1.2, 1],
        //   },
        // }}
        // animate={false ? "animate" :  undefined}
        // transition={{
        //   duration: 22,
        //   ease: "easeInOut",
        //   repeat: Infinity,
        // }}
      />
      <div
        ref={mainHero}
        className="absolute w-full top-1/2 z-20 text-white invisible"
      >
        <Container className="w-full h-full relative text-center">
          {/* Hero Title */}
          <div className="overflow-hidden" ref={titleWrapper}>
            <h1
              ref={titleRef}
              className="hero-title text-3xl md:text-6xl font-bold"
            >
              {t("hero.title")}
            </h1>
          </div>
          <p ref={descriptionRef} className="italic text-lg md:text-xl mt-4">
            {t("hero.description")}
          </p>
          <p ref={textRef} className="mt-8 mx-auto max-w-96">
            {t("hero.longText")}
          </p>
          <div
            ref={actionsRef}
            className="flex items-center gap-3 justify-center mt-8"
          >
            <Button as={Link} href="/races" variant="solid" color="primary">
              {t("cta.races")}
            </Button>
            <Button as={Link} href="/races" variant="solid" color="primary" className="bg-white text-primary">
              {t("cta.events")}
            </Button>
          </div>
        </Container>
      </div>
      <div className="absolute h-full w-full bg-gradient-to-b from-blue-800/10 to-blue-900 z-10 top-0 left-0"></div>
      <div className="z-20 bottom-24 absolute text-white hidden">
        <span>{t('ready')}</span>
        <span>{t('go')}</span>
      </div>
    </div>
  );
};

export default Hero;
