import {NextRequest, NextResponse} from 'next/server';
import connectDB from '@/lib/mongodb';
import Perfume from '@/models/perfumeSchema';


export const dynamic = 'force-dynamic';

export async function GET(req:NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('_id');
    try {
        await connectDB();

        const perfume:any = await Perfume.findById(id)
            .lean()
            .maxTimeMS(30000)
            .exec();


        return NextResponse.json(
            { success: true, data: perfume },
            { status: 200 }
        );
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
