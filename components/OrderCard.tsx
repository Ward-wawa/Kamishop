"use client"
import {IOrder} from "@/models/orderSchema";
import {useEffect, useState} from "react";
import gsap from "gsap";
import axiosInstance from "@/utils/axiosConfig";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import formatDate from "@/utils/formatDate";
import Image from "next/image";

const OrderCard = ({order,index}:{
    order:IOrder;
    index: number;
}) => {
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const deleteOrder = async () =>{
        try {
            setLoading(true)
            const response = await axiosInstance.delete(`/auth/order/?id=${order._id}`);
            toast.success(response.data.message);
            router.push("/orders");
        } catch (e:any) {
            toast.error(e.message)
        }
        finally {
            setLoading(false)
        }

    }
    useEffect(()=>{
        gsap.fromTo('.ano',{
            x:window.innerWidth*2,
            ease:"power2.out",
            opacity:0
        },{
            stagger:0.2,
            duration:0.8,
            opacity:1,
            x:0,
        })
    },[])
    return (
        <div className="relative group mx-8 my-4 ano">
            <div className="
        relative
        p-4
        max-md:p-2
        rounded-2xl
        bg-white/10
        backdrop-blur-lg
        border border-white/20
        shadow-lg
        transition-all
        hover:bg-white/15
        hover:border-white/30
        hover:shadow-xl
        overflow-hidden
      ">
                <div className="
          absolute
          -inset-[100px]
          -rotate-12
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          opacity-40
          group-hover:opacity-50
          group-hover:-rotate-6
          group-hover:scale-125
          transition-all
          duration-300
        "/>
                <div className="relative z-10 text-white flex justify-between max-md:text-xs">
                    <div className="flex flex-col flex-2 max-md:w-[35vw]">
                        <h1>Order {index+1}</h1>
                        <p>{order.perfume}</p>
                        <p>Concentration: {order.concentration}%</p>
                        <p>Price: {order.price}$</p>
                        <div className="md:hidden mt-12 text-black font-bold">
                            <p>Ordered At</p>
                            <p>
                                {formatDate(order?.createdAt)}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-2 max-md:hidden">
                        <p>Ordered At {formatDate(order?.createdAt)}</p>
                        <button
                            disabled={loading}
                            onClick={()=>{deleteOrder()}}
                            className="p-3 font-bold transition bg-red-700 rounded-2xl mt-5 cursor-pointer hover:text-red-700 hover:bg-white"
                        >
                            {loading ? <ClipLoader size={20}/> : "Delete Order" }
                        </button>
                    </div>
                    <div className="flex-2 max-md:flex flex-col justify-center items-center">
                        <Image
                            width={200}
                            height={200}
                            quality="50"
                            className="w-[100px] max-md:w-[19vw]"
                            src={`/icons/${order.pic}.webp`}
                            alt="Picture"/>
                        <button
                            disabled={loading}
                            onClick={() => {
                                deleteOrder()
                            }}
                            className="px-1 py-2 font-bold transition bg-red-700 rounded-2xl mt-5 cursor-pointer hover:text-red-700 hover:bg-white md:hidden"
                        >
                            {loading ? <ClipLoader size={20}/> : "Delete Order"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;