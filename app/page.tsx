
import PerfumeSelector from "@/components/PerfumeSelector";
import Welcome from "@/components/Welcome";
import {toast} from "react-toastify";
import axiosInstance from "@/utils/axiosConfig";

async function getPerfumes() {
    try {
        const response = await axiosInstance.get('/perfumes')

        const data = await response.data
        return data.data;
    } catch (error) {
        console.error('Failed to fetch perfumes:', error);
        toast.error("Failed to fetch data");
    }

}

export default async function Home() {
    const perfumes = await getPerfumes();
  return (
    <>
      <div className="flex justify-between text-2xl">
          <PerfumeSelector perfumes={perfumes}/>
          <Welcome/>
      </div>
    </>
  );
}
