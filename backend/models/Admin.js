import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    profileImage: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("admins", schema);
