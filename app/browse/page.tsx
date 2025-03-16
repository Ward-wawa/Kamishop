
import React from 'react';
import axiosInstance from "@/utils/axiosConfig";
import PerfumeGrid from "@/components/PerfumeGrid";

export const dynamic = 'force-dynamic'

async function getFemalePerfumes() {
    try {
        const response = await axiosInstance.get('/femaleperf');
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch perfumes:', error);
        throw new Error('Failed to fetch data');
    }
}
async function getMalePerfumes() {
    try {
        const response = await axiosInstance.get('/maleperf');
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch perfumes:', error);
        throw new Error('Failed to fetch data');
    }
}

const Page = async() => {
    const femalePerfumes = await getFemalePerfumes();
    const malePerfumes = await getMalePerfumes();
    return (
        <div className="max-md:ml-[16vw] w-screen justify-center items-center">
            <PerfumeGrid malePerfumes={malePerfumes} femalePerfumes={femalePerfumes}/>
        </div>
    );
};

export default Page;