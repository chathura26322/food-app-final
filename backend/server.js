import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";
import adminRouter from "./routes/adminRoute.js";

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
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
