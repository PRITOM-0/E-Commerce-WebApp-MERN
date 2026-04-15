import express from "express";
import User from "../Models/User.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.json({message:"All users", users});
});

export default userRouter;