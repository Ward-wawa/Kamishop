"use client"
import React, {FormEvent, useEffect} from 'react';
import {perfumeType} from "@/lib/Types";
import "@/public/styles/size-selector.css"
import Slider from "@/components/ConcentrationSlider";
import SizeSelector from "@/components/SizeSelector";
import OrderInfoCard from "@/components/OrderInfoCard";
import gsap from "gsap";
import {useAuth} from "@/hooks/use-auth";
import axiosInstance from "@/utils/axiosConfig";
import {toast} from "react-toastify";
import Link from "next/link";
import {useRouter} from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";

const PerfumeCard = ({perfume}:{perfume:perfumeType}) => {
    const {user,isAuthenticated} = useAuth();
    const [selectedSize, setSelectedSize] = React.useState("");
    const [concentrationBar,setConcentrationBar] = React.useState('15')
    const [concentration,setConcentration] = React.useState(`${Number(concentrationBar)+25}`)
    const [finalPrice,setFinalPrice] = React.useState('');
    const [loading,setLoading] = React.useState(false);
    const router = useRouter();

    const placeOrder = async (e:FormEvent<HTMLFormElement>) => {
        setLoading(true)
        const order = {perfume:perfume.name,
            concentration,
            size:selectedSize,
            price:finalPrice,
            userEmail: user?.email,
            pic:perfume.pic
        };
        e.preventDefault()
        try {
            const result = await axiosInstance.post("/auth/order",order);
            if (result.data.success) {
                toast.success(result.data.message);
            }
        }catch (err:any){
            toast.error(err.message)
        }finally {
            setLoading(false)
            router.push("/browse")
        }

    }
    useEffect(() => {
        let a =(perfume.price/100)*(Number(selectedSize))/2;
        let round = Math.round(a*((Number(concentration))/22));
        setFinalPrice(`${round-0.01}`)
    }, [selectedSize,concentrationBar,concentration]);
    useEffect(()=>{
        gsap.fromTo(".entrance1",
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
        <section className="flex pt-5 justify-around items-center max-md:flex-col max-md:ml-[20vw]">
            <div className="entrance1 flex flex-col items-center max-md:justify-center">
                <div className="text-3xl mt-2 mb-5 max-md:text-xl">{perfume.name}</div>
                <div className="flex max-md:flex-col max-md:justify-center max-md:items-center">
                    <Image height={80} width={80} quality={80} priority
                           className="w-[20vw] max-md:w-[45vw] max-md:mb-4"
                        src={`/icons/${perfume.pic}.png`}
                        alt="Picture"/>
                    <Slider concentration={concentrationBar} setConcentration={setConcentrationBar}
                            setActual={setConcentration}/>
                </div>
                <SizeSelector perfume={perfume} selectedSize={selectedSize} setSelectedSize={setSelectedSize}/>
            </div>
            <form onSubmit={(e) => {
                placeOrder(e);
            }}
                  className="entrance2 flex flex-col items-center justify-center bg-white text-black px-5 max-md:px-2 py-4 max-md:py-3 w-[60vh]
                  max-md:w-[60vw] max-md:mt-7 max-md:text-center max-md:mb-5
                  ">
                <OrderInfoCard
                    name={perfume.name}
                    concentration={concentration}
                    selectedSize={selectedSize}
                    finalPrice={finalPrice}
                />
                {selectedSize ? isAuthenticated ? (
                    <button disabled={loading} type="submit"
                            className="font-extrabold bg-black rounded-full p-4 mt-10 max-md:mt-5 text-white border-2 border-white
                hover:bg-white hover:text-black hover:border-black transition w-[20vw] h-[10vh] max-md:w-[40vw]
                active:scale-[1.2] focus:outline-none">
                        {loading ? (<ClipLoader size={30}/>) : "Order Now !"}
                    </button>
                ) : (
                    <>
                        <p className="max-md:text-xs">
                            Please create an account or log in to continue...
                        </p>
                        <Link href="/login">
                            <button
                                className="font-extrabold bg-black rounded-full p-4 mt-5 max-md:mt-3 text-white border-2 border-white
                    hover:bg-white hover:text-black hover:border-black transition max-md:w-[40vw]
                    active:scale-[1.2] focus:outline-none w-[40vh]">
                                Log In
                            </button>
                        </Link>
                    </>
                ) : ""}
            </form>
        </section>
    );
};

export default PerfumeCard;