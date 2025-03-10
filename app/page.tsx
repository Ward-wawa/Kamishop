
import PerfumeSelector from "@/components/PerfumeSelector";
import Welcome from "@/components/Welcome";
import {toast} from "react-toastify";

async function getPerfumes() {
    try {
        const response = await fetch('http://localhost:3000/api/perfumes', {
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            toast.error(response.statusText);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Failed to fetch perfumes:', error);
        throw new Error('Failed to fetch data');
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
