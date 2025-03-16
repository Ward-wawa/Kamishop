"use client"
import {gsap} from 'gsap';
import {Observer} from "gsap/Observer";
import {ReactNode, useRef, useEffect} from "react";

interface NavItemProps {
    icon: ReactNode;
    title: string;
    a: number;
}

if (typeof window !== "undefined") {
    gsap.registerPlugin(Observer);
}

const Navicon: React.FC<NavItemProps> = ({icon, title, a}) => {
    const titleRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let observer: any
        observer = Observer.create({
            target: containerRef.current,
            onHover: () => {
                gsap.to(titleRef.current, {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
                if (containerRef.current) {
                    gsap.timeline()
                        .to(containerRef.current, {
                            rotation: a,
                            duration: 0.2,
                            ease: "power1.out",
                            scale: 1.7,
                        })
                        .to(containerRef.current, {
                            rotation: -a,
                            duration: 0.1,
                            scale: 0.7,
                            ease: "power1.out",
                        })
                        .to(containerRef.current, {
                            rotation: 0,
                            duration: 0.1,
                            scale: 1,
                            ease: "power1.out",
                        });
                }
            },
            onHoverEnd: () => {
                gsap.to(titleRef.current, {
                    opacity: 0,
                    x: -10,
                    duration: 0.3,
                    ease: "power2.in",
                });
            },
        });

        if (containerRef.current) {
            gsap.to(containerRef.current, {
                y: -a / 4,
                x: a / 4,
                duration: 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        }

        return () => {
            if (observer) observer.kill();
        };
    }, []);


    return (
        <div
            ref={containerRef}
            className="h-20  justify-center items-center flex flex-col relative cursor-pointer">
            <div>
                {icon}
            </div>
            <span ref={titleRef} className="absolute text-[12px] bottom-0"
                  style={{textShadow: "0 0 8px rgba(255,255,255,0.8)"}}>{title}</span>
        </div>
    );
};

export default Navicon;