import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT Key mus be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Auth Service listening on 3000");
  });
};

start();
