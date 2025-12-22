import mongoose from "mongoose";

const mongodb_uri = process.env.MONGODB_URI;

if(!mongodb_uri){
    throw new Error("MONGODB_URI is not defined");
}

export const connectDB = async (): Promise<void> => {
    
}