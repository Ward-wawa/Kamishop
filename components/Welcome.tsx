"use client"
import { Dancing_Script } from "next/font/google";
import {gsap} from "gsap";
import {useEffect,useRef} from "react";

const dancing = Dancing_Script({weight: "500", subsets: ["latin"]})
const Welcome = () => {
    const welcomeRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        if (welcomeRef.current) {
            const tl = gsap.timeline();
            setTimeout(()=>{
                tl.to(welcomeRef.current, {
                    y: -5,
                    x: 25,
                    duration: 2,
                    ease: "power1.out",
                    yoyo: true,
                }).to(welcomeRef.current,{
                    y: 15,
                    x: 0,
                    duration: 2,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat:-1,
                });
            },900)
            gsap.fromTo(welcomeRef.current,
                {opacity: 0 ,scale:1.5},
                {
                    scale:1,
                    duration: 1,
                    ease: "power2.out",
                    opacity: 1,
                });
        }
    },[])
    return (
        <div className="flex flex-col justify-center md:ml-32 max-md:mr-32 max-md:mt-12">
            <div ref={welcomeRef} className="flex-col text-center max-md:w-[200px]">
                <div className={dancing.className}>
                    <h1 className="font-extrabold text-5xl max-md:text-[25px] ">Welcome To Our Page... </h1>
                </div>
                <p className="text-lg mt-5 max-md:text-[10px]">
                    We offer you the best of the best!
                    Check Our High Quality Perfumes On the Browse Page!..
                </p>
            </div>
        </div>
    );
};

export default Welcome;