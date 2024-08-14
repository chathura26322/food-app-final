import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//DataBase connection
connectDB();

//Routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);