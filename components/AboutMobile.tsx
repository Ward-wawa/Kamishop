"use client"
import {useRef, useEffect} from "react";
import gsap from "gsap";

const AboutMobile = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    useEffect(() => {
        gsap.fromTo(videoRef.current,
            {y: window.innerHeight},
            {
                y: 0,
                duration: 1,
                ease: "power2.out"
            }
        );
        gsap.fromTo(textRef1.current,
            {x: -window.innerWidth, opacity: 0},
            {
                x: 0,
                duration: 1,
                ease: "power2.out",
                opacity: 1,
            }
        );
        gsap.fromTo(textRef2.current,
            {x: window.innerWidth, opacity: 0},
            {
                x: 0,
                duration: 1,
                ease: "power2.out",
                opacity: 1,
            }
        );
        gsap.fromTo(".popan",
            {x: window.innerWidth, opacity: 0},
            {
                x: 0,
                duration: 1,
                ease: "power2.out",
                opacity: 1
            }
        );
    }, []);
    return (
        <>
            <section className="flex flex-col m-auto py-10 ml-[24vw] text-center justify-center">
                <h1 className="text-4xl font-bold text-gray-700 mb-8">
                    About Us
                </h1>
                <p ref={textRef1} className="text-sm flex items-center justify-center flex-1">
                    Our Company gives the best perfumes with the best prices and with minimal transport wages
                    <br/>
                    we get our perfumes directly from the publishers and the all rights are reserved &copy;
                    <br/>
                    choose your favorite perfume and we will bring it to your door!
                </p>
                <div className="flex-1">
                    <video ref={videoRef} width="300" autoPlay loop muted>
                        <source src="/video/per.webm" type="video/webm"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <p ref={textRef2} className="text-sm flex items-center justify-center text-left flex-1 text-center">
                    This project was Made by a web developer who is also a perfume enthusiast.
                    <br/>
                    With all respect and reverence to big companies mentioned in this project.
                    This is just a web project and all wares, prices, and information mentioned is fake.
                </p>
            </section>
            <hr className="popan mt-[9vh]"/>
            <footer
                className="popan mt-4 mb-4 flex flex-col justify-center items-center font-thin text-xs text-gray-400 ml-28">
                <h2 className="text-center max-w-[60vw]">
                    All rights reserved to the parent companies of the products &copy;
                </h2>
                <h2 className="text-center">
                    Phone: +963 990 988 9X3 / Email: wardFakeEmail@gmail.com
                </h2>
            </footer>
        </>
    );
};

export default AboutMobile;