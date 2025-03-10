import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Perfume from '@/models/perfumeSchema';


export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();

        const perfumes: any[] = await Perfume.find({type:"Women"})
            .lean()
            .maxTimeMS(30000)
            .exec();


        const sanitizedPerfumes = perfumes.map(perfume => ({
            ...perfume,
            _id: perfume._id.toString()
        }));

        return NextResponse.json(
            { success: true, data: sanitizedPerfumes },
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
