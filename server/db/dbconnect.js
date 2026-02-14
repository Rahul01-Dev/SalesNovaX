import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async()=>{

    try {

        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDb is Connected!! DB Host : ${conn.connection.host}`);
        
    } catch (error) {

        console.log("MongoDb Connection Error : ",error);
        process.exit(1);
        
    }

}

export default connectDB;