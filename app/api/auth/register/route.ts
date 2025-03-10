import { NextResponse } from 'next/server';
import User from '@/models/userSchema';
import dbConnect from '@/lib/mongodb';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name,email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }
        if(!name)
        {
            return NextResponse.json(
                {success:false,error:"Please enter your name"},
                {status:400}
            )
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "User already exists" },
                { status: 400 }
            );
        }

        const user = new User({ name,email, password });
        await user.save();

        return NextResponse.json(
            { success: true, message: "User created successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}