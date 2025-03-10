import {NextRequest, NextResponse} from "next/server";
import Perfume from "@/models/perfumeSchema";

export async function POST(req: NextRequest) {
    const per = await req.json();
    console.log(per);
    const perfume = new Perfume(per);
    await perfume.save();
    return NextResponse.json(per);
}