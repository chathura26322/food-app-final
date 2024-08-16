import express from "express";
import { adminLogin, adminRegister } from "../controllers/adminController.js";
const adminRouter = express.Router();

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);

export default adminRouter;
