import exp from "constants";
import foodModel from "../models/foodModel.js";
import fs from "fs";

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//add food
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//update food

const updateFood = async (req, res) => {
  const { id } = req.body;
  const updateData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
  };
  if (req.file) {
    updateData.image = `${req.file.filename}`;
  }
  try {
    const updateFood = await foodModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateFood) {
      return res.json({ success: false, message: "Food not found" });
    }
    res.json({
      success: true,
      message: "Food Updated Successfully",
      data: updateFood,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//delete food

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlinkSync(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listFood, addFood, updateFood, removeFood };
