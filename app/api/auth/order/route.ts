import connectDB from "@/lib/mongodb";
import Order, {IOrder} from "@/models/orderSchema";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    await connectDB()
    try {
        const {perfume,concentration,price,size,userEmail,pic} = await req.json();
        const order = new Order({perfume,concentration,price,size,userEmail,pic});
        await order.save();

        return NextResponse.json(
            { success: true, message: `Order created successfully` },
            { status: 201 }
        );

    }catch (e) {
        return NextResponse.json(
            { success: false, message: "Unable to place order" },
            { status: 400 }
        );
    }
 }

export async function GET(req: Request) {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    try {
        await connectDB();
        const orders = await Order.find({userEmail: email})
        return NextResponse.json({
            success: true,
            data: orders
        },{
            status:200
        })

    }catch(err:any) {
        return NextResponse.json({
            success: false,
            message: err.message
        },{
            status:500
        });
    }
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    try {
        await connectDB()
        const deleted:IOrder | null = await Order.findByIdAndDelete(id);
        return NextResponse.json({
            success: true,
            message: `${deleted?.perfume} Order deleted successfully`
        },{
            status:200
        })
    }catch(err:any) {
        return NextResponse.json({
            success: false,
            message: err.message
        },{status:500})
    }
}