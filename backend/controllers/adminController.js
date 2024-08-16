import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await adminModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 6) {
      return res.json({ success: false, message: "Enter the strong password" });
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = await adminModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = createToken(newAdmin._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }
    const token = createToken(admin._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { adminRegister, adminLogin };
