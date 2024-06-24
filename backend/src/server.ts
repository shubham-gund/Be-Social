import express from "express";
import authRoutes from "./routes/auth.routes.js"
import connectMongoDB from "./db/connection.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
  res.send("Hello World");
})

app.listen(3000,()=>{
  console.log("listening on port 3000");
  connectMongoDB();
})
