"use client";
import { useTranslations } from "next-intl";
import { FC, useEffect, useRef } from "react";
import Container from "../shared/container";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero: FC = () => {
  const t = useTranslations("home");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  //   const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && descriptionRef.current && textRef.current) {
      // Split the text into words
      const titleSplit = new SplitText(titleRef.current, { type: "chars" });
      const textSplit = new SplitText(textRef.current, { type: "lines" });

      const tl = gsap.timeline();

      gsap.set(textRef.current, { perspective: 400 });

      // Draw the line from left to right
      tl.fromTo(
        titleSplit.chars,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.045, duration: 0.45, ease: "power2.out" }
      )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 0 },
          { opacity: 1, y: 0, ease: "power2.out" },
          "-=0.25"
        )
        .from(
          textSplit.lines,
          {
            duration: 0.8,
            opacity: 0,
            scale: 0,
            y: 80,
            rotationX: 180,
            transformOrigin: "0% 50% -50",
            ease: "back",
            stagger: 0.01,
          },
          "-=0.25"
        );

      // Cleanup on unmount
      return () => {
        titleSplit.revert();
        textSplit.revert();
      };
    }
  }, []);

  return (
    <div className="h-dvh w-full relative overflow-hidden">
      <motion.video
        src="/assets/paragliding.mp4"
        autoPlay
        muted
        loop
        className="min-w-full h-full object-cover"
        preload="auto"
        variants={{
          animate: {
            scale: [1, 1.2, 1],
          },
        }}
        animate="animate"
        transition={{
          duration: 22,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <div className="absolute w-full top-1/2 -translate-y-1/2 z-20 text-white">
        <Container className="w-full relative">
          <div className="title-description">
            {/* Hero Title */}
            <div className="overflow-hidden">
              <h1
                ref={titleRef}
                className="hero-title text-3xl md:text-6xl font-bold text-center relative"
              >
                {t("hero.title")}
              </h1>
            </div>
            <p
              ref={descriptionRef}
              className="italic text-lg md:text-xl text-center relative mt-4"
            >
              {t("hero.description")}
            </p>
          </div>
          <p ref={textRef} className="text-center mt-8 max-w-80 mx-auto">
            {t("hero.longText")}
          </p>
        </Container>
      </div>
      <div className="absolute h-full w-full bg-gradient-to-b from-blue-800/10 to-blue-900 z-10 top-0 left-0"></div>
    </div>
  );
};

export default Hero;
