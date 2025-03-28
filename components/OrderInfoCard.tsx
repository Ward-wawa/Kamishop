"use client"
import React from 'react';
import gsap from "gsap";

const OrderInfoCard = (
    {name,concentration,selectedSize,finalPrice}
        :{
        name: string,
        concentration:string,
        selectedSize:string,
        finalPrice: string,
}) => {

    React.useEffect(()=>{
        gsap.fromTo(".entrance2",
            { opacity: 0, y:-600,x:800,rotationZ:-90 },
            {
                rotationZ:0,
                y:0,
                x:0,
                duration: 1,
                ease: "power3.in",
                opacity:1
            }
        );
    },[selectedSize])


    if(selectedSize){
        return (
        <>
            <h1 className="font-extrabold mb-3 max-md:mb-0 text-2xl max-md:text-lg">Your Order:</h1>
            <p className="max-md:text-xs">You are ordering a {selectedSize}ml bottle of {name} </p>
            <p className="max-md:text-xs">with a fragrance concentration of {concentration}%</p>
            <p className="max-md:text-xs">Price will be: {finalPrice}$</p>
        </>
        );
    } else return (
        <>
            please Select The size Of the bottle you want to order...
        </>
    )
};

export default OrderInfoCard;