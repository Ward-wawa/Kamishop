"use client"
import {perfumeType} from "@/lib/Types";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Dancing_Script } from "next/font/google";
import {useState, useEffect} from "react";
import gsap from "gsap";

const dancing = Dancing_Script({weight: "500", subsets: ["latin"]})
const PerfumeSelector = ({perfumes}:{perfumes:perfumeType[]}) => {

    const [disabledButton,setDisabledButton]= useState(false);
    const [currentIndex, setCurrentIndex] = useState(15);

    const animateTransition = (direction:string) => {
        const tl = gsap.timeline();

        tl.to(".Iref", {
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
                 ".Iref",
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
        <div className="popan2 max-md:ml-16 flex justify-center items-center flex-col mr-32 w-[70%] h-[500px] ">
            <div className="Iref h-[450px] flex justify-center items-center max-md:hidden ">
                <img
                    src={`/icons/${perfumes[currentIndex].pic}.png`}
                    alt="Perfume"
                    width={270}
                    height={270}
                    className="h-[370] mt-10 object-cover object-center"
                />
            </div>
            <div className="Iref h-[180px] flex justify-center items-center md:hidden ">
                <img
                    src={`/icons/${perfumes[currentIndex].pic}.png`}
                    alt="Perfume"
                    width={200}
                    height={200}
                    className="h-[200] w-[60vh] mt-10 mb-8 object-cover object-center"
                />
            </div>
            <div className={dancing.className}>
                <h1 className="whitespace-nowrap z-30 md:text-[34px] max-md:text-[20px] max-md:mt-3">
                    {perfumes[currentIndex].name}
                </h1>
            </div>
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
