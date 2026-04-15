import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


//routes
app.use("/api/auth",authRoutes)
app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB();

app.listen(5000, () => {
  console.log("Server is running on port 5000 ");
});
