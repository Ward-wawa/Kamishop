import {perfumeType} from "@/lib/Types";
import {useEffect} from "react";
import {gsap} from "gsap";
import LinkButton from "@/components/LinkButton";

const PerfumeGridCard = ({perfume,animationName}:{perfume:perfumeType,animationName:string}) => {
    useEffect(() => {
        gsap.fromTo(".per0",{
            y: 20,
        },{
            y: -20,
            duration: 2.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
        gsap.fromTo(".per1",{
            y: -20,
        },{
            y: 20,
            duration: 2.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
    }, []);
    return (
        <div className="flex flex-col justify-between items-center">
            <div className="h-[50vh] mt-5">
                <img className={`${animationName} per mt-10`} width={200}
                     src={`/icons/${perfume.pic}.png`} alt="Perfume"
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl text-center mt-10">{perfume.name}</h1>
                <div className="flex justify-between text-lg">
                    <div className="mr-2">For: </div>
                    <div>{perfume.type}</div>
                </div>
                <LinkButton href={`/browse/${perfume._id}`}>
                    <button className="px-10 py-2 mt-2 bg-white text-black rounded-full hover:text-white hover:bg-black transition">Select</button>
                </LinkButton>
            </div>
        </div>
    );
};

export default PerfumeGridCard;