import mongoose from "mongoose";
import Application from "./Application.js";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: Application }],
  },
  { timestamps: true }
);

export default mongoose.model("Rep", schema);
