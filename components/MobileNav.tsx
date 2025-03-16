"use client"
import {House, LogIn, ListTree, Info, LogOut, Table2} from 'lucide-react';
import {Dancing_Script} from "next/font/google";
import {gsap} from "gsap";
import {Observer} from "gsap/Observer";
import {useEffect, useRef} from "react";
import Link from "next/link";
import {useAuth} from "@/hooks/use-auth";
import {signOut} from "next-auth/react";
import MobileNavIcon from "@/components/MobileNavIcon";

if (typeof window !== "undefined") {
    gsap.registerPlugin(Observer);
}
const dancing = Dancing_Script({weight: "600", subsets: ["latin"]})

const MobileNav = () => {
    const mainTitleRef = useRef<HTMLDivElement>(null);
    const {user, isAuthenticated} = useAuth();
    useEffect(() => {
        if (mainTitleRef.current) {
            gsap.to(mainTitleRef.current, {
                y: 10,
                duration: 2.3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        }
        gsap.fromTo(".popan3",
            {x: -220, opacity: 0},
            {
                x: 0,
                duration: 1.4,
                ease: "bounce.out",
                opacity: 1
            }
        );
    }, [])
    return (
        <div
            className="popan3 flex justify-center fixed flex-col inset-y-0 left-0 w-20 md:hidden
             shadow-white shadow-md z-50 bg-black">
            <h1 ref={mainTitleRef} className={dancing.className} style={{
                maxHeight: "4rem",
                textAlign: "center",
                flex: "1.6",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                textShadow: "0 0 8px rgba(255,255,255,0.8)",
                fontSize: "18px",
                marginTop: "15px"
            }}>
                KamiShop
            </h1>
            <h1 className="text-sm text-green-600 font-thin flex flex-col justify-center items-center animate-pulse max-h-16">
                {isAuthenticated ? (<>
                        <span>
                            Logged In!
                        </span>
                        <span className="font-extrabold">
                            {`Welcome ${user?.name.toUpperCase()} `}
                        </span>
                    </>
                ) : ""}
            </h1>
            <nav
                className="navbar navbar-expand-lg navbar-dark bg-dark justify-start flex flex-auto flex-col">
                <Link href="/"><MobileNavIcon a={10} icon={<House size={23}/>} title="Homepage"/></Link>
                <Link href="/browse"> <MobileNavIcon a={-10} icon={<ListTree size={23}/>} title="Browse"/> </Link>
                {
                    isAuthenticated
                        ? (
                            <>
                                <button onClick={() => {
                                    signOut()
                                }}><MobileNavIcon icon={<LogOut size={23}/>} title="Log out" a={13}/>
                                </button>
                                <Link href="/orders"><MobileNavIcon a={13} icon={<Table2 size={23}/>} title="Orders"/>
                                </Link>
                            </>)
                        : (
                            <>
                                <Link href="/login"><MobileNavIcon a={13} icon={<LogIn size={23}/>} title="Sign In"/>
                                </Link>
                            </>
                        )
                }
                <Link href="/about"> <MobileNavIcon a={-7} icon={<Info size={23}/>} title="About"/> </Link>
            </nav>
        </div>

    );
};

export default MobileNav;