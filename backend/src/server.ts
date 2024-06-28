import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import {v2 as cloudinary} from "cloudinary"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
 
import connectMongoDB from "./db/connection.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);

app.get("/",(req,res)=>{
  res.send("Hello World");
})

app.listen(3000,()=>{
  console.log("listening on port 3000");
  connectMongoDB();
})
