import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

dotenv.config()

const app=express()
const port  =process.env.port || 3000
app.use(cors())


app.listen(port,()=>{
    console.log("Server Running on port ",port);
})
