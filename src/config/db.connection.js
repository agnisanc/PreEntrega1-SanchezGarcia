import mongoose from "mongoose";
import { config } from "./config.js";
import winstonLogger from "../utils/winston.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        winstonLogger.info("MongoDB connected");
    } catch (error) {
        winstonLogger.fatal(`There was an error while trying to conect MongoDB: ${error.message}`);
    }
};