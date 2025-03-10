import mongoose, {Document} from "mongoose";
import {IPerfume} from "@/models/perfumeSchema";

export interface IOrder extends Document {
    price: string;
    concentration: string;
    userEmail: string;
    size:string;
    perfume:string;
    pic:string;
    createdAt?:Date;
    _id:string;
}

const orderSchema = new mongoose.Schema<IOrder>({
    perfume:String,
    price: String,
    concentration: String,
    userEmail: String,
    size: String,
    pic: String,
}, { timestamps: true });

const Order: mongoose.Model<IPerfume> =
    mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;