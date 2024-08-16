import express from "express";
import multer from "multer";
import {
  addFood,
  listFood,
  updateFood,
  removeFood,
} from "../controllers/foodController.js";
const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.post("/update", upload.single("image"), updateFood);
foodRouter.post("/delete", removeFood);

export default foodRouter;
