import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    profileImage: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String, default: null },
    otpExpiration: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("admins", schema);
