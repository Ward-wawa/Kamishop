import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

type MongooseGlobal = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

// Use existing connection if available (prevents hot reload issues)
let cached = (global as typeof globalThis & { mongoose?: MongooseGlobal }).mongoose;

if (!cached) {
    cached = (global as typeof globalThis & { mongoose?: MongooseGlobal }).mongoose = {
        conn: null,
        promise: null
    };
}

async function connectDB(): Promise<typeof mongoose> {
    if(!cached) {
        throw new Error('MongoDB is missing');
    }
    if(!MONGODB_URI){
        throw new Error('MongoDB URI is missing');
    }
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        }).then(mongoose => mongoose);
    }

    try {
        cached.conn = await cached.promise;
        console.log("Connected to MongoDB");
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;