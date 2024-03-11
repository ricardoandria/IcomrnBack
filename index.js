import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authController from "./routes/authRoute.js";
import productController from "./routes/productRoute.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to database");
  } catch (error) {
    throw error;
  }
};

//route & middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("public/images"));
app.use("/auth", authController);
app.use("/produit", productController);

app.listen(process.env.PORT, () => {
  connect();
  console.log("server has been started");
});
