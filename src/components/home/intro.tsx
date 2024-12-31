'use client';
import { FC, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../shared/container";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const HomeIntro: FC = () => {
    const t = useTranslations('homeIntro');
    useEffect(() => {
        // gsap.from(".home-intro", {
        //     scrollTrigger: {
        //         trigger: ".home-intro",
        //         start: "top 80%",
        //         end: "bottom 80%",
        //         toggleActions: "play none none none"
        //     },
        //     y: 100,
        //     opacity: 0,
        //     duration: 1
        // });
    }, [])
    return (
        <div className="home-intro text-white py-10">
            <Container>
                <h1 className="text-2xl lg:text-4xl">{t('introTitle')}</h1>
            </Container>
        </div>
    )
};

export default HomeIntro;
