import express from "express";

const app=express()

app.get("/",(req,res)=>{
    res.send({
        msg:"Sucess",
        id:1,
    })
    console.log("Hello this is testing code");
})

app.listen(5000,()=>{
    console.log("Port listen")
})