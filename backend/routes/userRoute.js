import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/update/:email", updateUser);
userRouter.delete("/delete/:email", deleteUser);

export default userRouter;
