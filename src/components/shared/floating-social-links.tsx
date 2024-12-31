'use client';
import gsap from "gsap";
import { FC, useEffect, useRef } from "react";

const FloatingSocialLinks: FC = () => {
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.set(pathRef.current, { fill: 'white' })
            .to(pathRef.current, { 
                attr: { d: "M0,0 H65 V2 H0 Z" } // Initial small rectangle
            })
            .to(pathRef.current, {
                duration: 1,
                ease: "power3.inOut",
                attr: { 
                    d: "M0,0 H65 V125 L0,165 Z"
                },
                yoyo: true,
            });
    }, []);

    return (
        <div className="z-30 right-0 top-1/2 -translate-y-1/2 fixed">
            <svg width={65} height={165} xmlns="http://www.w3.org/2000/svg">
                <path 
                    ref={pathRef} 
                    fill="transparent" 
                    strokeLinejoin="round" 
                    strokeLinecap="round" 
                    d="M65,0 H65 V0 H65 Z" 
                />
            </svg>
        </div>
    );
};

export default FloatingSocialLinks;
