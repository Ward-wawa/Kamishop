"use client"
import {useRef,useEffect} from "react";
import gsap from "gsap";
const Page = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    useEffect(() => {
        gsap.fromTo(videoRef.current,
            { y: window.innerHeight },
            {
                y: 0,
                duration: 1,
                ease: "power2.out"
            }
        );
        gsap.fromTo(textRef1.current,
            { y: -window.innerHeight,opacity:0 },
            {
                y: 0,
                duration: 1,
                ease: "power2.out",
                opacity: 1,
            }
        );
        gsap.fromTo(textRef2.current,
            { y: -window.innerHeight,opacity:0 },
            {
                y: 0,
                duration: 1,
                ease: "power2.out",
                opacity: 1,
            }
        );
        gsap.fromTo(".popan",
            { y: window.innerHeight,opacity:0 },
            {
                y: 0,
                duration: 1,
                ease: "power2.out",
                opacity:1
            }
        );
    }, []);
    return (
        <>
            <section className="flex m-auto py-10">
                <p ref={textRef1} className=" flex items-center justify-center text-left ml-4 flex-1">
                    Our Company gives the best perfumes with the best prices and with minimal transport wages
                    <br/>
                    we get our perfumes directly from the publishers and the all rights are reserved &copy;
                    <br/>
                    choose your favorite perfume and we will bring it to your door!
                </p>
                <div className="flex-1">
                    <video ref={videoRef} width="500" autoPlay loop muted>
                        <source src="/video/per.webm" type="video/webm"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <p ref={textRef2} className=" flex items-center justify-center text-left flex-1">
                    This project was Made by a web developer who is also a perfume enthusiast.
                    <br/>
                    With all respect and reverence to big companies mentioned in this project.
                    This is just a web project and all wares, prices, and information mentioned is fake.
                </p>
            </section>
                <hr className="popan"/>
            <footer className="popan mt-3 flex flex-col justify-center items-center font-thin text-gray-400">
                All rights reserved to the parent companies of the products &copy;
                <h2 className="text-center">
                    Phone: +963 990 988 9X3 / Email: wardFakeEmail@gmail.com
                </h2>
            </footer>
        </>
    );
};

export default Page;