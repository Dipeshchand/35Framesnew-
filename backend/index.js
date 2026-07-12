import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";

import albumRoutes from "./routes/albums.js";
import uploadRoutes from "./routes/upload.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blogRoutes.js";


dotenv.config();

const app = express();
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}


app.use(cors());
app.use(express.json());

app.get("/health",(req,res)=>{
  res.send("Server is running");
});


app.use("/uploads",express.static("uploads"));
app.use("/albums", albumRoutes);
app.use("/upload", uploadRoutes);
app.use("/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
