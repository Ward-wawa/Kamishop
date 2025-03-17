import {perfumeType} from "@/lib/Types";
import {useEffect} from "react";
import {gsap} from "gsap";
import LinkButton from "@/components/LinkButton";
import Image from "next/image";

const PerfumeGridCard = ({perfume,animationName}:{perfume:perfumeType,animationName:string}) => {
    useEffect(() => {
        gsap.fromTo(".per0",{
            y: 10,
        },{
            y: -10,
            duration: 2.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
        gsap.fromTo(".per1",{
            y: -10,
        },{
            y: 10,
            duration: 2.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
    }, []);
    return (
        <div className="flex flex-col md:justify-between items-center">
            <div className="h-[12vh] md:mt-12 max-md:mb-7">
                <Image className={`${animationName} per mt-10 max-md:w-20`} width={180} height={180}
                       src={`/icons/${perfume.pic}.png`} alt="Perfume" quality={60} priority
                />
            </div>
            <div className="flex flex-col justify-center items-center max-md:mt-5">
                <h1 className="text-2xl max-md:text-[10px] text-center mt-10">{perfume.name}</h1>
                <div className="flex justify-between text-lg max-md:text-xs">
                    <div className="mr-2">For: </div>
                    <div>{perfume.type}</div>
                </div>
                <LinkButton href={`/browse/${perfume._id}`}>
                    <button
                        className="max-md:px-3 max-md:text-sm px-10 py-2 mt-2 bg-white text-black rounded-full hover:text-white hover:bg-black transition">Select
                    </button>
                </LinkButton>
            </div>
        </div>
    );
};

export default PerfumeGridCard;