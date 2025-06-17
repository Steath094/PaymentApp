import mongoose from "mongoose";

export const connectDb = async () =>{
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`\n MongoDB connected !! DB host: ${dbInstance.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection Failed Error: `,error);
    }
}