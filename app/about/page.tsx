"use client"

import About from "@/components/About";
import AboutMobile from "@/components/AboutMobile";

const Page = () => {

    return (
        <>
            <div className="max-md:hidden">
                <About/>
            </div>
            <div className="md:hidden">
                <AboutMobile/>
            </div>
        </>
    );
};

export default Page;