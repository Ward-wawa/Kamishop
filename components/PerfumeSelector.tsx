"use client"
import {perfumeType} from "@/lib/Types";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Dancing_Script } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const dancing = Dancing_Script({weight: "500", subsets: ["latin"]})
const PerfumeSelector = ({perfumes}:{perfumes:perfumeType[]}) => {

    const [disabledButton,setDisabledButton]= useState(false);
    const [currentIndex, setCurrentIndex] = useState(15);
    const imageRef = useRef(null);

    const animateTransition = (direction:string) => {
        if (!imageRef.current) return;

        const tl = gsap.timeline();

        tl.to(imageRef.current, {
            x: direction === "next" ? 300 : -300,
            y: 800,
            opacity: 1,
            rotationZ: 45,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
                setCurrentIndex((prevIndex) =>
                    direction === "next"
                        ? (prevIndex + 1) % perfumes.length
                        : prevIndex === 0
                            ? perfumes.length - 1
                            : prevIndex - 1
                );
             tl.fromTo(
                    imageRef.current,
                    { x: direction === "next" ? -300 : 300, opacity: 0, rotationZ: -45,y:800 },
                    { x: 0, opacity: 1, rotationZ: 0, duration: 0.4, ease: "power2.inOut",y:0 }
                );
            }

        })
    };

    const handleArrowClick = (direction:string, e:any) => {
        setDisabledButton(true);
        setTimeout(()=>{
            setDisabledButton(false)
        },700)
        const t = gsap.timeline()
     t.to(e.currentTarget, {
            rotation: 90,
            duration: 0.2,
            ease: "power1.out",
            scale: 1.7,
        }).to(e.currentTarget, {
                rotation: -60   ,
                duration: 0.1,
                scale:0.7,
                ease: "power1.out",
            }).to(e.currentTarget, {
                rotation: 0,
                duration: 0.1,
                scale: 1,
                ease: "power1.out",
            });
        animateTransition(direction);
    };
    useEffect(()=>{
        gsap.fromTo(".popan2",
            { x: window.innerWidth*2,opacity:0 },
            {
                x: 0,
                duration: 1.8,
                ease: "power2.out",
                opacity:1
            }
        );
    },[])
    return (
        <div className="popan2 flex justify-center items-center flex-col ml-40 w-[25%]">
            <div className="h-[500px] flex justify-center items-center  ">
                <img
                    ref={imageRef}
                    src={`/icons/${perfumes[currentIndex].pic}.png`}
                    alt="Perfume"
                    width={310}
                    height={310}
                    className="mt-10 object-cover object-center"
                />
            </div>
            <h1 className={dancing.className} style={{ fontSize: "34px",zIndex:"30" }}>
                {perfumes[currentIndex].name}
            </h1>
            <div className="flex justify-between w-full">
                <button disabled={disabledButton} className="hover:opacity-70 transition" onClick={(e) => handleArrowClick("prev", e)}>
                    <ArrowBigLeft size={45} />
                </button>
                <button disabled={disabledButton} className="hover:opacity-70 transition" onClick={(e) => handleArrowClick("next", e)}>
                    <ArrowBigRight size={45} />
                </button>
            </div>
        </div>
    );
};

export default PerfumeSelector;
