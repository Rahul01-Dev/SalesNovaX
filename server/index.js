import express from "express";
import dotenv from 'dotenv';
import connectDB from "./db/dbconnect.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`App is Listen on Port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDb Connection Failed!!!");
});