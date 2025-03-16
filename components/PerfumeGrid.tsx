"use client"
import {useState, useEffect} from "react";
import {gsap} from "gsap";
import {ArrowBigLeft, ArrowBigRight} from "lucide-react";
import {perfumeType} from "@/lib/Types";
import PerfumeGridCard from "@/components/PerfumeGridCard";

const PerfumeGrid = (
    {malePerfumes,femalePerfumes}:{
        malePerfumes:perfumeType[],
        femalePerfumes:perfumeType[]
    }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [disabledButton,setDisabledButton]= useState(false);
    const [toggled, setToggled] = useState(true);
    const perfumesPerPage = 4;

    const displayPerfumes = (perfumes:perfumeType[]) => {
        const endIndex = Math.min(currentIndex + perfumesPerPage, perfumes.length);
        return perfumes.slice(currentIndex, endIndex);
    };

    const toggledStyleMale = {
        backgroundColor: "rgb(37 99 235)",
        color: "white",
        scale: "1.1",
    }
    const toggledStyleFemale = {
        backgroundColor: "rgb(236 72 153)",
        color: "white",
        scale: "1.1",
    }
    const animateTransition = (direction:string) => {
        const tl = gsap.timeline();

        tl.to(".per", {
            x: direction === "next" ? 600 : -600,
            y: 800,
            opacity: 0,
            stagger:0.1,
            rotationZ: 45,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
                toggled
                    ? setCurrentIndex((prevIndex) =>
                        direction === "next"
                            ? prevIndex + perfumesPerPage >= malePerfumes.length ? 0 : prevIndex + perfumesPerPage
                            : prevIndex - perfumesPerPage < 0 ? Math.max(malePerfumes.length - perfumesPerPage, 0) : prevIndex - perfumesPerPage
                    )
                    : setCurrentIndex((prevIndex) =>
                        direction === "next"
                            ? (prevIndex + perfumesPerPage) % femalePerfumes.length
                            : prevIndex === 0
                                ? femalePerfumes.length - perfumesPerPage
                                : prevIndex - perfumesPerPage
                    );
                tl.fromTo(
                    ".per",
                    { x: direction === "next" ? -600 : 600, opacity: 0, rotationZ: -45,y:800 },
                    { x: 0, opacity: 1, rotationZ: 0, duration: 0.4, ease: "power2.inOut",y:0,stagger:0.1 }
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

    const handleToggle = ()=>{
        setToggled(!toggled);
        setDisabledButton(true);
        setTimeout(()=>{
            setDisabledButton(false)
        },1200)
        setCurrentIndex(0);
        gsap.fromTo(".dow",
            { y:window.innerHeight*2,opacity:0 },
            {
                y:0,
                duration: 1.8,
                ease: "power2.out",
                opacity:1
            }
        );
    }

    useEffect(()=>{
        gsap.fromTo(".dow",
            { y:window.innerHeight*2,opacity:0 },
            {
                y:0,
                duration: 1.8,
                ease: "power2.out",
                opacity:1
            }
        );
    },[])

    return (
        <>
            <div className="flex justify-center items-center mt-5 max-md:w-[75%] max-md:mt-8 max-md:ml-[7vw]">
                <button
                    onClick={handleToggle}
                    disabled={toggled || disabledButton}
                    style={toggled ? toggledStyleMale : {} }
                    className="border-2 text-blue-600 border-blue-600 px-14 mr-6 hover:scale-[1.4] transition active:opacity-70
                     max-md:px-3 max-md:mr-1 max-md:text-[12px]
                    ">
                    Male
                </button>
                <button
                    onClick={handleToggle}
                    disabled={!toggled || disabledButton}
                    style={toggled ? {} : toggledStyleFemale }
                    className="border-2 text-pink-500 border-pink-500 px-14 ml-6 hover:scale-[1.4] transition active:opacity-70
                     max-md:px-1 max-md:mr-1 max-md:text-[12px]
                    ">
                    Female
                </button>
            </div>
            {toggled ? (
                <>
                    <div className="dow flex w-full justify-between h-[80vh]">
                        <button disabled={disabledButton} className="hover:opacity-70 transition max-md:hidden"
                                onClick={(e) => handleArrowClick("prev", e)}>
                            <ArrowBigLeft/>
                        </button>
                        <div className="grid grid-cols-4 justify-around gap-4 max-md:grid-cols-2 max-md:ml-10">
                            {displayPerfumes(femalePerfumes).map((perfume, index) => (
                                <PerfumeGridCard key={index} perfume={perfume} animationName={`per${index % 2}`}/>
                            ))}
                        </div>
                        <button disabled={disabledButton} className="hover:opacity-70 transition max-md:hidden"
                                onClick={(e) => handleArrowClick("next", e)}>
                            <ArrowBigRight/>
                        </button>
                    </div>
                    <div className="flex justify-around -ml-[10vw] md:hidden mt-4">
                        <button disabled={disabledButton} className="hover:opacity-70 transition"
                                onClick={(e) => handleArrowClick("prev", e)}>
                            <ArrowBigLeft size={32}/>
                        </button>
                        <button disabled={disabledButton} className="hover:opacity-70 transition"
                                onClick={(e) => handleArrowClick("next", e)}>
                            <ArrowBigRight size={32}/>
                        </button>
                    </div>

                </>
            ) : (
                <>
                    <div className="dow flex w-full justify-between h-[80vh]">
                        <button disabled={disabledButton} className="hover:opacity-70 transition max-md:hidden"
                                onClick={(e) => handleArrowClick("prev", e)}>
                            <ArrowBigLeft/>
                        </button>
                        <div className="grid grid-cols-4 justify-around gap-4 max-md:grid-cols-2 max-md:ml-10">
                            {displayPerfumes(femalePerfumes).map((perfume, index) => (
                                <PerfumeGridCard key={index} perfume={perfume} animationName={`per${index % 2}`}/>
                            ))}
                        </div>
                        <button disabled={disabledButton} className="hover:opacity-70 transition max-md:hidden"
                                onClick={(e) => handleArrowClick("next", e)}>
                            <ArrowBigRight/>
                        </button>
                    </div>
                    <div className="flex justify-around -ml-[10vw] md:hidden mt-9">
                        <button disabled={disabledButton} className="hover:opacity-70 transition"
                                onClick={(e) => handleArrowClick("prev", e)}>
                            <ArrowBigLeft size={32}/>
                        </button>
                        <button disabled={disabledButton} className="hover:opacity-70 transition"
                                onClick={(e) => handleArrowClick("next", e)}>
                            <ArrowBigRight size={32}/>
                        </button>
                    </div>

                </>
            )}
        </>
    );
};

export default PerfumeGrid;