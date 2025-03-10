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
        <section className="flex pt-5 justify-around items-center">
            <div className="entrance1 flex flex-col items-center">
                <div className="text-3xl mt-2 mb-5">{perfume.name}</div>
                <div className="flex">
                    <img
                        className="w-[300px]"
                        src={`/icons/${perfume.pic}.png`}
                        alt="Picture"/>
                    <Slider concentration={concentrationBar} setConcentration={setConcentrationBar}
                            setActual={setConcentration}/>
                </div>
                <SizeSelector perfume={perfume} selectedSize={selectedSize} setSelectedSize={setSelectedSize}/>
            </div>
            <form onSubmit={(e)=>{placeOrder(e);}} className="entrance2 flex flex-col items-center justify-center bg-white text-black px-5 py-4 w-[60vh]">
                <OrderInfoCard
                    name={perfume.name}
                    concentration={concentration}
                    selectedSize={selectedSize}
                    finalPrice={finalPrice}
                />
                {selectedSize ? isAuthenticated ? (
                    <button disabled={loading} type="submit"
                             className="font-extrabold bg-black rounded-full p-4 mt-10 text-white border-2 border-white
                hover:bg-white hover:text-black hover:border-black transition w-[40vh] h-[10vh]
                active:scale-[1.2] focus:outline-none">
                        {loading ? (<ClipLoader size={30}/>) : "Order Now !"}
                    </button>
                ) : (
                    <>
                        Please create an account or log in to continue...
                        <Link href="/login">
                            <button
                                className="font-extrabold bg-black rounded-full p-4 mt-5 text-white border-2 border-white
                    hover:bg-white hover:text-black hover:border-black transition
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