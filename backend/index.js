//packages
// import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes); //User Routes

app.listen(port, () => console.log(`Server is listening to port ${port}`));
