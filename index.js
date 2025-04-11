import express from "express";
const app = express();
import dotenv from "dotenv";
import { connectDB } from "./src/helper/dbConnection.js";
import routes from "./route.js";
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
routes(app);

app.listen(process.env.PORT, () => {
  console.log("server listening on", process.env.PORT);
});
