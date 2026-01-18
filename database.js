//Connects your data to the database
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionIstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected !!!
            ${connectionIstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection failed", error);
        process.exit(1)
    }
}

export default connectDB;