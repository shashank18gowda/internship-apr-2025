import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING, { dbName: process.env.DB_NAME })
    .then(() => console.log("Connected!"))
    .catch((err) => {
      console.log("Err while connecting DB", err);
    });
};
