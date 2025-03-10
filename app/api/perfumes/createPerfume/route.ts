import {NextRequest, NextResponse} from "next/server";
import Perfume from "@/models/perfumeSchema";

export async function POST(request: NextRequest) {
    const per = await request.json();
    console.log(per);
    const perfume = new Perfume(per);
    await perfume.save();
    return NextResponse.json(per);
}