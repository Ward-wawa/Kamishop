
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import axiosInstance from "@/utils/axiosConfig";
import {IOrder} from "@/models/orderSchema";
import OrderCard from "@/components/OrderCard";

export const dynamic = 'force-dynamic'
const Page = async () => {
    const session  = await getServerSession(authOptions)
    const email = session?.user?.email;
    async function getOrders() {
        try {
            const response = await axiosInstance.get(`/auth/order?email=${email}`)
            return response.data.data;
        }catch (error:any) {
            console.log(error)
        }
    }

    const orders:IOrder[] = await getOrders();
    return (
        <>
            <div className="mt-10 max-md:ml-[22vw]">
                {orders.length>0 ? orders.map((order,index) => (
                    <div key={index}>
                        <OrderCard order={order} index={index} />
                    </div>
                )) : (
                    <div className="text-5xl flex justify-center items-center mt-40 max-md:text-2xl">
                        No orders found :(
                    </div>
                )}
            </div>
        </>
    );
};

export default Page;