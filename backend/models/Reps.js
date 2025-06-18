import mongoose from "mongoose";
import Application from "./Application.js";
import Admin from "./Admin.js";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Admin,
      default: null,
    },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: Application }],
  },
  { timestamps: true }
);

export default mongoose.model("Rep", schema);
