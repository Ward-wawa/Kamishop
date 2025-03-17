
import PerfumeSelector from "@/components/PerfumeSelector";
import Welcome from "@/components/Welcome";
import {toast} from "react-toastify";
import axiosInstance from "@/utils/axiosConfig";
import {perfumeType} from "@/lib/Types";

export const dynamic = 'force-dynamic'

export default async function Home() {

    let perfumes;
        try {
            const response = await axiosInstance.get('/perfumes')
            const data = await response.data
            perfumes = data.data;
        } catch (error) {
            console.error('Failed to fetch perfumes:', error);
            toast.error("Failed to fetch data");
        }
    const ImageUrls = perfumes.map((p: perfumeType) => p.pic);
  return (
    <>
        <div className="flex justify-between items-center text-2xl max-md:flex-col max-md:ml-40">
            <Welcome/>
            <PerfumeSelector ImageUrls={ImageUrls} perfumes={perfumes}/>
        </div>
    </>
  );
}
