import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//create Tokens

const createTokens = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email: email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email Format" });
    }
    if (password.length < 6) {
      return res.json({ success: false, message: "Password too short" });
    }

    //hashing the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createTokens(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ sucess: true, message: "Error" });
  }
};

//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid User name or Password",
      });
    }

    const token = createTokens(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//delete User
const deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOneAndDelete({ email: email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    res.json({ success: true, message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//update User
const updateUser = async (req, res) => {
  const { email } = req.params;
  const { name, password, cartData } = req.body;
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      { name, password, cartData },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    res.json({ success: true, message: "User Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { registerUser, loginUser, updateUser, deleteUser };
