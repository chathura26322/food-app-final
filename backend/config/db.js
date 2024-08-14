import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/project")
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
