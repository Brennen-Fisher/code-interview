import express from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv";
import userRoute from "./route/user.route.js";
import reviewRoute from "./route/review.route.js";
import authRoute from "./route/auth.route.js";
import commentRoute from "./route/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
// dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://brennenfisher:BUU42l66iVdo0v4z@cluster0.05zqgzn.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/review", reviewRoute);
app.use("/api/comment", commentRoute);
// app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});