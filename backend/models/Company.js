import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    line1: { type: String, required: true },
    line2: { type: String, default: "" },
  },
  { _id: false }
);

const submittedBySchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
);

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    website: { type: String, required: true },
    tax_id: { type: String, required: true },
    start_date: { type: Date, required: true },
    state_of_incorporation: { type: String, required: true },
    industry: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  { _id: false }
);

const ownerSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    ownership_percent: { type: String, required: true },
    email: { type: String, required: true },
    ssn: { type: String, required: true },
    phone: { type: String, required: true },
    fico_score: { type: String, required: true },
    address: { type: addressSchema, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  { _id: false }
);

const partnerSchema = new mongoose.Schema(
  {
    full_name: { type: String, default: "" },
    ownership_percent: { type: String, default: "" },
    email: { type: String, default: "" },
    ssn: { type: String, default: "" },
    phone: { type: String, default: null },
    fico_score: { type: String, default: "" },
    address: { type: addressSchema, default: null },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
    dob: { type: Date, default: "" },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    envelope_id: { type: String, required: true },
    submitted_by: { type: submittedBySchema, required: true },
    business: { type: businessSchema, default: null },
    owner: { type: ownerSchema, default: null },
    partner: { type: partnerSchema, default: null },
    media: [{ type: String }],
    is_applied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Company", schema);
