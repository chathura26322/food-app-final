import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } //mongoose will not remove empty objects from the cartData object
);

const userModel = mongoose.models.user || mongoose.model("User", userSchema);
export default userModel;
