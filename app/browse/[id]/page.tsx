import axiosInstance from "@/utils/axiosConfig";
import {perfumeType} from "@/lib/Types";
import PerfumeCard from "@/components/PerfumeCard";
interface paramsProps {
    id: string;
}


const Page = async ({params}:{params:paramsProps}) => {
    async function getPerfume() {
        try {
            const para = await params
            const id = para.id;
            const response = await axiosInstance.get(`/perfumes/getPerfumeById?_id=${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch perfumes:', error);
            throw new Error('Failed to fetch data');
        }
    }
    const perfume:perfumeType = await getPerfume();
    return (
        <section>
            <PerfumeCard perfume={perfume}/>
        </section>
    );
};

export default Page;